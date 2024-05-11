import { useEffect, useRef, useState } from 'react';

import { convertToTime } from '@/features/SoundExtraction/components/AudioWave/calculation';
import { useAudioContext } from '@/features/SoundExtraction/components/AudioWave/context';
import { useAudioPlayer } from '@/features/SoundExtraction/components/AudioWave/useAudioPlayer';
import useAudioWave from '@/features/SoundExtraction/components/AudioWave/useAudioWave';

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

const AudioWave = ({ className, audioUrl }: AudioWaveProps) => {
  const audioContextRef = useRef<AudioContext | null>(null);
  if (!audioContextRef.current) audioContextRef.current = new AudioContext();
  const audioContext = audioContextRef.current;

  const container = useRef<HTMLDivElement>(null);
  const slider = useRef<HTMLDivElement>(null);

  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);

  const { play } = useAudioPlayer({
    audioContext,
    audioBuffer,
  });

  const { duration, resizeSlider, handleHover, handleMouseLeave } = useAudioWave({
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
        <div
          ref={container}
          className="relative block h-full w-full"
          onMouseMove={handleHover}
          onMouseLeave={handleMouseLeave}
        >
          {/* Slider */}
          <div ref={slider} className="absolute top-0 h-full">
            {/* Left Handle */}
            <div className="absolute -left-[12px] h-full w-3" onMouseDown={resizeSlider('left')}>
              <div
                data-content={convertToTime(duration.begin)}
                className="absolute h-full w-full bg-primary before:absolute before:-bottom-6 before:left-1/2 before:z-10 before:h-[20px] before:-translate-x-1/2 before:select-none before:text-xs before:text-foreground-muted before:content-[attr(data-content)]"
              />
            </div>
            {/* Hover able */}
            <div id="hoverable" className="absolute h-full w-full" />

            {/* Right Handle */}
            <div className="absolute -right-[12px] h-full w-3" onMouseDown={resizeSlider('right')}>
              <div
                data-content={convertToTime(duration.end)}
                className="absolute h-full w-full bg-primary before:absolute before:-bottom-6 before:left-1/2 before:z-10 before:h-[20px] before:-translate-x-1/2 before:select-none before:text-xs before:text-foreground-muted before:content-[attr(data-content)]"
              />
            </div>

            {/* Duration */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 select-none text-xs">
              {convertToTime(duration.end - duration.begin)}
            </div>
          </div>

          {/* Hover Line */}
          <div
            id="hover-line"
            className="absolute left-10 h-full w-[1px] bg-foreground opacity-0 transition-opacity duration-100"
          />
          {/* Progress Line */}
          <div id="progress-line" className="absolute" />
        </div>
      </div>

      <button className="mt-10" onClick={play}>
        플레이
      </button>
    </div>
  );
};

export default AudioWave;
