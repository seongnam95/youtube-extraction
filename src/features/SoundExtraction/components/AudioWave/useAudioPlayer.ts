import { useEffect, useRef, useState } from 'react';

import { Duration } from '@/features/SoundExtraction/components/AudioWave/useAudioWave';

interface AudioPlayerParams {
  audioContext: AudioContext;
  audioBuffer: AudioBuffer | null;
  duration?: Duration;
}

export const useAudioPlayer = ({ audioContext, audioBuffer, duration }: AudioPlayerParams) => {
  const requestRef = useRef<number | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const play = () => {
    if (isPlaying || !audioBuffer) return;
    setIsPlaying(true);

    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);

    const startTime = duration?.begin || 0;
    const endTime = duration?.end || audioBuffer.duration || 0;
    const playDuration = endTime - startTime;

    source.start(audioContext.currentTime, startTime, playDuration);

    source.onended = () => {
      setIsPlaying(false);
      setCurrentTime(startTime);
      cancelAnimationFrame(requestRef.current!);
    };
  };

  useEffect(() => {
    if (!isPlaying) return;

    let frameId: number;

    const updateCurrentTime = () => {
      cancelAnimationFrame(frameId);
      console.log(audioContext.currentTime);
      const startTime = duration?.begin || 0;
      const newTime = audioContext.currentTime - startTime;
      setCurrentTime(newTime);
    };

    frameId = requestAnimationFrame(updateCurrentTime);

    return () => cancelAnimationFrame(frameId);
  }, [isPlaying]);

  const pause = () => {
    if (!isPlaying) return;
    audioContext.suspend().then(() => {
      setIsPlaying(false);
      cancelAnimationFrame(requestRef.current!);
    });
  };

  const toggle = () => {
    if (isPlaying) {
      pause();
    } else {
      audioContext.resume().then(play);
    }
  };

  return { play, pause, toggle, currentTime, isPlaying };
};
