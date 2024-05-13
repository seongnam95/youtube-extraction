import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

import { Duration } from '@/features/SoundExtraction/components/AudioWave';

import { draw } from './draw';

interface useAudioWaveParams {
  container: RefObject<HTMLElement>;
  canvas: RefObject<HTMLCanvasElement>;
  audioBuffer: AudioBuffer | null;
  duration: Duration;
}

export function useAudioWave({ container, canvas, audioBuffer, duration }: useAudioWaveParams) {
  const [peaks, setPeaks] = useState<Array<Float32Array | number[]>>();

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

  const handleHover = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!container.current || !duration.full) return;

      const hoverLine = document.getElementById('hover-line');
      if (!hoverLine) return;

      const containerRect = container.current.getBoundingClientRect();
      const containerWidth = containerRect.width;

      // 이벤트의 X 위치를 슬라이더 상대 위치로 계산
      const positionX = event.clientX - containerRect.left;

      // duration의 시작과 끝 위치를 계산
      const startPosition = (duration.begin / duration.full) * containerWidth;
      const endPosition = (duration.end / duration.full) * containerWidth;

      // 위치가 duration.begin과 duration.end 사이에 있는지 확인
      if (positionX >= startPosition && positionX <= endPosition) {
        hoverLine.style.opacity = '1';
        hoverLine.style.left = `${(positionX / containerWidth) * 100}%`;
      } else {
        hoverLine.style.opacity = '0';
      }
    },
    [container, duration],
  );

  const handleMouseLeave = useCallback(() => {
    const hoverLine = document.getElementById('hover-line');
    if (hoverLine) hoverLine.style.opacity = '0';
  }, []);

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
  }, [container, canvas]);

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
    if (container.current) resizeObserver.observe(container.current);
    return () => resizeObserver.disconnect();
  }, [resizeCanvas]);

  useEffect(() => drawWave(), [peaks, duration.begin, duration.end]);

  return {
    handleHover,
    handleMouseLeave,
    duration,
  };
}

export default useAudioWave;
