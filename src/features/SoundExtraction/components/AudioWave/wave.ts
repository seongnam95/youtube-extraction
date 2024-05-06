export interface WaveformOptions {
  container: HTMLElement;
  height?: number | 'auto';
  waveColor?: string;
  barWidth?: number;
  barGap?: number;
  barRadius?: number;
}

class Waveform {
  private audioUrl: string | null = null;
  private container: HTMLElement;
  private canvas: HTMLCanvasElement | null = null;
  private options: WaveformOptions;
  private audioContext: AudioContext;
  private audioBuffer: AudioBuffer | null = null;
  private duration: { start: number; end: number } = { start: 0, end: 0 };
  private resizeObserver: ResizeObserver | null = null;

  constructor(options: WaveformOptions) {
    this.audioContext = new AudioContext();
    this.container = options.container;
    this.options = options;

    const canvas = this.createCanvas();
    this.canvas = canvas;
    this.container.appendChild(canvas);

    this.initEvents();
  }

  public static create(options: WaveformOptions) {
    return new Waveform(options);
  }

  destroy() {
    if (this.canvas) this.canvas.remove();
  }

  public load(url: string): void {
    if (!this.container) {
      console.error('Container not set.');
      return;
    }

    if (!this.canvas) {
      this.createCanvas();
    }

    this.audioUrl = url;
    fetch(this.audioUrl)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => this.audioContext.decodeAudioData(arrayBuffer))
      .then((decodedBuffer) => {
        this.audioBuffer = decodedBuffer;
        this.duration.end = decodedBuffer.duration;

        this.draw();
      })
      .catch((error) => console.error('Error loading audio: ', error));
  }

  private getHeight(optionsHeight?: WaveformOptions['height']): number {
    const defaultHeight = 150;
    if (optionsHeight == null) return defaultHeight;
    if (!isNaN(Number(optionsHeight))) return Number(optionsHeight);
    if (optionsHeight === 'auto') return this.container.clientHeight || defaultHeight;
    return defaultHeight;
  }

  private createCanvas(): HTMLCanvasElement {
    const width = this.container.offsetWidth;
    const height = this.getHeight(this.options.height);

    const pixelRatio = window.devicePixelRatio || 1;
    const canvas = document.createElement('canvas');
    canvas.width = width * pixelRatio; // 실제 그리기 영역 크기 설정
    canvas.height = height * pixelRatio;
    canvas.style.width = `${width}px`; // CSS 스타일 설정
    canvas.style.height = `${height}px`;

    return canvas;
  }

  private handleMouseDown(pos: 'left' | 'right') {
    return (event: MouseEvent) => {
      console.log(event.clientX);
    };
  }

  private initEvents(): void {
    this.resizeObserver = new ResizeObserver(() => {
      if (!this.canvas) return;

      this.canvas.width = this.container.offsetWidth * 2;
      this.canvas.height = this.container.offsetHeight * 2;
      this.canvas.style.width = `${this.container.offsetWidth}px`;
      this.canvas.style.height = `${this.container.offsetHeight}px`;

      this.draw();
    });

    this.resizeObserver.observe(this.container);
  }

  public draw(): void {
    if (!this.audioBuffer || !this.canvas) return;
    const ctx = this.canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = this.canvas;
    this.canvas.width = width;
    this.canvas.height = height;

    const channelData = this.audioBuffer.getChannelData(0);
    const length = channelData.length;

    const pixelRatio = window.devicePixelRatio || 1;
    const barWidth = this.options.barWidth ? this.options.barWidth * pixelRatio : 1;
    const barGap = this.options.barGap ? this.options.barGap * pixelRatio : barWidth / 2;

    const waveColor = this.options.waveColor || '#4dd37e';

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
  }
}

export default Waveform;
