'use client';

import { useState } from 'react';

import { useToast } from '@/components/ui/Toast/use-toast';
import { useAudioData } from '@/context/AudioDataContext';
import { downloadAudio } from '@/lib/downloadAudio';
import { audioExtraction } from '@/service/audio-extract-api';
import { AudioExtractData } from '@/types/audio';

interface AudioExtractParams {
  onExtractSuccess?: (data: AudioExtractData) => void;
  onExtractError?: (error: Error) => void;
}

export const useAudioExtract = ({ onExtractSuccess, onExtractError }: AudioExtractParams = {}) => {
  const { audioData, setAudioData } = useAudioData();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const loadFile = (audio: File) => setAudioData({ title: audio.name, blob: audio });

  const extract = (url: string) => {
    setIsLoading(true);
    setAudioData(null);

    audioExtraction(url)
      .then((data: AudioExtractData) => {
        setAudioData(data);
        onExtractSuccess?.(data);
      })
      .catch((error: Error) => {
        const errMsg = error.message || '알 수 없는 오류가 발생했습니다.';
        toast({
          variant: 'error',
          description: errMsg,
        });
        onExtractError?.(error);
      })
      .finally(() => setIsLoading(false));
  };

  const download = (audio: AudioExtractData | null) => {
    if (audio) downloadAudio(audio);
    else {
      toast({
        variant: 'error',
        description: '추출할 오디오 데이터가 없습니다.',
      });
    }
  };

  return { extract, loadFile, download, audioData, isLoading };
};
