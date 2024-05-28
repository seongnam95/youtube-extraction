import React from 'react';

import { cn } from '@/lib/cn';

interface ContentProps {
  children?: React.ReactNode;
  className?: string;
}

const Content = ({ children, className }: ContentProps) => {
  return <div className={cn('m-auto w-full max-w-[700px] px-8', className)}>{children}</div>;
};

export default Content;
