import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

import { draw } from '../draw';
import { type Duration } from '../type';

interface useAudioWaveParams {
  containerRef: RefObject<HTMLElement>;
  canvasRef: RefObject<HTMLCanvasElement>;
  audioBuffer: AudioBuffer | null;
  duration: Duration;
}

export function useAudioWave({ containerRef, canvasRef, audioBuffer, duration }: useAudioWaveParams) {
  const animationFrameRef = useRef<number | null>(null);

  const [peaks, setPeaks] = useState<Array<Float32Array | number[]>>();
  const [hoverTime, setHoverTime] = useState<number>(0);
  const [isHover, setIsHover] = useState<boolean>(false);

  /* 웨이브 그리기 */
  const drawWave = () => {
    if (!canvasRef.current || !peaks) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    draw(ctx, peaks, duration, {
      barWidth: 1,
      barGap: 1,
      waveColor: '#24F678',
      bgColor: '#21262C',
    });
  };

  /* 피크 추출 */
  const exportPeaks = useCallback(
    (channels: number = 2, precision: number = 10_000, maxLength: number = 5000) => {
      if (!audioBuffer) {
        throw new Error('The audio has not been decoded yet');
      }

      const maxChannels = Math.min(channels, audioBuffer.numberOfChannels);
      const peaks = [];
      for (let i = 0; i < maxChannels; i++) {
        const channelData = audioBuffer.getChannelData(i);
        const data = [];
        const sampleSize = Math.round(channelData.length / maxLength);

        for (let i = 0; i < maxLength; i++) {
          const sample = channelData.slice(i * sampleSize, (i + 1) * sampleSize);
          const max = Math.max(...sample.map((x) => Math.abs(x)));
          data.push(Math.round(max * precision) / precision);
        }
        peaks.push(data);
      }

      return peaks;
    },
    [audioBuffer],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);

      animationFrameRef.current = requestAnimationFrame(() => {
        if (!containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const containerWidth = containerRect.width;

        const positionX = e.clientX - containerRect.left;
        const newHoverTime = (duration.full / containerWidth) * positionX;

        const startPosition = (duration.begin / duration.full) * containerWidth;
        const endPosition = (duration.end / duration.full) * containerWidth;

        if (positionX >= startPosition && positionX <= endPosition) {
          setHoverTime(newHoverTime);
          setIsHover(true);
        } else setIsHover(false);
      });
    },
    [containerRef, duration],
  );

  const handleMouseLeave = () => {
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    setIsHover(false);
  };

  /* 캔버스 리사이즈 */
  const resizeCanvas = useCallback(() => {
    if (!containerRef.current || !canvasRef.current) return;
    const pixelRatio = window.devicePixelRatio || 1;

    const { offsetWidth, offsetHeight } = containerRef.current;

    canvasRef.current.width = offsetWidth * pixelRatio;
    canvasRef.current.height = offsetHeight * pixelRatio;
    canvasRef.current.style.width = `${offsetWidth}px`;
    canvasRef.current.style.height = `${offsetHeight}px`;

    drawWave();
  }, [containerRef, canvasRef, duration]);

  /* 피크 추출 */
  useEffect(() => {
    if (audioBuffer) {
      const peaks = exportPeaks();
      setPeaks(peaks);
    }
  }, [audioBuffer]);

  /* 윈도우 리사이즈 */
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => resizeCanvas());
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [resizeCanvas]);

  useEffect(() => drawWave(), [peaks, duration.begin, duration.end]);

  return {
    hoverTime,
    isHover,
    handleMouseMove,
    handleMouseLeave,
  };
}

export default useAudioWave;
