'use client';

import AudioUploadBox from '@/components/AudioUploadBox';
import AudioWave from '@/components/AudioWave';
import { useAudioData } from '@/context/AudioDataContext';

interface AudioEditorPageProps {}

const AudioEditorPage = ({}: AudioEditorPageProps) => {
  const { audioData, setAudioData } = useAudioData();

  const handleUpload = (audio: File) => {
    setAudioData({ title: audio.name, blob: audio });
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="mt-8">
        {audioData ? <AudioWave audioFile={audioData.blob} /> : <AudioUploadBox onUpload={handleUpload} />}
      </div>
    </div>
  );
};

export default AudioEditorPage;
