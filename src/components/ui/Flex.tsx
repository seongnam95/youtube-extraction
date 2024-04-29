import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/cn';

const flexVariants = cva('flex', {
  variants: {
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      baseline: 'items-baseline',
      stretch: 'items-stretch',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
    },
    direction: {
      row: 'flex-row',
      column: 'flex-col',
      rowReverse: 'flex-row-reverse',
      columnReverse: 'flex-col-reverse',
    },
    wrap: {
      nowrap: 'flex-nowrap',
      wrap: 'flex-wrap',
      wrapReverse: 'flex-wrap-reverse',
    },
    gap: {
      '0': 'gap-0',
      '1': 'gap-1',
      '2': 'gap-2',
      '3': 'gap-3',
      '4': 'gap-4',
      '5': 'gap-5',
      '6': 'gap-6',
      '7': 'gap-7',
      '8': 'gap-8',
      '9': 'gap-9',
      '10': 'gap-10',
    },
  },
  defaultVariants: {
    align: 'start',
    justify: 'start',
    direction: 'row',
    wrap: 'nowrap',
    gap: '0',
  },
});

type FlexProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof flexVariants> & {
    asChild?: boolean;
  };

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ className, children, gap, align, justify, direction, wrap, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        className={cn(flexVariants({ gap, align, justify, direction, wrap }), className)}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);

Flex.displayName = 'Flex';

export { Flex, flexVariants };
