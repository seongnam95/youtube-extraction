import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Duration } from '@/features/SoundExtraction/components/AudioWave';
import { convertToTime } from '@/features/SoundExtraction/components/AudioWave/calculation';

interface SliderProps {
  duration: Duration;
  onChange?: (duration: Duration) => void;
}

const Slider = ({ duration, onChange }: SliderProps) => {
  const slider = useRef<HTMLDivElement>(null);
  const [ratio, setRatio] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const left = (duration.begin / duration.full) * 100;
    const width = (duration.end / duration.full) * 100 - left;
    setRatio({ left, width });
  }, [duration]);

  /* 슬라이더 리사이즈 */
  const resizeSlider = useCallback(
    (pos: 'left' | 'right') => (event: React.MouseEvent) => {
      const parentEl = slider.current?.parentElement;
      if (!parentEl) return;

      event.preventDefault();
      event.stopPropagation();

      const parentWidth = parentEl.clientWidth;
      const startX = event.clientX;
      let frameId: number;

      const updateDuration = (newBeginTime: number, newEndTime: number) => {
        if (
          (pos === 'left' && newBeginTime <= duration.end) ||
          (pos === 'right' && newEndTime >= duration.begin)
        )
          onChange?.({ ...duration, begin: newBeginTime, end: newEndTime });
      };

      const handleMouseMove = (moveEvent: MouseEvent) => {
        cancelAnimationFrame(frameId);
        frameId = requestAnimationFrame(() => {
          const diff = moveEvent.clientX - startX;
          const diffDuration = (diff / parentWidth) * duration.full;

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
    },
    [duration, onChange],
  );

  return (
    <div
      ref={slider}
      className="absolute top-0 h-full"
      style={{
        left: `${ratio.left}%`,
        width: `${ratio.width}%`,
      }}
    >
      {/* Left Handle */}
      <div className="absolute -left-[12px] h-full w-3" onMouseDown={resizeSlider('left')}>
        <div
          data-content={convertToTime(duration.begin)}
          className="absolute h-full w-full bg-primary before:absolute before:-bottom-6 before:left-1/2 before:z-10 before:h-[20px] before:-translate-x-1/2 before:select-none before:text-xs before:text-foreground-muted before:content-[attr(data-content)]"
        />
      </div>

      {/* Right Handle */}
      <div className="absolute -right-[12px] h-full w-3" onMouseDown={resizeSlider('right')}>
        <div
          data-content={convertToTime(duration.end)}
          className="absolute h-full w-full bg-primary before:absolute before:-bottom-6 before:left-1/2 before:z-10 before:h-[20px] before:-translate-x-1/2 before:select-none before:text-xs before:text-foreground-muted before:content-[attr(data-content)]"
        />
      </div>

      {/* Hover able */}
      <div id="hoverable" className="absolute h-full w-full" />

      {/* Duration */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 select-none text-xs">
        {convertToTime(duration.end - duration.begin)}
      </div>
    </div>
  );
};

export default Slider;
