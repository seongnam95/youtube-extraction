import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/cn';
import { ComponentPropsWithout, RemovedProps } from '@/types/component_props';

const headingVariants = cva('scroll-mt-6 text-foreground-accent', {
  variants: {
    level: {
      '1': 'text-2xl',
      '2': 'text-xl',
      '3': 'text-lg',
      '4': 'text-base',
      '5': 'text-sm',
      '6': 'text-xs',
    },
    weight: {
      normal: 'font-normal',
      semi: 'font-semibold',
      bold: 'font-bold',
      extra: 'font-extrabold',
      black: 'font-black',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: { level: '5', align: 'left', weight: 'semi' },
});

type HeadingElement = React.ElementRef<'h1'>;
type HeadingElementProps = ComponentPropsWithout<'h1', RemovedProps>;
type HeadingAsChildProps = { asChild: true; as?: never } & HeadingElementProps;
type HeadingAsProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  asChild?: false;
} & HeadingElementProps;

type HeadingProps = VariantProps<typeof headingVariants> & (HeadingAsChildProps | HeadingAsProps);

const Heading = React.forwardRef<HeadingElement, HeadingProps>(
  ({ className, children, level, weight, align, asChild, as: Tag = 'h1', ...headingProps }, ref) => (
    <Slot {...headingProps} ref={ref} className={cn(headingVariants({ level, weight, align, className }))}>
      {asChild ? children : <Tag>{children}</Tag>}
    </Slot>
  ),
);

Heading.displayName = 'Heading';

export { Heading, headingVariants };
export type { HeadingProps };
