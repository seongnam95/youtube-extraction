import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/cn";

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
        secondary: `bg-secondary text-secondary-foreground border-transparent hover:bg-secondary-accent`,
        outline: `border-border-accent hover:border-secondary-accent`,
        dashed: `border-border-accent border-dashed hover:border-secondary-accent`,
        ghost: `border-transparent hover:bg-surface`,
        link: `text-primary border-transparent underline-offset-4 underline hover:bg-primary-surface`,
      },
      size: {
        default: `h-9 px-4 gap-1 text-sm`,
        sm: `h-7 px-4 gap-1 text-xs`,
        lg: `h-10 px-5 gap-2 text-lg`,
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
