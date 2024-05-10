import { useEffect, useRef, useState } from 'react';

import { convertToTime } from '@/features/SoundExtraction/components/AudioWave/calculation';
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

const audioContext = new AudioContext();

const AudioWave = ({ className, audioUrl }: AudioWaveProps) => {
  const container = useRef<HTMLDivElement>(null);
  const slider = useRef<HTMLDivElement>(null);

  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);

  const { duration, resizeSlider } = useAudioWave({
    container: container,
    slider: slider,
    audioBuffer: audioBuffer,
  });

  useEffect(() => {
    if (audioUrl && !audioBuffer) {
      fetch(audioUrl).then((response) => {
        response.arrayBuffer().then((arrayBuffer) => {
          audioContext.decodeAudioData(arrayBuffer).then((decodedBuffer) => {
            setAudioBuffer(decodedBuffer);
          });
        });
      });
    }
  }, [audioUrl]);

  return (
    <div className={className}>
      <div id="scroll-wrap">
        <div ref={container} className="relative block h-full w-full">
          <div ref={slider} className="absolute top-0 h-full ">
            <div
              id="handle-left"
              className="absolute -left-[12px] h-full w-3"
              onMouseDown={resizeSlider('left')}
            >
              <div
                data-content={convertToTime(duration.begin)}
                className="absolute h-full w-full bg-primary before:absolute before:-bottom-6 before:left-1/2 before:z-10 before:h-[20px] before:-translate-x-1/2 before:text-xs before:content-[attr(data-content)]"
              />
            </div>
            <div
              id="handle-right"
              className="absolute -right-[12px] h-full w-3"
              onMouseDown={resizeSlider('right')}
            >
              <div
                data-content={convertToTime(duration.end)}
                className="absolute h-full w-full bg-primary before:absolute before:-bottom-6 before:left-1/2 before:z-10 before:h-[20px] before:-translate-x-1/2 before:text-xs before:content-[attr(data-content)]"
              />
            </div>
          </div>
          <div id="progress-line" className="absolute" />
        </div>
      </div>
    </div>
  );
};

export default AudioWave;
