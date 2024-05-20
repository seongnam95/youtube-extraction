import React, { RefObject, useCallback } from 'react';

import { convertToTime } from '../calculation';
import { Duration } from '../type';

interface SliderProps {
  containerRef: RefObject<HTMLElement>;
  duration: Duration;
  onClick?: (duration: number) => void;
  onChange?: (duration: Duration, handle: 'begin' | 'end') => void;
  onEnd?: () => void;
}

const Slider = ({ containerRef, duration, onClick, onChange, onEnd }: SliderProps) => {
  const handleMouseDown = useCallback(
    (handle: 'begin' | 'end') => (downEvent: React.MouseEvent) => {
      if (!containerRef.current) return;

      downEvent.preventDefault();
      downEvent.stopPropagation();

      const parentWidth = containerRef.current.clientWidth;
      const startX = downEvent.clientX;

      let frameId: number;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        moveEvent.preventDefault();
        moveEvent.stopPropagation();

        cancelAnimationFrame(frameId);

        frameId = requestAnimationFrame(() => {
          const diffX = moveEvent.clientX - startX;
          const diffDuration = (diffX / parentWidth) * duration.full;

          const newBeginTime =
            handle === 'begin' ? Math.max(0, duration.begin + diffDuration) : duration.begin;
          const newEndTime =
            handle === 'end' ? Math.min(duration.full, duration.end + diffDuration) : duration.end;

          if (
            (handle === 'begin' && newBeginTime <= duration.end) ||
            (handle === 'end' && newEndTime >= duration.begin)
          ) {
            onChange?.({ ...duration, begin: newBeginTime, end: newEndTime }, handle);
          }
        });
      };

      const handleMouseUp = (upEvent: MouseEvent) => {
        upEvent.preventDefault();
        upEvent.stopPropagation();

        cleanup();
      };

      const cleanup = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        cancelAnimationFrame(frameId);
        onEnd?.();
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [duration, onChange],
  );

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - containerRect.left;

    const clickedTime = (x / containerRect.width) * duration.full;
    onClick?.(clickedTime);
  };

  const leftRatio = (duration.begin / duration.full) * 100;
  const widthRatio = (duration.end / duration.full) * 100 - leftRatio;

  return (
    <div
      className="absolute top-0 h-full"
      style={{
        left: `${leftRatio}%`,
        width: `${widthRatio}%`,
      }}
    >
      {/* Begin Handle */}
      <div className="absolute -left-[12px] h-full w-3" onMouseDown={handleMouseDown('begin')}>
        <div
          data-content={convertToTime(duration.begin)}
          className="absolute h-full w-full cursor-ew-resize rounded-l-md bg-primary before:absolute before:-bottom-6 before:left-1/2 before:z-10 before:h-[20px] before:-translate-x-1/2 before:select-none before:text-xs before:text-foreground-muted before:content-[attr(data-content)]"
        />
      </div>

      {/* End Handle */}
      <div className="absolute -right-[12px] h-full w-3" onMouseDown={handleMouseDown('end')}>
        <div
          data-content={convertToTime(duration.end)}
          className="absolute h-full w-full cursor-ew-resize rounded-r-md bg-primary before:absolute before:-bottom-6 before:left-1/2 before:z-10 before:h-[20px] before:-translate-x-1/2 before:select-none before:text-xs before:text-foreground-muted before:content-[attr(data-content)]"
        />
      </div>

      {/* Hover able */}
      <div className="absolute top-0 h-full w-full" onClick={handleClick} />

      {/* Duration Label */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 select-none text-xs">
        {convertToTime(duration.end - duration.begin)}
      </div>
    </div>
  );
};

export default Slider;
