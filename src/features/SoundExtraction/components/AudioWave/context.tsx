import { ReactNode, createContext, useContext, useRef } from 'react';

const AudioContextState = createContext<AudioContext | null>(null);

export const AudioContextProvider = ({ children }: { children: ReactNode }) => {
  const audioContextRef = useRef<AudioContext>();
  if (!audioContextRef.current) audioContextRef.current = new window.AudioContext();
  return <AudioContextState.Provider value={audioContextRef.current}>{children}</AudioContextState.Provider>;
};

export const useAudioContext = () => {
  const context = useContext(AudioContextState);
  if (context === undefined) throw new Error('must be used within a AudioContextProvider');
  return context;
};
