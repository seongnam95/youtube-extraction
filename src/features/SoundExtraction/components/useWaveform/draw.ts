import { RefObject } from 'react';

interface drawOptions {
  ctx: CanvasRenderingContext2D;
  channelData: Float32Array;
  canvasRef: RefObject<HTMLCanvasElement>;
  barWidth?: number;
  barGap?: number;
  waveColor?: string;
}

export const draw = (options: drawOptions) => {
  const { ctx, canvasRef, channelData } = options;
  if (!canvasRef.current) return;

  const pixelRatio = window.devicePixelRatio || 1;
  const barWidth = options.barWidth ? options.barWidth * pixelRatio : 1;
  const barGap = options.barGap ? options.barGap * pixelRatio : barWidth / 2;
  const waveColor = options.waveColor || '#4dd37e';

  const width = canvasRef.current.offsetWidth;
  const height = canvasRef.current.offsetHeight;
  const length = channelData.length;

  const halfHeight = height / 2;
  const barIndexScale = width / (barWidth + barGap) / length;

  ctx.clearRect(0, 0, width, height);
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
      ctx.fillRect(prevX * (barWidth + barGap), y, barWidth, barHeight);

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
