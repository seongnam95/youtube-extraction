import { useEffect, useRef, useState } from 'react';

import { type Duration } from '../type';

type AudioState = 'playing' | 'paused' | 'stopped';
interface UseAudioPlayerParams {
  audioContext: AudioContext | null;
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
    if (audioState !== 'stopped') stop();

    setCurrentTime(startedAt);
    setPlayedDuration(startedAt - duration.begin);
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
    if (!audioContext || !audioBuffer || audioState === 'playing') return;
    console.log(audioContext.state);
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
    if (audioState !== 'playing' || !audioContext || !sourceRef.current) return;

    const elapsed = audioContext.currentTime - (startTimeRef.current ?? 0);
    setPlayedDuration(playedDuration + elapsed);

    clearSource();
    setAudioState('paused');
  };

  const stop = (): void => {
    clearSource();

    setAudioState('stopped');
    setStartedAt(duration.begin);
    setCurrentTime(duration.begin);
    setPlayedDuration(duration.begin - duration.begin);

    startTimeRef.current = null;
  };

  const playPause = () => (audioState === 'playing' ? pause() : play());

  const updateCurrentTime = () => {
    if (!audioContext) return;

    const tick = () => {
      const elapsed = audioContext.currentTime - startTimeRef.current!;
      const newTime = duration.begin + playedDuration + elapsed;

      setCurrentTime(newTime);
      animationFrameRef.current = requestAnimationFrame(tick);
    };

    tick();
  };

  return { play, pause, stop, playPause, currentTime, audioState, startedAt, setStartedAt };
};
