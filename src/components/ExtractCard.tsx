import React from 'react';

import { DownloadIcon, MixerHorizontalIcon } from '@radix-ui/react-icons';

import YoutubeIcon from '@/assets/svg/youtube.svg';
import Audio from '@/components/Audio';
import { Button } from '@/components/ui/Button';
import { Flex } from '@/components/ui/Flex';
import { IconButton } from '@/components/ui/IconButton';
import { Tooltip } from '@/components/ui/Tooltip';
import { useAudioData } from '@/context/AudioDataContext';
import { cn } from '@/lib/cn';

interface ExtractCardProps {
  className?: string;
  onEdit?: () => void;
  onDownload?: () => void;
}

const ExtractCard = ({ className, onEdit, onDownload }: ExtractCardProps) => {
  const { audioData } = useAudioData();

  if (!audioData) return null;
  return (
    <div className={cn('w-full rounded-md bg-surface px-5 py-6', className)}>
      {/* 오디오 제목 */}
      <Flex align="center" gap="3">
        <YoutubeIcon className="mt-2pxr size-5 flex-shrink-0" />
        <p className="truncate text-sm">{audioData.title}</p>
      </Flex>

      {/* 오디오 플레이어 */}
      <Audio className="mt-4 w-full" audio={audioData.blob} />

      <Flex gap="3" className="mt-9" justify="end">
        {/* 편집 버튼 */}
        <Tooltip content="오디오 편집" asChild>
          <IconButton size="lg" variant="outline" aria-label="편집" onClick={onEdit}>
            <MixerHorizontalIcon />
          </IconButton>
        </Tooltip>

        {/* 다운로드 버튼 */}
        <Button onClick={onDownload}>
          <DownloadIcon className="mr-2 size-4 fill-primary-foreground" />
          다운로드
        </Button>
      </Flex>
    </div>
  );
};

export default ExtractCard;
