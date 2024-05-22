'use client';

import React, { useState } from 'react';

interface InputProps {}

const Input = ({}: InputProps) => {
  const [inputValue, setInputValue] = useState<string>('가나다라마바사');
  const [isYoutube, setIsYoutube] = useState<boolean>(false);

  function isValidYoutubeUrl(value: string): boolean {
    const pattern = /^https:\/\/www\.youtube\.com\/watch\?v=[\w-]+$/;
    return pattern.test(value);
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    const isUrl = value.startsWith('http');
  };

  return (
    <label className="flex rounded-md bg-surface px-4 py-3">
      <input className="bg-transparent outline-none" type="text" value={inputValue} onChange={handleInput} />
    </label>
  );
};

export default Input;
