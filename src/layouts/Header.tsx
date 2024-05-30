'use client';

import React, { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

import NavigationBar from '@/components/NavigationBar';
import { Heading } from '@/components/ui/Heading';

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  const pathname = usePathname();
  const [title, setTitle] = useState('Audio Editor');

  useEffect(() => {
    if (pathname === '/extract') setTitle('Audio Extractor');
    else setTitle('Audio Editor');
  }, [pathname]);

  return (
    <div className="mt-14 flex w-full flex-col items-center justify-center">
      <NavigationBar />

      <Heading className="mb-10 mt-16" level="1" align="center">
        {title}
      </Heading>
    </div>
  );
};

export default Header;
