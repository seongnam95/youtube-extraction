export const convertToTime = (duration: number) => {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  const milliseconds = Math.floor((duration * 1000) % 1000);
  const roundedMilliseconds = Math.round(milliseconds / 100);

  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${roundedMilliseconds.toString().replace(/\.0+$/, '')}`;
};
