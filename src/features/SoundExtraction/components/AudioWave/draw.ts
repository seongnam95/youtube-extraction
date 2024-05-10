import { Duration } from '@/features/SoundExtraction/components/AudioWave/useAudioWave';

function hexToRGB(hex: string) {
  let r = 0,
    g = 0,
    b = 0;

  // 3자리 HEX 코드
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  }
  // 6자리 HEX 코드
  else if (hex.length === 7) {
    r = parseInt(hex.substring(1, 3), 16);
    g = parseInt(hex.substring(3, 5), 16);
    b = parseInt(hex.substring(5, 7), 16);
  }

  return `${r}, ${g}, ${b}`;
}

interface drawOptions {
  barWidth?: number;
  barGap?: number;
  barRadius?: number;
  waveColor?: string;
  bgColor?: string;
}

export const draw = (
  ctx: CanvasRenderingContext2D,
  peaks: Array<Float32Array | number[]>,
  duration: Duration,
  options: drawOptions = {},
) => {
  const topChannel = peaks[0];
  const bottomChannel = peaks[1] || peaks[0];
  const length = peaks[0].length;

  const { width, height } = ctx.canvas;
  const halfHeight = height / 2;
  const pixelRatio = window.devicePixelRatio || 1;
  const vScale = 1;
  const startX = width * (duration.begin / duration.full);
  const endX = width * (duration.end / duration.full);

  const barWidth = options.barWidth ? options.barWidth * pixelRatio : 1;
  const barGap = options.barGap ? options.barGap * pixelRatio : barWidth / 2;
  const barRadius = options.barRadius || 0;
  const barIndexScale = width / (barWidth + barGap) / length;

  const waveColor = options.waveColor ? hexToRGB(options.waveColor) : '160, 160, 160';
  const bgColor = options.bgColor || '#0d1329';

  const rectFn = barRadius && 'roundRect' in ctx ? 'roundRect' : 'rect';

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = bgColor;
  ctx.fillRect(startX, 0, endX - startX, height);
  ctx.beginPath();

  let prevX = 0;
  let maxTop = 0;
  let maxBottom = 0;
  for (let i = 0; i <= length; i++) {
    const x = Math.round(i * barIndexScale);

    if (x > prevX) {
      const topBarHeight = Math.round(maxTop * halfHeight * vScale);
      const bottomBarHeight = Math.round(maxBottom * halfHeight * vScale);
      const barHeight = topBarHeight + bottomBarHeight || 1;
      let y = halfHeight - topBarHeight;

      ctx[rectFn](prevX * (barWidth + barGap), y, barWidth, barHeight, barRadius);

      prevX = x;
      maxTop = 0;
      maxBottom = 0;
    }

    const magnitudeTop = Math.abs(topChannel[i] || 0);
    const magnitudeBottom = Math.abs(bottomChannel[i] || 0);
    if (magnitudeTop > maxTop) maxTop = magnitudeTop;
    if (magnitudeBottom > maxBottom) maxBottom = magnitudeBottom;
  }

  const gradient = ctx.createLinearGradient(0, 0, width, 0);
  gradient.addColorStop(0, `rgba(${waveColor}, 0.2)`);
  gradient.addColorStop(startX / width, `rgba(${waveColor}, 0.2)`);
  gradient.addColorStop(startX / width, `rgba(${waveColor}, 1)`);
  gradient.addColorStop(endX / width, `rgba(${waveColor}, 1)`);
  gradient.addColorStop(endX / width, `rgba(${waveColor}, 0.2)`);
  gradient.addColorStop(1, `rgba(${waveColor}, 0.2)`);

  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.closePath();
};
