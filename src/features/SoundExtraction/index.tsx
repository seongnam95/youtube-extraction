import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/Button';
import { Flex } from '@/components/ui/Flex';
import { Heading } from '@/components/ui/Heading';
import { Input } from '@/components/ui/Input';
import { Region, WaveSurferRoot, Waveform } from '@/features/SoundExtraction/components/WaveSurfer';

const SoundExtraction = () => {
  const [inputValue, setInputValue] = useState('');

  const handleAddLink = () => {
    if (!isValidYoutubeUrl(inputValue)) {
      alert('유효한 유튜브 URL이 아닙니다.');
      return;
    }

    setInputValue('');
  };

  function isValidYoutubeUrl(url: string): boolean {
    const pattern = /^https:\/\/www\.youtube\.com\/watch\?v=[\w-]+$/;
    return pattern.test(url);
  }

  return (
    <div className="py-8">
      <Heading level="2">음원 추출</Heading>

      <Flex gap="4" className="mb-12">
        <Input variant="underline" onChange={(e) => setInputValue(e.target.value)} />
        <Button onClick={handleAddLink}>추가</Button>
      </Flex>
      {/* <AudioEditor /> */}
      {/* <WaveSurfer url="/test.mp3" /> */}

      <WaveSurferRoot audioUrl="/test.mp3">
        <Waveform />
        <Region />
      </WaveSurferRoot>
    </div>
  );
};

export default SoundExtraction;
