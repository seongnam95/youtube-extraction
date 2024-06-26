import * as React from 'react';

import { ReloadIcon } from '@radix-ui/react-icons';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/cn';

const buttonVariants = cva(
  `
  inline-flex bg-transparent text-foreground border 
  items-center justify-center whitespace-nowrap rounded-md font-medium 
  transition-colors focus-visible:outline-none focus-visible:ring-1 
  focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-60
`,
  {
    variants: {
      variant: {
        default: `border-transparent bg-primary text-primary-foreground hover:bg-primary-accent`,
        secondary: `bg-surface-accent text-foreground border-transparent`,
        outline: `border-border-accent hover:border-border-accent hover:bg-surface-accent`,
        dashed: `border-border-accent border-dashed hover:border-border-accent`,
        ghost: `border-transparent hover:bg-surface`,
        link: `text-primary border-transparent underline-offset-4 underline hover:bg-primary-surface`,
      },
      size: {
        default: `h-9 px-4 gap-1 text-sm`,
        sm: `h-7 px-4 gap-1 text-xs`,
        lg: `h-12 px-5 gap-2 text-lg`,
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant, size, loading, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(
          'transition-all duration-150 active:scale-95 active:opacity-80',
          buttonVariants({ variant, size }),
          className,
        )}
        ref={ref}
        {...props}
      >
        {loading ? <ReloadIcon className="mx-1 size-4 animate-spin" /> : children}
      </Comp>
    );
  },
);

Button.displayName = 'Button';

export { Button };
