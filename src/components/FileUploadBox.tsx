'use client';

import React, { DragEvent, useCallback, useState } from 'react';

import UploadIcon from '@/assets/svg/upload.svg';
import { cn } from '@/lib/cn';

interface AudioUploadBoxProps {
  className?: string;
  onUpload?: (audio: File) => void;
}

const AudioUploadBox = ({ className, onUpload }: AudioUploadBoxProps) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleDragIn = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragOut = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files) setIsDragging(true);
  }, []);

  const handleDrop = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);

    const uploadFiles = e.dataTransfer.files;
    if (uploadFiles.length > 1) return alert('하나의 파일만 업로드 가능합니다.');
    else if (uploadFiles.length === 1 && onUpload) onUpload(uploadFiles[0]);
  }, []);

  const handleUpload = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const uploadFile = target.files?.[0];
    if (uploadFile && onUpload) onUpload(uploadFile);
  };

  return (
    <label
      className={cn(
        'flex h-40 w-full max-w-[40rem] cursor-pointer select-none items-center justify-center rounded-md border border-dashed  transition-colors hover:border-border-accent hover:bg-surface',
        isDragging && 'border-border-accent bg-surface',
        className,
      )}
      onDragEnter={handleDragIn}
      onDragOver={handleDragOver}
      onDragLeaveCapture={handleDragOut}
      onDrop={handleDrop}
    >
      <input className="hidden" type="file" accept="audio/*" onChange={handleUpload} />
      <div className="flex flex-col items-center justify-center gap-1">
        <UploadIcon className="size-10 fill-foreground" />
        <p>파일 선택</p>
      </div>
    </label>
  );
};

export default AudioUploadBox;
