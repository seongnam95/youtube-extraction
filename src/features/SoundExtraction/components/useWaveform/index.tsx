import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { draw } from './draw';

export function useAudioWave() {
  const audioContext = new AudioContext();

  const container = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const slider = useRef<HTMLDivElement>(null);

  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);

  const [beginTime, setBeginTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);

  const handleResize = (pos: 'left' | 'right') => (event: React.MouseEvent) => {
    if (!canvas.current || !audioBuffer) return;

    const duration = audioBuffer.duration;
    const canvasWidth = canvas.current.offsetWidth;

    const startX = event.clientX;
    const startBeginTime = beginTime;
    const startEndTime = endTime;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!slider.current) return;

      const diff = moveEvent.clientX - startX;
      const diffDuration = (diff / canvasWidth) * duration;

      if (pos === 'left') {
        const newBeginTime = Math.max(0, startBeginTime + diffDuration);
        if (newBeginTime > duration - endTime) {
          setBeginTime(newBeginTime);
        }
      } else {
        const newEndTime = Math.min(duration, startEndTime + diffDuration);
        if (newEndTime > beginTime) {
          setEndTime(newEndTime);
        }
      }

      // drawWave();
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener(
      'mouseup',
      () => {
        document.removeEventListener('mousemove', handleMouseMove);
      },
      { once: true },
    );
  };

  const drawWave = () => {
    if (!canvas.current || !audioBuffer) return;
    const ctx = canvas.current.getContext('2d');
    if (!ctx) return;

    const channelData = audioBuffer.getChannelData(0);

    draw(ctx, channelData, {
      width: canvas.current.width,
      height: canvas.current.height,
    });
  };

  const onLoad = (url: string) => {
    fetch(url).then((response) => {
      response.arrayBuffer().then((arrayBuffer) => {
        audioContext.decodeAudioData(arrayBuffer).then((decodedBuffer) => {
          setAudioBuffer(decodedBuffer);
          setEndTime(decodedBuffer.duration);
        });
      });
    });
  };

  const setCanvasSize = () => {
    if (!container.current || !canvas.current) return;
    const pixelRatio = window.devicePixelRatio || 1;

    const { offsetWidth, offsetHeight } = container.current;

    canvas.current.width = offsetWidth * pixelRatio;
    canvas.current.height = offsetHeight * pixelRatio;
    canvas.current.style.width = `${offsetWidth}px`;
    canvas.current.style.height = `${offsetHeight}px`;
  };

  useEffect(() => {
    if (!container.current || !canvas.current || !audioBuffer) return;
    setCanvasSize();
    drawWave();
  }, [container, canvas, audioBuffer]);

  useEffect(() => {
    if (!slider.current || !audioBuffer) return;

    const fullDuration = audioBuffer.duration;
    const startRatio = (beginTime / fullDuration) * 100;
    const endRatio = (endTime / fullDuration) * 100 - startRatio;

    slider.current.style.left = `${startRatio}%`;
    slider.current.style.width = `${endRatio}%`;
  }, [slider, audioBuffer, beginTime, endTime]);

  const WaveformComponent = () => (
    <div className="bg-surface">
      <div id="scroll-wrap">
        <div ref={container} className="relative block h-full w-full">
          <canvas ref={canvas} />
          <div className="absolute top-0 h-full bg-primary-surface" ref={slider}>
            <div
              id="handle-left"
              className="absolute -left-[12px] h-full w-3"
              onMouseDown={handleResize('left')}
            >
              <div className="absolute h-full w-full bg-primary" />
            </div>
            <div
              id="handle-right"
              className="absolute -right-[12px] h-full w-3"
              onMouseDown={handleResize('right')}
            >
              <div className="absolute h-full w-full bg-primary" />
            </div>
          </div>
          <div id="progress-line" className="absolute" />
        </div>
      </div>
    </div>
  );

  return {
    WaveformComponent,
    onLoad,
  };
}

export default useAudioWave;
