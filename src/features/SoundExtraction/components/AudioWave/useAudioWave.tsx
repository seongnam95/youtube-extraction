import { RefObject, useEffect, useRef, useState } from 'react';

import { draw } from './draw';

interface useAudioWaveParams {
  container: RefObject<HTMLElement>;
  audioUrl?: string;
}

export function useAudioWave({ container, audioUrl }: useAudioWaveParams) {
  const audioContext = useRef(new AudioContext());
  const canvas = useRef<HTMLCanvasElement>();

  const [duration, setDuration] = useState<number>(0);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);

  const [beginTime, setBeginTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);

  const resizeSlider = (pos: 'left' | 'right') => (event: React.MouseEvent) => {
    if (!container.current || !duration) return;

    event.preventDefault();
    event.stopPropagation();

    const canvasWidth = container.current.offsetWidth;
    const startX = event.clientX;
    const startBeginTime = beginTime;
    const startEndTime = endTime;

    let frameId: number; // requestAnimationFrame을 위한 변수

    const handleMouseMove = (moveEvent: MouseEvent) => {
      cancelAnimationFrame(frameId); // 이전 프레임 취소

      frameId = requestAnimationFrame(() => {
        moveEvent.preventDefault();
        moveEvent.stopPropagation();

        const diff = moveEvent.clientX - startX;
        const diffDuration = (diff / canvasWidth) * duration;

        let newBeginTime = startBeginTime;
        let newEndTime = startEndTime;

        if (pos === 'left') {
          newBeginTime = Math.max(0, startBeginTime + diffDuration);
          if (newBeginTime <= duration - endTime) {
            setBeginTime(newBeginTime);
          }
        } else {
          newEndTime = Math.min(duration, startEndTime + diffDuration);
          if (newEndTime >= beginTime) {
            setEndTime(newEndTime);
          }
        }

        drawWave();
      });
    };

    const unsubscribeDocument = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', unsubscribeDocument);
      cancelAnimationFrame(frameId); // 프레임 취소 추가
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', unsubscribeDocument);
  };

  const drawWave = async () => {
    if (!canvas.current || !audioBuffer) return;
    const ctx = canvas.current.getContext('2d');
    if (!ctx) return;
    const channelData = audioBuffer.getChannelData(0);

    await draw(ctx, channelData, {
      width: canvas.current.width,
      height: canvas.current.height,
    });
  };

  const createCanvas = () => {
    if (!container.current) return;

    const canvasEl = document.createElement('canvas');
    canvas.current = canvasEl;
    container.current.appendChild(canvasEl);

    resizeCanvas();
  };

  const resizeCanvas = () => {
    if (!container.current || !canvas.current) return;
    const pixelRatio = window.devicePixelRatio || 1;

    const { offsetWidth, offsetHeight } = container.current;

    canvas.current.width = offsetWidth * pixelRatio;
    canvas.current.height = offsetHeight * pixelRatio;
    canvas.current.style.width = `${offsetWidth}px`;
    canvas.current.style.height = `${offsetHeight}px`;
  };

  useEffect(() => {
    if (!container.current || canvas.current) return;
    createCanvas();
  }, [container, canvas]);

  useEffect(() => {
    if (audioUrl) {
      fetch(audioUrl).then((response) => {
        response.arrayBuffer().then((arrayBuffer) => {
          audioContext.current.decodeAudioData(arrayBuffer).then((decodedBuffer) => {
            setAudioBuffer(decodedBuffer);
            setDuration(decodedBuffer.duration);
            setEndTime(decodedBuffer.duration);
            drawWave();
          });
        });
      });
    }
  }, [audioUrl]);

  return {
    resizeSlider,
    duration,
    time: {
      beginTime,
      endTime,
    },
  };
}

export default useAudioWave;
