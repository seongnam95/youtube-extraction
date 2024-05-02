import React, { HTMLAttributes, useEffect, useRef, useState } from 'react';

import { convertToTime } from '@/features/SoundExtraction/components/calculation';
import { cn } from '@/lib/cn';

type StartEnd = {
  start: number;
  end: number;
};

interface WaveSurferProps extends HTMLAttributes<HTMLDivElement> {
  url: string;
  waveColor?: string;
  regionColor?: string;
}

interface WaveOptions {
  barWidth?: number;
  barGap?: number;
  barRadius?: number;
  waveColor: string;
  regionWaveColor: string;
}

const WaveSurfer = ({
  className,
  url,
  waveColor = '#4dd37e',
  regionColor = '#0d1329',
  ...props
}: WaveSurferProps) => {
  const initStartEnd = { start: 0, end: 0 };
  const audioContext = new AudioContext();

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const regionRef = useRef<HTMLDivElement>(null);

  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [region, setRegion] = useState<StartEnd>(initStartEnd);
  const [regionDuration, setRegionDuration] = useState<StartEnd>(initStartEnd);

  const WaveOptions: WaveOptions = {
    barWidth: 2,
    barGap: 3,
    barRadius: 2,
    waveColor: waveColor,
    regionWaveColor: regionColor,
  };

  const convertWaveColor = (color: string = waveColor) => {
    if (!Array.isArray(color)) return color || '';
    if (color.length < 2) return color[0] || '';

    const canvasElement = document.createElement('canvas');
    const ctx = canvasElement.getContext('2d') as CanvasRenderingContext2D;
    const gradientHeight = canvasElement.height * (window.devicePixelRatio || 1);
    const gradient = ctx.createLinearGradient(0, 0, 0, gradientHeight);

    const colorStopPercentage = 1 / (color.length - 1);
    color.forEach((color, index) => {
      const offset = index * colorStopPercentage;
      gradient.addColorStop(offset, color);
    });

    return gradient;
  };

  const drawWaveform = (options: WaveOptions) => {
    if (!canvasRef.current || !regionRef.current || !audioBuffer) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const channelData = audioBuffer.getChannelData(0);
    const length = channelData.length;

    const { width, height } = ctx.canvas;
    const halfHeight = height / 2;
    const pixelRatio = window.devicePixelRatio || 1;

    const barWidth = options.barWidth ? options.barWidth * pixelRatio : 1;
    const barGap = options.barGap ? options.barGap * pixelRatio : options.barWidth ? barWidth / 2 : 0;
    const barRadius = options.barRadius || 0;
    const barIndexScale = width / (barWidth + barGap) / length;

    const rectFn = barRadius && 'roundRect' in ctx ? 'roundRect' : 'rect';

    // ctx.clearRect(0, 0, width, canvasRef.current.height);

    ctx.beginPath();

    let prevX = 0;
    let maxTop = 0;
    let maxBottom = 0;
    for (let i = 0; i <= length; i++) {
      const x = Math.round(i * barIndexScale);

      if (x > prevX) {
        const topBarHeight = Math.round(maxTop * halfHeight);
        const bottomBarHeight = Math.round(maxBottom * halfHeight);
        const barHeight = topBarHeight + bottomBarHeight || 1;

        let y = halfHeight - topBarHeight;

        ctx[rectFn](prevX * (barWidth + barGap), y, barWidth, barHeight, barRadius);

        prevX = x;
        maxTop = 0;
        maxBottom = 0;
      }

      const magnitudeTop = Math.abs(channelData[i] || 0);
      const magnitudeBottom = Math.abs(channelData[i] || 0);
      if (magnitudeTop > maxTop) maxTop = magnitudeTop;
      if (magnitudeBottom > maxBottom) maxBottom = magnitudeBottom;
    }

    ctx.fillStyle = convertWaveColor(); //options.waveColor;
    ctx.fill();
    ctx.closePath();
  };

  const handleResizeRegion = (side: 'left' | 'right') => (event: React.MouseEvent) => {
    if (!audioBuffer) return;

    const startX = event.clientX;
    const startLeft = region.start;
    const startRight = region.end;
    const containerWidth = containerRef.current ? containerRef.current.offsetWidth : 0;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const diff = moveEvent.clientX - startX;
      const diffPercent = (diff / containerWidth) * 100;

      if (side === 'left') {
        const updatedLeft = Math.max(0, startLeft + diffPercent);
        if (updatedLeft < 100 - region.end) {
          setRegion((prev) => ({
            ...prev,
            start: updatedLeft,
          }));
        }
      } else {
        const updatedRight = Math.max(0, startRight - diffPercent);
        if (updatedRight < 100 - region.start) {
          setRegion((prev) => ({
            ...prev,
            end: updatedRight,
          }));
        }
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;

    const containerObserver = new ResizeObserver(() => {
      canvas.width = container.offsetWidth * 2;
      canvas.height = container.offsetHeight * 2;
      canvas.style.width = `${container.offsetWidth}px`;
      canvas.style.height = `${container.offsetHeight}px`;

      drawWaveform(WaveOptions);
    });

    containerObserver.observe(container);

    return () => {
      containerObserver.disconnect();
    };
  }, [audioBuffer]);

  useEffect(() => {
    fetch(url).then((response) => {
      response.arrayBuffer().then((arrayBuffer) => {
        audioContext.decodeAudioData(arrayBuffer).then((decodedBuffer) => {
          setAudioBuffer(decodedBuffer);
        });
      });
    });

    return () => {
      audioContext.close();
    };
  }, [url]);

  useEffect(() => {
    if (audioBuffer) {
      setRegionDuration({
        start: audioBuffer?.duration * (region.start / 100),
        end: audioBuffer.duration - audioBuffer.duration * (region.end / 100),
      });
    }

    // drawWaveform(WaveOptions);
  }, [region.start, region.end, audioBuffer]);

  if (!audioBuffer) return;
  return (
    <div>
      {/* Waveform */}
      <div className="mb-16 rounded-md px-3">
        <div className="relative h-32 w-full bg-surface" ref={containerRef}>
          {/* Mask */}
          <div
            className="absolute bottom-0 left-0 top-0 bg-background opacity-80"
            style={{ width: `${region.start}%` }}
          />
          <div
            className="absolute bottom-0 right-0 top-0 bg-background opacity-80"
            style={{ width: `${region.end}%` }}
          />

          {/* Region */}
          <div
            ref={regionRef}
            className="absolute top-0 h-full"
            style={{
              left: `${region.start}%`,
              right: `${region.end}%`,
            }}
          >
            {/* Left Handle */}
            <div
              onMouseDown={handleResizeRegion('left')}
              className="absolute -left-3 h-full w-3 cursor-w-resize"
            >
              <div
                data-content={convertToTime(regionDuration.start)}
                className="relative h-full w-3 rounded-l-md border-l-[12px] border-primary 
                after:absolute after:-bottom-6 after:left-1/2 after:z-10 after:-translate-x-[60%] 
                after:text-xs after:text-foreground-muted after:content-[attr(data-content)]"
              />
            </div>

            {/* Right Handle */}
            <div
              onMouseDown={handleResizeRegion('right')}
              className="absolute -right-3 h-full w-3 cursor-e-resize"
            >
              <div
                data-content={convertToTime(regionDuration.end)}
                className="relative h-full w-3 rounded-r-md border-l-[12px] border-primary after:absolute after:-bottom-6 after:left-1/2 after:z-10 after:-translate-x-[70%] after:text-xs after:text-foreground-muted after:content-[attr(data-content)]"
              />
            </div>
          </div>

          <canvas ref={canvasRef} />
        </div>
      </div>

      {/* Media Controller */}
      <div>d</div>
    </div>
  );
};

export default WaveSurfer;
