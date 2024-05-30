'use client';

import React, { useEffect, useState } from 'react';

import WarningIcon from '@/assets/svg/warning.svg';
import { Button } from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Text } from '@/components/ui/Text';
import { useToast } from '@/components/ui/Toast/use-toast';

interface SearchFieldProps {
  className?: string;
  loading?: boolean;
  onSubmit?: (url: string) => void;
}

const SearchField = ({ className, loading, onSubmit }: SearchFieldProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [inputValue, setInputValue] = useState<string>('');

  const { toast } = useToast();

  useEffect(() => clearInput(), [inputRef.current]);
  const clearInput = () => {
    if (inputRef.current) inputRef.current.focus();
    setInputValue('');
  };

  const isValidYoutubeUrl = (value: string): boolean => {
    const pattern = /^https:\/\/www\.youtube\.com\/watch\?v=[\w-]+$/;
    return pattern.test(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    if (!isValidYoutubeUrl(inputValue)) {
      toast({
        description: (
          <div className="flex items-center gap-3">
            <WarningIcon width="14" height="14" className="mt-2pxr fill-foreground" />
            <Text className="flex-1" size="sm">
              유효하지 않은 Youtube 링크입니다.
            </Text>
          </div>
        ),
        duration: 2000,
      });
      clearInput();
      return;
    }

    onSubmit?.(inputValue);
  };

  return (
    <div className={className}>
      <form className="relative flex items-center" onSubmit={handleSubmit}>
        <Input
          disabled={loading}
          ref={inputRef}
          className="pr-14"
          type="text"
          placeholder="Youtube 동영상 링크 붙여넣기"
          value={inputValue}
          onChange={handleInputChange}
        />
        <Button
          disabled={!inputValue || loading}
          type="submit"
          className="absolute right-1.5 text-sm"
          variant="secondary"
        >
          추출
        </Button>
      </form>
    </div>
  );
};

export default SearchField;
