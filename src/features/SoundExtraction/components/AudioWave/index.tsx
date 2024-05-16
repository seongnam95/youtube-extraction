import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/cn';

import { convertToTime } from './calculation';
import Slider from './components/Slider';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import useAudioWave from './hooks/useAudioWave';
import { type AudioWaveOptions, type Duration } from './type';

interface AudioWaveProps {
  className?: string;
  audioUrl?: string;
  options?: AudioWaveOptions;
}

const AudioWave = ({ className, audioUrl }: AudioWaveProps) => {
  const audioContextRef = useRef<AudioContext | null>(null);
  if (!audioContextRef.current) audioContextRef.current = new AudioContext();
  const audioContext = audioContextRef.current;

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [duration, setDuration] = useState<Duration>({ full: 0, begin: 0, end: 0 });

  const { handleHover, handleMouseLeave } = useAudioWave({
    containerRef,
    canvasRef,
    audioBuffer,
    duration,
  });

  const { play, pause, stop, audioState, currentTime, startedAt, setStartedAt } = useAudioPlayer({
    audioContext,
    audioBuffer,
    duration,
  });

  const handleChangeSlider = (updatedDuration: Duration, handle: 'begin' | 'end') => {
    setDuration(updatedDuration);

    if (handle === 'end') setStartedAt(updatedDuration.end - 1);
    else if (handle === 'begin') setStartedAt(updatedDuration.begin);
  };

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
      <div id="scroll-wrap" className="mb-8">
        <div
          ref={containerRef}
          className="relative block h-full w-full"
          onMouseMove={handleHover}
          onMouseLeave={handleMouseLeave}
        >
          {/* Slider */}
          <Slider containerRef={containerRef} duration={duration} onChange={handleChangeSlider} />

          {/* Hover Line */}
          <div
            id="hover-line"
            className="absolute left-10 h-full w-[1px] bg-foreground opacity-0 transition-opacity duration-100"
          />

          {/* Progress Line */}
          <div
            id="progress-line"
            className={cn(
              'absolute h-full w-[1px] bg-foreground',
              startedAt === duration.begin && 'opacity-0',
              audioState !== 'stopped' && 'opacity-100',
            )}
            style={{
              left: `${(currentTime / duration.full) * 100}%`,
            }}
          />

          {/* Canvas */}
          <canvas ref={canvasRef} />
        </div>
      </div>

      {audioState}

      <p>{convertToTime(currentTime)}</p>
      <button className="mt-10" onClick={play}>
        Play
      </button>
      <button className="ml-4" onClick={pause}>
        Pause
      </button>
      <button className="ml-4" onClick={stop}>
        Stop
      </button>
    </div>
  );
};

export default AudioWave;
