'use client';

import AudioUploadBox from '@/components/AudioUploadBox';
import AudioWave from '@/components/AudioWave';
import { Heading } from '@/components/ui/Heading';
import { useAudioData } from '@/context/AudioDataContext';

const AudioEditorPage = () => {
  const { audioData, setAudioData } = useAudioData();

  const handleUpload = (audio: File) => {
    setAudioData({ title: audio.name, blob: audio });
  };

  return (
    <div className="flex flex-col justify-center">
      <Heading className="mb-10" level="1" align="center">
        Audio Editor
      </Heading>

      <div className="mt-8">
        {audioData ? <AudioWave audioFile={audioData.blob} /> : <AudioUploadBox onUpload={handleUpload} />}
      </div>
    </div>
  );
};

export default AudioEditorPage;
