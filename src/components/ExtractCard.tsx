import React from 'react';

import AudioWaveIcon from '@/assets/svg/audio-wave.svg';
import DownloadIcon from '@/assets/svg/download.svg';
import YoutubeIcon from '@/assets/svg/youtube.svg';
import Audio from '@/components/Audio';
import { Button } from '@/components/ui/Button';
import { Flex } from '@/components/ui/Flex';
import { IconButton } from '@/components/ui/IconButton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { useAudioData } from '@/context/AudioDataContext';
import { cn } from '@/lib/cn';

interface ExtractCardProps {
  className?: string;
}

const ExtractCard = ({ className }: ExtractCardProps) => {
  const { audioData } = useAudioData();

  if (!audioData) return null;
  return (
    <div className={cn('w-full rounded-md bg-surface px-5 py-6', className)}>
      {/* Audio Title */}
      <Flex align="center" gap="3">
        <YoutubeIcon className="mt-2pxr size-5 flex-shrink-0" />
        <p className="truncate text-sm">{audioData.title}</p>
      </Flex>

      {/* Audio Player */}
      <Audio className="mt-4 w-full" audio={audioData.blob} />

      {/* Button Wrap */}
      <Flex gap="3" className="mt-9" justify="end">
        <IconButton size="lg" variant="outline" title="편집" aria-label="편집">
          <AudioWaveIcon className="size-5 fill-foreground" />
        </IconButton>
        <Button>
          <DownloadIcon className="mr-2 size-5 fill-primary-foreground" />
          다운로드
        </Button>
      </Flex>
    </div>
  );
};

export default ExtractCard;
