import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

import { draw } from './draw';

interface useAudioWaveParams {
  container: RefObject<HTMLElement>;
  slider: RefObject<HTMLElement>;
  audioBuffer: AudioBuffer | null;
}

export interface Duration {
  full: number;
  begin: number;
  end: number;
}

export function useAudioWave({ container, slider, audioBuffer }: useAudioWaveParams) {
  const canvas = useRef<HTMLCanvasElement>();

  const [peaks, setPeaks] = useState<Array<Float32Array | number[]>>();
  const [duration, setDuration] = useState<Duration>({ full: 0, begin: 0, end: 0 });

  /* 웨이브 그리기 */
  const drawWave = () => {
    if (!canvas.current || !peaks) return;
    const ctx = canvas.current.getContext('2d');
    if (!ctx) return;

    draw(ctx, peaks, duration, {
      barWidth: 1,
      barGap: 1,
      waveColor: '#3bcdc2',
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

  /* 슬라이더 리사이즈 */
  const resizeSlider = (pos: 'left' | 'right') => (event: React.MouseEvent) => {
    if (!container.current) return;
    event.preventDefault();
    event.stopPropagation();

    const canvasWidth = container.current.offsetWidth;
    const startX = event.clientX;
    let frameId: number;

    const updateDuration = (newBeginTime: number, newEndTime: number) => {
      if (pos === 'left' && newBeginTime <= duration.end) {
        setDuration((prev) => ({ ...prev, begin: newBeginTime }));
      } else if (pos === 'right' && newEndTime >= duration.begin) {
        setDuration((prev) => ({ ...prev, end: newEndTime }));
      }
    };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        const diff = moveEvent.clientX - startX;
        const diffDuration = (diff / canvasWidth) * duration.full;

        const newBeginTime = pos === 'left' ? Math.max(0, duration.begin + diffDuration) : duration.begin;
        const newEndTime =
          pos === 'right' ? Math.min(duration.full, duration.end + diffDuration) : duration.end;

        updateDuration(newBeginTime, newEndTime);
      });
    };

    const cleanup = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', cleanup);
      document.removeEventListener('mouseleave', cleanup);
      cancelAnimationFrame(frameId);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', cleanup);
    document.addEventListener('mouseleave', cleanup);
  };

  /* 캔버스 생성 */
  const createCanvas = () => {
    if (!container.current) return;

    const canvasEl = document.createElement('canvas');
    canvas.current = canvasEl;
    container.current.appendChild(canvasEl);

    resizeCanvas();
  };

  /* 캔버스 리사이즈 */
  const resizeCanvas = useCallback(() => {
    if (!container.current || !canvas.current) return;
    const pixelRatio = window.devicePixelRatio || 1;

    const { offsetWidth, offsetHeight } = container.current;

    canvas.current.width = offsetWidth * pixelRatio;
    canvas.current.height = offsetHeight * pixelRatio;
    canvas.current.style.width = `${offsetWidth}px`;
    canvas.current.style.height = `${offsetHeight}px`;

    drawWave();
  }, [duration]);

  /* 초기 세팅 */
  useEffect(() => {
    if (!container.current || canvas.current || !audioBuffer) return;
    const peaks = exportPeaks();
    const duration = audioBuffer.duration;

    setPeaks(peaks);
    setDuration((prev) => ({
      ...prev,
      full: duration,
      end: duration,
    }));

    createCanvas();
  }, [audioBuffer]);

  /* 윈도우 리사이즈 */
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => resizeCanvas());
    if (container.current) resizeObserver.observe(container.current);
    return () => resizeObserver.disconnect();
  }, [resizeCanvas]);

  /* 슬라이더 시간 변경 */
  useEffect(() => {
    if (!slider.current || !duration) return;
    const startRatio = (duration.begin / duration.full) * 100;
    const endRatio = (duration.end / duration.full) * 100 - startRatio;

    slider.current.style.left = `${startRatio}%`;
    slider.current.style.width = `${endRatio}%`;

    drawWave();
  }, [duration]);

  return {
    resizeSlider,
    duration,
  };
}

export default useAudioWave;
