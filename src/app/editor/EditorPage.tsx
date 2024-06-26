'use client';

import AudioUploadBox from '@/components/AudioUploadBox';
import AudioWave from '@/components/AudioWave';
import { useAudioExtract } from '@/hooks/useAudioExtract';

const EditorPage = () => {
  const { audioData, loadFile, download } = useAudioExtract();

  if (!audioData) return <AudioUploadBox onUpload={loadFile} />;
  return <AudioWave audioFile={audioData.blob} onHandleBlur={(duration) => console.log(duration)} />;
};

export default EditorPage;
