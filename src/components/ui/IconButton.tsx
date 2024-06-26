import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/cn';

const iconButtonVariants = cva(
  `inline-flex flex-shrink-0 items-center border justify-center font-medium transition-colors 
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
  disabled:pointer-events-none disabled:opacity-60`,
  {
    variants: {
      size: {
        default: 'h-8 w-8 text-sm',
        sm: 'h-7 w-7 text-sm',
        lg: 'h-9 w-9 text-lg',
        xl: 'h-11 w-11 text-xl',
      },
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary-accent',
        secondary: 'bg-surface text-foreground border-transparent hover:border-border',
        outline: 'border-border hover:border-border-accent hover:bg-surface-accent',
        dashed: 'border-border-accent border-dashed hover:border-secondary-accent',
        ghost: 'border-transparent hover:bg-surface-accent',
      },
      circle: {
        true: 'rounded-full',
        false: 'rounded-md ',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      circle: false,
    },
  },
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  asChild?: boolean;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, circle, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        type="button"
        className={cn(iconButtonVariants({ variant, size, circle, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
IconButton.displayName = 'IconButton';

export { IconButton, iconButtonVariants };
