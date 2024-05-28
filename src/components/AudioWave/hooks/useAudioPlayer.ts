import { useCallback, useEffect, useRef, useState } from 'react';

import { Duration } from '../type';

type AudioState = 'playing' | 'paused' | 'stopped';

export const useAudioPlayer = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const animationFrameRef = useRef<number | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [audioState, setAudioState] = useState<AudioState>('stopped');
  const [duration, setDuration] = useState<Duration>({ full: 0, begin: 0, end: 0 });
  const [playedDuration, setPlayedDuration] = useState<number>(0);
  const [startedAt, setStartedAt] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioState !== 'stopped') stop();

    setCurrentTime(startedAt);
    setPlayedDuration(startedAt - duration.begin);
  }, [startedAt]);

  const load = useCallback(
    async (audioFile: File | Blob) => {
      if (!audioContextRef.current) audioContextRef.current = new AudioContext();

      const arrayBuffer = await audioFile.arrayBuffer();
      const decodedBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);

      setAudioBuffer(decodedBuffer);
      setDuration({ full: decodedBuffer.duration, begin: 0, end: decodedBuffer.duration });
    },
    [audioContextRef.current],
  );

  const clearSource = useCallback(() => {
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
  }, []);

  const stop = useCallback(() => {
    clearSource();

    setAudioState('stopped');
    setStartedAt(duration.begin);
    setCurrentTime(duration.begin);
    setPlayedDuration(0);
    startTimeRef.current = null;
  }, [clearSource, duration.begin]);

  const play = useCallback(() => {
    if (!audioContextRef.current || !audioBuffer || audioState === 'playing') return;

    clearSource();

    const source = audioContextRef.current.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContextRef.current.destination);

    const offset = playedDuration;
    const playDuration = duration.end - (duration.begin + offset);

    source.start(0, duration.begin + offset, playDuration);

    source.onended = () => {
      stop();
    };

    sourceRef.current = source;
    startTimeRef.current = audioContextRef.current.currentTime;

    setAudioState('playing');
    updateCurrentTime();
  }, [audioContextRef.current, audioBuffer, audioState, clearSource, duration, playedDuration, stop]);

  const pause = useCallback(() => {
    if (audioState !== 'playing' || !audioContextRef.current || !sourceRef.current) return;

    const elapsed = audioContextRef.current.currentTime - (startTimeRef.current ?? 0);
    setPlayedDuration(playedDuration + elapsed);

    clearSource();
    setAudioState('paused');
  }, [audioContextRef.current, audioState, clearSource, playedDuration]);

  const playPause = useCallback(
    () => (audioState === 'playing' ? pause() : play()),
    [audioState, pause, play],
  );

  const updateCurrentTime = useCallback(() => {
    const tick = () => {
      if (!audioContextRef.current) return;

      const elapsed = audioContextRef.current.currentTime - (startTimeRef.current ?? 0);
      const newTime = duration.begin + playedDuration + elapsed;

      setCurrentTime(newTime);
      animationFrameRef.current = requestAnimationFrame(tick);
    };

    tick();
  }, [audioContextRef.current, duration.begin, playedDuration]);

  return {
    load,
    play,
    pause,
    stop,
    playPause,
    setDuration,
    setStartedAt,
    audioContext: audioContextRef.current,
    audioBuffer,
    duration,
    currentTime,
    audioState,
    startedAt,
  };
};
