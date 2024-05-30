'use client';

import { useState } from 'react';

import ExtractCard from '@/components/ExtractCard';
import SearchField from '@/components/SearchField';
import { useToast } from '@/components/ui/Toast/use-toast';
import { useAudioData } from '@/context/AudioDataContext';
import base64ToBlob from '@/lib/b64toBlob';

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

  const handleSubmit = (url: string) => audioExtraction(url);

  const audioExtraction = async (youtubeUrl: string) => {
    try {
      setAudioData(null);
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
      <SearchField className="mt-4" onSubmit={handleSubmit} loading={isLoading} />
      <ExtractCard className="mt-5" onDownload={handleDownload} />
    </div>
  );
};

export default ExtractPage;
