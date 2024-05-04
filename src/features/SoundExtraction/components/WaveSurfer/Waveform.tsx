import { useContext, useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/cn';

import { WaveSurferContext } from './WaveSurferRoot';

interface WaveSurferProps {
  className?: string;
  audioUrl: string;
  options?: WaveformOptions;
}

interface WaveformOptions {
  waveColor?: string;
  barWidth?: number;
  barGap?: number;
  barRadius?: number;
}

export const Waveform = ({ className, audioUrl, options = {} }: WaveSurferProps) => {
  const audioContext = new AudioContext();

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);

  const [region, setRegion] = useState<{ start: number; end: number }>({ start: 0, end: 0 });

  const pixelRatio = window.devicePixelRatio || 1;
  const barWidth = options.barWidth ? options.barWidth * pixelRatio : 1;
  const barGap = options.barGap ? options.barGap * pixelRatio : options.barWidth ? barWidth / 2 : 0;
  const barRadius = options.barRadius || 0;
  const waveColor = options.waveColor || '#4dd37e';

  const drawWaveform = () => {
    if (!canvasRef.current || !audioBuffer) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const channelData = audioBuffer.getChannelData(0);
    const length = channelData.length;

    const { width, height } = ctx.canvas;
    const halfHeight = height / 2;

    const barIndexScale = width / (barWidth + barGap) / length;

    const rectFn = barRadius && 'roundRect' in ctx ? 'roundRect' : 'rect';

    ctx.clearRect(0, 0, width, canvasRef.current.height);

    ctx.beginPath();
    ctx.fillStyle = waveColor;

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

    ctx.fill();
    ctx.closePath();
  };

  const handleThumbChange = (side: 'left' | 'right') => (event: React.MouseEvent) => {
    const startX = event.clientX;
    const startLeft = region.start;
    const startRight = region.end;
    const containerWidth = canvasRef.current ? canvasRef.current.offsetWidth : 0;

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
    // TODO : 오디오 파일이 올바르지 않을 경우 처리해야함

    fetch(audioUrl).then((response) => {
      response.arrayBuffer().then((arrayBuffer) => {
        audioContext.decodeAudioData(arrayBuffer).then((decodedBuffer) => {
          setAudioBuffer(decodedBuffer);
        });
      });
    });

    return () => {
      audioContext.close();
    };
  }, [audioUrl]);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;

    const containerObserver = new ResizeObserver(() => {
      canvas.width = container.offsetWidth * 2;
      canvas.height = container.offsetHeight * 2;
      canvas.style.width = `${container.offsetWidth}px`;
      canvas.style.height = `${container.offsetHeight}px`;

      drawWaveform();
    });

    containerObserver.observe(container);

    return () => {
      containerObserver.disconnect();
    };
  }, [containerRef.current, canvasRef.current, audioBuffer]);

  if (!audioBuffer) return;
  return (
    <div className="relative mx-3">
      <div className={cn('relative h-32 w-full bg-surface', className)} ref={containerRef}>
        {/* Progress Bar */}
        <div className="absolute h-full w-[1px] bg-white opacity-70" />

        {/* Waveform Canvas*/}
        <canvas ref={canvasRef} />
      </div>

      <div className="absolute top-0 h-full w-full">
        <div
          className="relative left-0 z-10 h-full bg-[rgba(1,7,31,0.8)]"
          style={{ width: `${region.start}%` }}
        >
          {/* Left Thumb */}
          <div
            onMouseDown={handleThumbChange('left')}
            data-content="20:10.1" //{convertToTime(regionDuration.start)}
            className="absolute right-0 h-full w-3 cursor-ew-resize rounded-l-md border-l-[12px] border-primary
                after:absolute after:-bottom-6 after:left-1/2 after:z-10 after:-translate-x-[60%] 
                after:text-xs after:text-foreground-muted after:content-[attr(data-content)]"
          />
        </div>

        <div
          className="absolute right-0 top-0 h-full w-3 bg-[rgba(1,7,31,0.8)]"
          style={{ width: `${region.end}%` }}
        >
          {/* Right Thumb */}
          <div
            onMouseDown={handleThumbChange('right')}
            data-content="10:10.0" //{convertToTime(regionDuration.end)}
            className="absolute h-full w-3 cursor-ew-resize rounded-r-md border-l-[12px] border-primary after:absolute after:-bottom-6 after:left-1/2 after:z-10 after:-translate-x-[70%] after:text-xs after:text-foreground-muted after:content-[attr(data-content)]"
          />
        </div>
      </div>
    </div>
  );
};
