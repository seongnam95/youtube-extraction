'use client';

import { useState } from 'react';

import ExtractCard from '@/components/ExtractCard';
import SearchField from '@/components/SearchField';
import { Heading } from '@/components/ui/Heading';
import { useToast } from '@/components/ui/Toast/use-toast';
import { useAudioData } from '@/context/AudioDataContext';
import base64ToBlob from '@/lib/b64toBlob';
import { audioExtraction } from '@/service/audio-extraction';

const ExtractPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { audioData, setAudioData } = useAudioData();

  const { toast } = useToast();

  const handleDownload = () => {
    if (!audioData) return;

    const { title, blob } = audioData;
    const element = document.createElement('a');
    const file = new Blob([blob], { type: 'audio/mpeg' });

    element.href = URL.createObjectURL(file);
    element.download = `${title}.mp3`;

    document.body.appendChild(element);
    element.click();
    element.remove();
  };

  const handleSubmit = (url: string) => {
    setAudioData(null);
    setIsLoading(true);

    audioExtraction(url)
      .then(setAudioData)
      .catch((error) => {
        const errMsg = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
        toast({
          variant: 'error',
          description: errMsg,
        });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="flex flex-col justify-center">
      <Heading className="mb-10" level="1" align="center">
        Audio Extractor
      </Heading>
      <SearchField className="mt-4" onSubmit={handleSubmit} loading={isLoading} />
      <ExtractCard className="mt-5" onDownload={handleDownload} />
    </div>
  );
};

export default ExtractPage;
