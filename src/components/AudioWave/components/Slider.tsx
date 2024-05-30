'use client';

import React, { RefObject, useCallback } from 'react';

import { convertToTime } from '../calculation';
import { Duration } from '../type';

interface SliderProps {
  containerRef: RefObject<HTMLElement>;
  duration: Duration;
  onChange?: (duration: Duration, handle: 'begin' | 'end') => void;
}

const Slider = ({ containerRef, duration, onChange }: SliderProps) => {
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
            (handle === 'begin' && newBeginTime <= duration.end - 1) ||
            (handle === 'end' && newEndTime >= duration.begin + 1)
          ) {
            const updatedDuration = { ...duration, begin: newBeginTime, end: newEndTime };
            onChange?.(updatedDuration, handle);
          }
        });
      };

      const cleanup = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', cleanup);
        cancelAnimationFrame(frameId);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', cleanup);
    },
    [duration, onChange],
  );

  const leftRatio = (duration.begin / duration.full) * 100;
  const widthRatio = (duration.end / duration.full) * 100 - leftRatio;

  return (
    <div
      className="pointer-events-none absolute top-0 h-full"
      style={{
        left: `${leftRatio}%`,
        width: `${widthRatio}%`,
      }}
    >
      {/* Begin Handle */}
      <div
        className="pointer-events-auto absolute -left-[12px] h-full w-3"
        onMouseDown={handleMouseDown('begin')}
      >
        <div
          data-content={convertToTime(duration.begin)}
          className="absolute h-full w-full cursor-ew-resize rounded-l-md bg-[#18EDAD] before:absolute before:-bottom-6 before:left-1/2 before:z-10 before:h-[20px] before:-translate-x-1/2 before:select-none before:text-xs before:text-foreground-muted before:content-[attr(data-content)]"
        />
      </div>

      {/* End Handle */}
      <div
        className="pointer-events-auto absolute -right-[12px] h-full w-3"
        onMouseDown={handleMouseDown('end')}
      >
        <div
          data-content={convertToTime(duration.end)}
          className="absolute h-full w-full cursor-ew-resize rounded-r-md bg-[#18EDAD] before:absolute before:-bottom-6 before:left-1/2 before:z-10 before:h-[20px] before:-translate-x-1/2 before:select-none before:text-xs before:text-foreground-muted before:content-[attr(data-content)]"
        />
      </div>

      {/* Duration Label */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 select-none text-xs">
        {convertToTime(duration.end - duration.begin)}
      </div>
    </div>
  );
};

export default Slider;
