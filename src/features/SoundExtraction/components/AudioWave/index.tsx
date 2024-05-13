import { useEffect, useRef, useState } from 'react';

import { convertToTime } from '@/features/SoundExtraction/components/AudioWave/calculation';
import Slider from '@/features/SoundExtraction/components/AudioWave/components/Slider';
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

export interface Duration {
  full: number;
  begin: number;
  end: number;
}

const AudioWave = ({ className, audioUrl }: AudioWaveProps) => {
  const audioContextRef = useRef<AudioContext | null>(null);
  if (!audioContextRef.current) audioContextRef.current = new AudioContext();
  const audioContext = audioContextRef.current;

  const container = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [duration, setDuration] = useState<Duration>({ full: 0, begin: 0, end: 0 });

  const { handleHover, handleMouseLeave } = useAudioWave({
    container: container,
    canvas: canvas,
    audioBuffer: audioBuffer,
    duration: duration,
  });

  const { toggle, isPlaying, currentTime } = useAudioPlayer({
    audioContext,
    audioBuffer,
    duration,
  });

  useEffect(() => {
    if (audioUrl && !audioBuffer) {
      fetch(audioUrl).then((response) => {
        response.arrayBuffer().then((arrayBuffer) => {
          audioContext.decodeAudioData(arrayBuffer).then((decodedBuffer) => {
            setAudioBuffer(decodedBuffer);
            setDuration((prev) => ({
              ...prev,
              full: decodedBuffer.duration,
              end: decodedBuffer.duration,
            }));
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
          <Slider duration={duration} onChange={setDuration} />

          {/* Hover Line */}
          <div
            id="hover-line"
            className="absolute left-10 h-full w-[1px] bg-foreground opacity-0 transition-opacity duration-100"
          />

          {/* Progress Line */}
          <div id="progress-line" className="absolute h-full w-[1px] bg-foreground" />
          <canvas ref={canvas} />
        </div>
      </div>

      <p>{convertToTime(currentTime)}</p>
      <button className="mt-10" onClick={toggle}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
};

export default AudioWave;
