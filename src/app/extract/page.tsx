'use client';

import { useState } from 'react';

import ExtractCard from '@/components/ExtractCard';
import SearchField from '@/components/SearchField';
import { Heading } from '@/components/ui/Heading';
import { useToast } from '@/components/ui/Toast/use-toast';
import { useAudioData } from '@/context/AudioDataContext';
import base64ToBlob from '@/lib/b64toBlob';

const ExtractPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setAudioData } = useAudioData();

  const { toast } = useToast();

  const handleSubmit = (url: string) => downloadAudio(url);

  const downloadAudio = async (youtubeUrl: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/audio?link=${encodeURIComponent(youtubeUrl)}`);

      if (response.ok) {
        const data = await response.json();
        const decodedAudio = base64ToBlob(data.base64Audio);

        setAudioData({
          title: data.title,
          blob: decodedAudio,
        });
      } else {
        const errorData = await response.json();
        console.error('오디오 추출 실패:', errorData);

        toast({
          description: '서버에 오류가 발생했습니다.',
          duration: 2000,
        });
      }
    } catch (error) {
      console.error('오류 발생:', error);
      toast({
        description: '오디오 추출에 실패했습니다.',
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center">
      <Heading className="mb-8" level="1" align="center">
        Audio Extract
      </Heading>

      <SearchField onSubmit={handleSubmit} loading={isLoading} />
      <ExtractCard className="mt-5" />
    </div>
  );
};

export default ExtractPage;
