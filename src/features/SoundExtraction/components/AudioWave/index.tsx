import { useEffect, useRef, useState } from 'react';

import useAudioWave from '@/features/SoundExtraction/components/AudioWave/useAudioWave';
import { cn } from '@/lib/cn';

interface AudioWaveProps {
  className?: string;
  audioUrl?: string;
  options?: AudioWaveOptions;
}

interface AudioWaveOptions {
  waveColor?: string;
  barWidth?: number;
  barGap?: number;
  barRadius?: number;
}

const AudioWave = ({ className, audioUrl, options = {} }: AudioWaveProps) => {
  const container = useRef<HTMLDivElement>(null);
  const slider = useRef<HTMLDivElement>(null);

  const { time, duration, resizeSlider } = useAudioWave({
    container: container,
    audioUrl: audioUrl,
  });

  useEffect(() => {
    if (!slider.current || !duration) return;

    const startRatio = (time.beginTime / duration) * 100;
    const endRatio = (time.endTime / duration) * 100 - startRatio;

    slider.current.style.left = `${startRatio}%`;
    slider.current.style.width = `${endRatio}%`;
  }, [time.beginTime, time.endTime, duration]);

  return (
    <div className={cn('bg-surface', className)}>
      <div id="scroll-wrap">
        <div ref={container} className="relative block h-full w-full">
          <div ref={slider} className="absolute top-0 h-full bg-primary-surface">
            <div
              id="handle-left"
              className="absolute -left-[12px] h-full w-3"
              onMouseDown={resizeSlider('left')}
            >
              <div className="absolute h-full w-full bg-primary" />
            </div>
            <div
              id="handle-right"
              className="absolute -right-[12px] h-full w-3"
              onMouseDown={resizeSlider('right')}
            >
              <div className="absolute h-full w-full bg-primary" />
            </div>
          </div>
          <div id="progress-line" className="absolute" />
        </div>
      </div>
    </div>
  );
};

export default AudioWave;
