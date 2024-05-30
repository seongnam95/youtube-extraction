import React, { InputHTMLAttributes } from 'react';

import LinkIcon from '@/assets/svg/link.svg';
import { cn } from '@/lib/cn';

const Input = React.forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <label className={cn('flex w-full items-center gap-3 rounded-md bg-surface px-3 py-3', className)}>
        <LinkIcon width="22" height="22" className="mt-2pxr fill-foreground-muted" />
        <input ref={ref} className="w-full bg-transparent outline-none" {...props} />
      </label>
    );
  },
);

export default Input;
