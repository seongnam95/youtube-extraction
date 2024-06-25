import React, { InputHTMLAttributes } from 'react';

import { Link2Icon } from '@radix-ui/react-icons';

import { cn } from '@/lib/cn';

const Input = React.forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <label className={cn('flex w-full items-center gap-4 rounded-md bg-surface px-3 py-3', className)}>
        <Link2Icon className="mt-2pxr size-5 text-foreground-muted" />
        <input ref={ref} className="w-full bg-transparent outline-none" {...props} />
      </label>
    );
  },
);

export default Input;
