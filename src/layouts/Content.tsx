import React from 'react';

import { cn } from '@/lib/cn';

interface ContentProps {
  children?: React.ReactNode;
  className?: string;
}

const Content = ({ children, className }: ContentProps) => {
  return <div className={cn('m-auto max-w-[700px] p-6', className)}>{children}</div>;
};

export default Content;
