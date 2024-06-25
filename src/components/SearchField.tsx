'use client';

import React, { useState } from 'react';

import '@radix-ui/react-icons';

import { Button } from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast/use-toast';
import { cn } from '@/lib/cn';

interface SearchFieldProps {
  className?: string;
  loading?: boolean;
  onSubmit?: (url: string) => void;
}

const SearchField = ({ className, loading, onSubmit }: SearchFieldProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const { toast } = useToast();

  const clearInput = () => {
    setInputValue('');
    if (inputRef.current) inputRef.current.focus();
  };

  const isValidYoutubeUrl = (value: string): boolean => {
    const pattern =
      /^(https:\/\/www\.youtube\.com\/watch\?v=[\w-]+(&[\w-]+=[\w-]+)*|https:\/\/youtu\.be\/[\w-]+(\?[\w-]+=[\w-]+)*)$/;
    return pattern.test(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleClick = (e: React.FormEvent): void => {
    e.preventDefault();

    if (isValidYoutubeUrl(inputValue)) onSubmit?.(inputValue);
    else {
      toast({
        variant: 'error',
        description: '유효하지 않은 Youtube 링크입니다.',
      });
      clearInput();
    }
  };

  return (
    <div className={cn('relative flex items-center', className)}>
      <Input
        disabled={loading}
        ref={inputRef}
        className="pr-20"
        type="text"
        placeholder="Youtube 동영상 링크 붙여넣기"
        value={inputValue}
        onChange={handleInputChange}
      />
      <Button
        disabled={!inputValue || loading}
        className="absolute right-1.5 text-sm"
        variant="secondary"
        loading={loading}
        onClick={handleClick}
      >
        추출
      </Button>
    </div>
  );
};

export default SearchField;
