import React, { useEffect } from 'react';

import { PauseIcon, PlayIcon } from '@radix-ui/react-icons';

import { convertToTime } from '@/components/AudioWave/calculation';
import { useAudioPlayer } from '@/components/AudioWave/hooks/useAudioPlayer';
import { Flex } from '@/components/ui/Flex';
import { IconButton } from '@/components/ui/IconButton';
import { Slider } from '@/components/ui/Slider';
import { Text } from '@/components/ui/Text';

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
    <Flex align="center" gap="4" className={className}>
      <IconButton size="sm" variant="ghost" circle onClick={playPause}>
        {audioState === 'playing' ? (
          <PauseIcon className="size-4 fill-foreground" />
        ) : (
          <PlayIcon className="ml-2pxr size-4 fill-foreground" />
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
    </Flex>
  );
};

export default Audio;
