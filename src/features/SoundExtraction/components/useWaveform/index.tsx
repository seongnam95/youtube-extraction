import { useEffect, useMemo, useRef } from 'react';

import { WaveformOptions } from '@/features/SoundExtraction/components/useWaveform/wave';

import Waveform from './wave';

type WaveformOmitContainer = Omit<WaveformOptions, 'container'>;
interface useWaveformOptions extends WaveformOmitContainer {}

export function useAudioWave(options?: useWaveformOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioWave = useRef<Waveform>();

  const combinedOptions = useMemo(() => Object.entries({ ...options }).flat(), [options]);

  useEffect(() => {
    if (!containerRef?.current) return;

    const instance = Waveform.create({
      ...options,
      container: containerRef.current,
    });

    audioWave.current = instance;

    return () => instance.destroy();
  }, [containerRef, ...combinedOptions]);

  const WaveformComponent = () => (
    <div className="bg-surface">
      <div id="scroll-wrap">
        <div ref={containerRef} className="relative">
          <div id="progress-line" className="absolute" />
        </div>
      </div>
    </div>
  );

  return {
    containerRef,
    audioWave,
    WaveformComponent,
  };
}

export default useAudioWave;
