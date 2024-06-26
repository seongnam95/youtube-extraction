'use client';

import { useRouter } from 'next/navigation';

import ExtractCard from '@/components/ExtractCard';
import SearchField from '@/components/SearchField';
import { useAudioExtract } from '@/hooks/useAudioExtract';

const ExtractPage = () => {
  const route = useRouter();
  const { audioData, isLoading, extract, download } = useAudioExtract();

  const handleDownload = () => download(audioData);
  const handleSubmit = (url: string) => extract(url);
  const handleEditClick = () => route.push('/editor');

  return (
    <div className="flex flex-col gap-5">
      <SearchField onSubmit={handleSubmit} loading={isLoading} />
      {audioData && (
        <ExtractCard audioData={audioData} onDownload={handleDownload} onEdit={handleEditClick} />
      )}
    </div>
  );
};

export default ExtractPage;
