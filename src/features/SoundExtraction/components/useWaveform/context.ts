import { createContext } from 'react';

interface WaveformContextType {
  container: HTMLElement;
  canvas: HTMLCanvasElement;
}

const WaveformContext = createContext<WaveformContextType | null>(null);

export default WaveformContext;
