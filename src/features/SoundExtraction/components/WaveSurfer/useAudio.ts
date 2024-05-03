import { useState } from 'react';

interface AudioOptions {
  audioContext: AudioContext;
}

export const useAudio = (Options: AudioOptions) => {
  const [playing, setPlaying] = useState<boolean>(false);

  const setAudio = () => {};
};
