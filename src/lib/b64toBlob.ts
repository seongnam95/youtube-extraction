export default function base64ToBlob(audioBase64: string): Blob {
  const binaryString = window.atob(audioBase64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  const blob = new Blob([bytes], { type: 'audio/mpeg' });

  return blob;
}
