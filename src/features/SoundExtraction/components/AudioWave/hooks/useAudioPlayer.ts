import { useEffect, useRef, useState } from 'react';

import { type Duration } from '../type';

type AudioState = 'playing' | 'paused' | 'stopped';
interface UseAudioPlayerParams {
  audioContext: AudioContext;
  audioBuffer: AudioBuffer | null;
  duration: Duration;
}

export const useAudioPlayer = ({ audioContext, audioBuffer, duration }: UseAudioPlayerParams) => {
  const animationFrameRef = useRef<number | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const [audioState, setAudioState] = useState<AudioState>('stopped');
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [playedDuration, setPlayedDuration] = useState<number>(0);
  const [startedAt, setStartedAt] = useState<number>(0);

  useEffect(() => {
    if (startedAt < duration.begin || startedAt > duration.end) {
      console.error(`playStartedAt value must be between ${duration.begin} and ${duration.end}`);
      return;
    }

    if (audioState !== 'stopped') stop();
    setCurrentTime(startedAt);
    setPlayedDuration(startedAt - duration.begin);
    console.log(startedAt, startedAt - duration.begin);
  }, [startedAt]);

  const clearSource = () => {
    if (sourceRef.current) {
      sourceRef.current.onended = null;
      sourceRef.current.stop();
      sourceRef.current.disconnect();
      sourceRef.current = null;
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  };

  const play = (): void => {
    if (!audioBuffer || audioState === 'playing') return;

    clearSource();

    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);

    const offset = playedDuration;
    const playDuration = duration.end - (duration.begin + offset);

    source.start(0, duration.begin + offset, playDuration);

    source.onended = () => {
      clearSource();
      setAudioState('stopped');
      setCurrentTime(startedAt);
      setPlayedDuration(startedAt - duration.begin);
      startTimeRef.current = null;
    };

    sourceRef.current = source;
    startTimeRef.current = audioContext.currentTime;

    setAudioState('playing');
    updateCurrentTime();
  };

  const pause = (): void => {
    if (audioState !== 'playing' || !sourceRef.current) return;

    const elapsed = audioContext.currentTime - (startTimeRef.current ?? 0);
    setPlayedDuration(playedDuration + elapsed);

    clearSource();
    setAudioState('paused');
  };

  const stop = (): void => {
    clearSource();
    console.log('stop()');
    setAudioState('stopped');
    setStartedAt(duration.begin);
    setCurrentTime(duration.begin);
    setPlayedDuration(duration.begin - duration.begin);

    startTimeRef.current = null;
  };

  const updateCurrentTime = () => {
    const tick = () => {
      const elapsed = audioContext.currentTime - startTimeRef.current!;
      const newTime = duration.begin + playedDuration + elapsed;

      setCurrentTime(newTime);
      animationFrameRef.current = requestAnimationFrame(tick);
    };

    tick();
  };

  return { play, pause, stop, currentTime, audioState, startedAt, setStartedAt };
};
