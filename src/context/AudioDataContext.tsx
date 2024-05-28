'use client';

import { ReactNode, createContext, useContext, useState } from 'react';

import { AudioExtractData } from '@/types/audio';

interface AudioContextType {
  audioData: AudioExtractData | null;
  setAudioData: (data: AudioExtractData | null) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioDataProvider = ({ children }: { children: ReactNode }) => {
  const [audioData, setAudioData] = useState<AudioExtractData | null>(null);

  return <AudioContext.Provider value={{ audioData, setAudioData }}>{children}</AudioContext.Provider>;
};

export const useAudioData = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
