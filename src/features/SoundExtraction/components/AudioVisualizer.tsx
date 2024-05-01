import { useEffect, useState } from 'react';

interface VisualizerOptions {
  url: string;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  container: React.RefObject<HTMLDivElement>;
  bgColor: string;
  waveColor: string;
}

export const useAudioVisualizer = ({
  url,
  canvasRef,
  bgColor,
  waveColor,
}: VisualizerOptions) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const drawWaveform = async () => {
      if (!canvasRef.current) return;
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;

      const audioContext = new AudioContext();

      // 오디오 데이터 로드
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      const data = audioBuffer.getChannelData(0);
      const step = Math.ceil(data.length / canvasRef.current.width);
      const amp = canvasRef.current.height / 2;

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      ctx.beginPath();
      ctx.strokeStyle = waveColor;
      ctx.lineWidth = 2;
      ctx.moveTo(0, amp); // 시작점을 중간 높이로 설정

      for (let i = 0; i < canvasRef.current.width; i++) {
        let max = 0;
        for (let j = 0; j < step; j++) {
          max = Math.max(max, Math.abs(data[i * step + j])); // 최대값 계산
        }
        ctx.lineTo(i, amp - max * amp); // 파동을 위로 그림
        ctx.lineTo(i, amp + max * amp); // 파동을 아래로 그림
      }

      ctx.stroke();
      setIsReady(true);

      // 오디오 컨텍스트 리소스 정리
      return () => {
        audioContext.close();
      };
    };

    drawWaveform();
  }, [url, canvasRef, bgColor, waveColor]);

  return isReady;
};
