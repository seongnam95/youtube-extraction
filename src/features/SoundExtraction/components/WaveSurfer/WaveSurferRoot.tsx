import { createContext, useEffect, useRef, useState } from 'react';

export type RegionData = {
  start: number;
  end: number;
  width: number;
};

interface WaveSurferContextValue {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  regionRef: React.RefObject<HTMLDivElement>;
  audioContext: AudioContext | null;
  audioBuffer: AudioBuffer | null;
}

export const WaveSurferContext = createContext<WaveSurferContextValue>({
  canvasRef: { current: null },
  regionRef: { current: null },
  audioContext: null,
  audioBuffer: null,
});

interface WaveSurferRootProps {
  audioUrl: string;
  children?: React.ReactNode;
}

export const WaveSurferRoot = ({ audioUrl, children }: WaveSurferRootProps) => {
  const audioContext = new AudioContext();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const regionRef = useRef<HTMLDivElement>(null);

  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [region, setRegion] = useState<RegionData | null>(null);

  useEffect(() => {
    // TODO : 오디오 파일이 올바르지 않을 경우 처리해야함

    fetch(audioUrl).then((response) => {
      response.arrayBuffer().then((arrayBuffer) => {
        audioContext.decodeAudioData(arrayBuffer).then((decodedBuffer) => {
          setAudioBuffer(decodedBuffer);
        });
      });
    });

    return () => {
      audioContext.close();
    };
  }, [audioUrl]);

  return (
    <WaveSurferContext.Provider value={{ canvasRef, regionRef, audioContext, audioBuffer }}>
      <div className="relative mx-3">{children}</div>
    </WaveSurferContext.Provider>
  );
};
