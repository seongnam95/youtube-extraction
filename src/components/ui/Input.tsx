import * as React from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/cn';

const inputVariants = cva(
  `flex h-9 items-center px-2 gap-1 overflow-hidden transition-colors bg-transparent rounded-md`,
  {
    variants: {
      variant: {
        default: `border border-border-accent focus-within:border-primary`,
        filled: `border border-transparent bg-surface focus-within:border focus-within:border-primary`,
        underline: `px-1.5 py-1pxr border-b rounded-none focus-within:border-primary focus-within:border-b-[2px] focus-within:pb-0`,
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  icon?: React.ReactElement;
  iconPosition?: 'left' | 'right';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, id, variant, icon, iconPosition = 'right', type, ...props }, ref) => (
    <label htmlFor={id} className={cn(inputVariants({ variant }))}>
      {iconPosition === 'left' && icon && <span className="text-foreground-muted px-1 text-sm">{icon}</span>}
      <input
        id={id}
        type={type}
        className={cn(
          'placeholder:text-foreground-muted/50 flex-1 bg-transparent py-1 text-sm text-foreground file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
      {iconPosition === 'right' && icon && <span className="text-foreground-muted px-1 text-sm">{icon}</span>}
    </label>
  ),
);
Input.displayName = 'Input';

export { Input };
