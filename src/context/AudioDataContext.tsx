'use client';

import { ReactNode, createContext, useContext, useState } from 'react';

import { AudioExtractData } from '@/types/audio';

interface AudioDataContextType {
  audioData: AudioExtractData | null;
  setAudioData: (data: AudioExtractData | null) => void;
}

const AudioDataContext = createContext<AudioDataContextType | undefined>(undefined);

export const AudioDataProvider = ({ children }: { children: ReactNode }) => {
  const [audioData, setAudioData] = useState<AudioExtractData | null>(null);

  return (
    <AudioDataContext.Provider value={{ audioData, setAudioData }}>{children}</AudioDataContext.Provider>
  );
};

export const useAudioData = () => {
  const context = useContext(AudioDataContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
