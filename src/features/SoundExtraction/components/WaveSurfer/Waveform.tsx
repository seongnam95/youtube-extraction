import { useContext, useEffect } from 'react';

import { cn } from '@/lib/cn';

import { WaveSurferContext } from './WaveSurferRoot';

interface WaveSurferProps {
  className?: string;
  options?: WaveformOptions;
}

interface WaveformOptions {
  waveColor?: string;
  barWidth?: number;
  barGap?: number;
  barRadius?: number;
}

export const Waveform = ({ className, options = {} }: WaveSurferProps) => {
  const { containerRef, canvasRef, audioBuffer } = useContext(WaveSurferContext);

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
    <div className={cn('relative h-32 w-full bg-surface', className)} ref={containerRef}>
      {/* Progress Bar */}
      <div className="absolute h-full w-[1px] bg-white opacity-70" />

      {/* Waveform Canvas*/}
      <canvas ref={canvasRef} />
    </div>
  );
};
