interface drawOptions {
  width: number;
  height: number;

  barWidth?: number;
  barGap?: number;
  waveColor?: string;
}

export const draw = async (
  ctx: CanvasRenderingContext2D,
  channelData: Float32Array,
  options: drawOptions,
) => {
  const { width, height } = options;

  const pixelRatio = window.devicePixelRatio || 1;
  const barWidth = options.barWidth ? options.barWidth * pixelRatio : 1;
  const barGap = options.barGap ? options.barGap * pixelRatio : barWidth / 2;
  const waveColor = options.waveColor || '#4dd37e';

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
