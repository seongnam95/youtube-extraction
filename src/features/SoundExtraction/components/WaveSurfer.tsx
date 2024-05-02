import React, { HTMLAttributes, useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/cn';

interface WaveSurferProps extends HTMLAttributes<HTMLDivElement> {
  url: string;
  waveColor?: string;
}

const WaveSurfer = ({
  className,
  url,
  waveColor = '#3bcdc2',
  ...props
}: WaveSurferProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boundaryRef = useRef<HTMLDivElement>(null);

  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [areaSide, setAreaSide] = useState<{ areaLeft: number; areaRight: number }>({
    areaLeft: 0,
    areaRight: 0,
  });

  const drawWaveform = () => {
    if (!canvasRef.current || !boundaryRef.current || !audioBuffer) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const totalWidth = canvasRef.current.width;

    // const boundaryLeft = Number(boundaryRef.current.style.left.replace('%', ''));
    // const boundaryRight = Number(boundaryRef.current.style.right.replace('%', ''));

    // const boundaryStart = (boundaryLeft / 100) * totalWidth;
    // const boundaryEnd = ((100 - boundaryRight) / 100) * totalWidth;

    const boundaryStart = (areaSide.areaLeft / 100) * totalWidth;
    const boundaryEnd = ((100 - areaSide.areaRight) / 100) * totalWidth;

    const data = audioBuffer.getChannelData(0);
    const step = Math.ceil(data.length / totalWidth);
    const amp = canvasRef.current.height / 2;

    ctx.clearRect(0, 0, totalWidth, canvasRef.current.height);

    for (let i = 0; i < totalWidth; i++) {
      let max = 0;
      for (let j = 0; j < step; j++) {
        max = Math.max(max, Math.abs(data[i * step + j]));
      }

      ctx.beginPath();
      ctx.moveTo(i, amp - max * amp);
      ctx.lineTo(i, amp + max * amp);
      ctx.strokeStyle = i >= boundaryStart && i <= boundaryEnd ? waveColor : 'gray';
      ctx.stroke();
    }
  };

  const handleResizeArea = (side: 'left' | 'right') => (event: React.MouseEvent) => {
    const startX = event.clientX;
    const startLeft = areaSide.areaLeft;
    const startRight = areaSide.areaRight;
    const containerWidth = containerRef.current ? containerRef.current.offsetWidth : 0;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const diff = moveEvent.clientX - startX;
      const diffPercent = (diff / containerWidth) * 100;

      if (side === 'left') {
        const newLeft = Math.max(0, startLeft + diffPercent);
        if (newLeft < 100 - areaSide.areaRight) {
          setAreaSide((prev) => ({
            ...prev,
            areaLeft: newLeft,
          }));
        }
      } else {
        const newRight = Math.max(0, startRight - diffPercent);
        if (newRight < 100 - areaSide.areaLeft) {
          setAreaSide((prev) => ({
            ...prev,
            areaRight: newRight,
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

      drawWaveform();
    });

    containerObserver.observe(container);

    return () => {
      containerObserver.disconnect();
    };
  }, [audioBuffer]);

  useEffect(() => {
    const audioContext = new AudioContext();

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
    drawWaveform();
  }, [areaSide.areaLeft, areaSide.areaRight, audioBuffer]);

  return (
    <div className="bg-surface px-3">
      <div
        className={cn('relative inline-block h-32 w-full', className)}
        ref={containerRef}
        {...props}
      >
        <canvas ref={canvasRef} />

        <div
          ref={boundaryRef}
          className="absolute top-0 h-full bg-primary-surface"
          style={{
            left: `${areaSide.areaLeft}%`,
            right: `${areaSide.areaRight}%`,
          }}
        >
          <div
            onMouseDown={handleResizeArea('left')}
            className="absolute -left-3 h-full w-3 cursor-w-resize rounded-l-md border-l-[12px] border-primary"
          />
          <div
            onMouseDown={handleResizeArea('right')}
            className="absolute -right-3 h-full w-3 cursor-e-resize rounded-r-md border-r-[12px] border-primary"
          />
        </div>
      </div>
    </div>
  );
};

export default WaveSurfer;
