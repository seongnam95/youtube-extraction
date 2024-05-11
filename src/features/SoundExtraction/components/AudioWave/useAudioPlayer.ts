interface AudioPlayerParams {
  audioContext: AudioContext;
  audioBuffer: AudioBuffer | null;
}

export const useAudioPlayer = ({ audioContext, audioBuffer }: AudioPlayerParams) => {
  const play = () => {
    if (audioBuffer) {
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start();
    }
  };

  return { play };
};
