import { AudioExtractData } from '@/types/audio';

export const downloadAudio = (audioData: AudioExtractData) => {
  const { title, blob } = audioData;
  const element = document.createElement('a');
  const file = new Blob([blob], { type: 'audio/mpeg' });

  element.href = URL.createObjectURL(file);
  element.download = `${title}.mp3`;

  document.body.appendChild(element);
  element.click();
  element.remove();
};
