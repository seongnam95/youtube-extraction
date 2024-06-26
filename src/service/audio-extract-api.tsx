import base64ToBlob from '@/lib/b64toBlob';
import { AudioExtractData } from '@/types/audio';

/**
 * 유튜브 오디오 추출 API 호출
 * @param youtubeUrl 유튜브 링크
 * @returns Promise<AudioExtractData | null>
 */
export const audioExtraction = async (youtubeUrl: string): Promise<AudioExtractData> => {
  try {
    const response = await fetch(`/api/audio?link=${encodeURIComponent(youtubeUrl)}`);

    if (!response.ok) throw new Error('오디오 추출에 실패하였습니다. 잠시후 다시 시도해주세요.');

    const data = await response.json();
    const decodedAudio = base64ToBlob(data.base64Audio);

    return {
      title: data.title,
      blob: decodedAudio,
    };
  } catch (error) {
    throw new Error('호출 과정에서 오류가 발생했습니다. 잠시후 다시 시도해주세요.');
  }
};
