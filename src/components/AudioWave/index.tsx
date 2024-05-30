'use client';

import React, { useEffect, useRef } from 'react';

import PauseIcon from '@/assets/svg/pause.svg';
import PlayIcon from '@/assets/svg/play.svg';
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
  audioFile?: File | Blob;
  options?: AudioWaveOptions;
}

const AudioWave = ({ className, audioFile }: AudioWaveProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const {
    load,
    playPause,
    stop,
    setDuration,
    audioContext,
    audioBuffer,
    duration,
    audioState,
    currentTime,
    setStartedAt,
  } = useAudioPlayer();

  const { isHover, hoverTime, handleMouseMove, handleMouseLeave } = useAudioWave({
    containerRef,
    canvasRef,
    audioBuffer,
    duration,
  });

  useEffect(() => {
    if (audioFile) load(audioFile);
  }, [audioFile]);

  const updateDuration = (updatedDuration: Duration, pos: 'begin' | 'end') => {
    setDuration(updatedDuration);

    if (pos === 'begin') setStartedAt(updatedDuration.begin);
    else if (pos === 'end') {
      if (updatedDuration.end - 3 > updatedDuration.begin) setStartedAt(updatedDuration.end - 3);
      else setStartedAt(updatedDuration.begin);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    if (audioState !== 'stopped') stop();

    const { begin, end, full } = duration;

    const containerRect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - containerRect.left;

    const clickedTime = (x / containerRect.width) * full;

    if (clickedTime >= begin && clickedTime <= end) setStartedAt(clickedTime);
  };

  if (!audioBuffer || !audioContext) return null;
  return (
    <div className={className}>
      <div id="scroll-wrap" className="mx-3 mb-8">
        <div
          ref={containerRef}
          className="relative block h-full w-full"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        >
          {/* Canvas */}
          <canvas ref={canvasRef} />

          {/* Slider */}
          <Slider containerRef={containerRef} duration={duration} onChange={updateDuration} />

          {/* Progress Line */}
          <div
            data-content={convertToTime(currentTime)}
            className={cn(
              'pointer-events-none absolute top-0 z-20 h-full w-[1px] bg-foreground',
              audioState !== 'stopped' && 'opacity-100',
              'before:text-foreground-accent before:absolute before:bottom-full before:left-1/2 before:mb-2 before:-translate-x-1/2 before:rounded-md before:bg-surface before:px-2 before:py-0.5 before:text-sm before:content-[attr(data-content)]',
            )}
            style={{
              left: `${(currentTime / duration.full) * 100}%`,
            }}
          />

          {/* Hover Line */}
          <div
            data-content={convertToTime(hoverTime)}
            className={cn(
              'pointer-events-none absolute left-10 top-0 h-full w-[1px] bg-foreground opacity-0 ',
              'before:absolute before:bottom-full before:left-1/2 before:mb-2 before:-translate-x-1/2 before:rounded-md before:bg-surface before:px-2 before:py-0.5 before:text-sm before:text-foreground before:content-[attr(data-content)]',
            )}
            style={{
              opacity: isHover ? 0.7 : 0,
              left: `${(hoverTime / duration.full) * 100}%`,
            }}
          />
        </div>
      </div>

      <Flex className="mt-14" align="center" justify="center">
        <IconButton size="xl" variant="outline" circle onClick={playPause}>
          {audioState === 'playing' ? (
            <PauseIcon
              className="h-5 w-5 fill-foreground text-foreground"
              style={{
                width: '1.25rem',
                height: '1.25rem',
              }}
            />
          ) : (
            <PlayIcon className="ml-1 h-6 w-6 fill-foreground text-foreground" />
          )}
        </IconButton>
      </Flex>
    </div>
  );
};

export default AudioWave;
