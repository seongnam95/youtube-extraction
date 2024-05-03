import { useContext, useState } from 'react';

import { WaveSurferContext } from '@/features/SoundExtraction/components/WaveSurfer/WaveSurferRoot';
import { convertToTime } from '@/features/SoundExtraction/components/WaveSurfer/calculation';

interface RegionData {
  start: number;
  end: number;
  width: number;
}

interface RegionProps {
  onChange?: (data: RegionData) => void;
}

export const Region = ({ onChange }: RegionProps) => {
  const { containerRef } = useContext(WaveSurferContext);

  const [region, setRegion] = useState<{ start: number; end: number }>({ start: 0, end: 0 });

  const handleThumbChange = (side: 'left' | 'right') => (event: React.MouseEvent) => {
    const startX = event.clientX;
    const startLeft = region.start;
    const startRight = region.end;
    const containerWidth = containerRef.current ? containerRef.current.offsetWidth : 0;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const diff = moveEvent.clientX - startX;
      const diffPercent = (diff / containerWidth) * 100;

      if (side === 'left') {
        const updatedLeft = Math.max(0, startLeft + diffPercent);
        if (updatedLeft < 100 - region.end) {
          setRegion((prev) => ({
            ...prev,
            start: updatedLeft,
          }));
        }
      } else {
        const updatedRight = Math.max(0, startRight - diffPercent);
        if (updatedRight < 100 - region.start) {
          setRegion((prev) => ({
            ...prev,
            end: updatedRight,
          }));
        }
      }

      onChange?.({
        start: region.start,
        end: region.end,
        width: region.end - region.start,
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="absolute top-0 h-full w-full">
      <div
        className="relative left-0 z-10 h-full bg-[rgba(1,7,31,0.8)]"
        style={{ width: `${region.start}%` }}
      >
        {/* Left Thumb */}
        <div
          onMouseDown={handleThumbChange('left')}
          data-content="20:10.1" //{convertToTime(regionDuration.start)}
          className="absolute right-0 h-full w-3 cursor-ew-resize rounded-l-md border-l-[12px] border-primary
                after:absolute after:-bottom-6 after:left-1/2 after:z-10 after:-translate-x-[60%] 
                after:text-xs after:text-foreground-muted after:content-[attr(data-content)]"
        />
      </div>

      <div
        className="absolute right-0 top-0 h-full w-3 bg-[rgba(1,7,31,0.8)]"
        style={{ width: `${region.end}%` }}
      >
        {/* Right Thumb */}
        <div
          onMouseDown={handleThumbChange('right')}
          data-content="10:10.0" //{convertToTime(regionDuration.end)}
          className="absolute h-full w-3 cursor-ew-resize rounded-r-md border-l-[12px] border-primary after:absolute after:-bottom-6 after:left-1/2 after:z-10 after:-translate-x-[70%] after:text-xs after:text-foreground-muted after:content-[attr(data-content)]"
        />
      </div>
    </div>
  );
};
