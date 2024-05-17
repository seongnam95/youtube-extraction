import { useEffect, useRef, useState } from 'react';

import PauseIcon from '@/assets/svg/pause.svg?react';
import PlayIcon from '@/assets/svg/play.svg?react';
import { Flex } from '@/components/ui/Flex';
import { IconButton } from '@/components/ui/IconButton';
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

  const { playPause, audioState, currentTime, startedAt, setStartedAt } = useAudioPlayer({
    audioContext,
    audioBuffer,
    duration,
  });

  const updateDuration = (updatedDuration: Duration, pos: 'begin' | 'end') => {
    setDuration(updatedDuration);

    if (pos === 'begin') setStartedAt(updatedDuration.begin);
    else if (pos === 'end') setStartedAt(updatedDuration.end - 3);
  };

  const handleInputChange = (pos: 'begin' | 'end') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);

    const updatedDuration = { ...duration, [pos]: value };
    updateDuration(updatedDuration, pos);
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
  }, [audioUrl, audioContext]);

  return (
    <div className={className}>
      <div id="scroll-wrap" className="mx-3 mb-8">
        <div
          ref={containerRef}
          className="relative block h-full w-full"
          onMouseMove={handleHover}
          onMouseLeave={handleMouseLeave}
        >
          {/* Slider */}
          <Slider containerRef={containerRef} duration={duration} onChange={updateDuration} />

          {/* Hover Line */}
          <div
            id="hover-line"
            className="absolute left-10 h-full w-[1px] bg-foreground opacity-0 transition-opacity duration-100"
          />

          {/* Progress Line */}
          <div
            id="progress-line"
            data-content={convertToTime(currentTime)}
            className={cn(
              'absolute h-full w-[1px] bg-foreground',
              startedAt === duration.begin && 'opacity-0',
              audioState !== 'stopped' && 'opacity-100',
              'before:absolute before:bottom-full before:left-1/2 before:mb-2 before:-translate-x-1/2 before:rounded-full before:bg-surface before:px-3 before:py-0.5 before:text-sm before:text-foreground-accent before:content-[attr(data-content)]',
            )}
            style={{
              left: `${(currentTime / duration.full) * 100}%`,
            }}
          />

          {/* Canvas */}
          <canvas ref={canvasRef} />
        </div>
      </div>

      <Flex className="mt-14" align="center" justify="center">
        <IconButton size="xl" variant="outline" circle onClick={playPause}>
          {audioState === 'playing' ? (
            <PauseIcon className="h-5 w-5 fill-foreground text-foreground" />
          ) : (
            <PlayIcon className="ml-1 h-6 w-6 fill-foreground text-foreground" />
          )}
        </IconButton>
      </Flex>

      {/* 
      <Flex gap="2" justify="around">
        <input
          type="number"
          min={0}
          max={duration.end}
          value={duration.begin}
          onChange={handleInputChange('begin')}
        />
        <input
          type="number"
          min={duration.begin}
          max={duration.full}
          value={duration.end}
          onChange={handleInputChange('end')}
        />
      </Flex> */}
    </div>
  );
};

export default AudioWave;
