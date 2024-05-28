import React, { useEffect } from 'react';

import PauseIcon from '@/assets/svg/pause.svg';
import PlayIcon from '@/assets/svg/play.svg';
import { convertToTime } from '@/components/AudioWave/calculation';
import { useAudioPlayer } from '@/components/AudioWave/hooks/useAudioPlayer';
import { IconButton } from '@/components/ui/IconButton';
import { Slider } from '@/components/ui/Slider';
import { Text } from '@/components/ui/Text';
import { cn } from '@/lib/cn';

interface AudioProps {
  className?: string;
  audio?: File | Blob;
}

const Audio = ({ className, audio }: AudioProps) => {
  const { load, playPause, duration, audioState, currentTime, setStartedAt } = useAudioPlayer();

  useEffect(() => {
    if (audio) load(audio);
  }, [audio]);

  const handleSliderChange = (value: number[]) => setStartedAt(value[0]);

  return (
    <div className={cn('flex items-center gap-4', className)}>
      <IconButton size="sm" variant="secondary" onClick={playPause}>
        {audioState === 'playing' ? (
          <PauseIcon className="size-4 fill-foreground" />
        ) : (
          <PlayIcon className="size-4 fill-foreground" />
        )}
      </IconButton>

      <Text size="sm" whiteSpace="nowrap" className="min-w-12">
        {convertToTime(currentTime)}
      </Text>

      <Slider
        className="w-full"
        value={[currentTime]}
        max={duration.full}
        onValueChange={handleSliderChange}
      />

      <Text size="sm" whiteSpace="nowrap">
        {convertToTime(duration.full)}
      </Text>
    </div>
  );
};

export default Audio;
