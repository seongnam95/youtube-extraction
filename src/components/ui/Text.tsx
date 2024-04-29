import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/cn';
import { ComponentPropsWithout, RemovedProps } from '@/types/component_props';

const textVariants = cva('text-foreground', {
  variants: {
    size: {
      default: 'text-base',
      xs: 'text-xs',
      sm: 'text-sm',
      lg: 'text-lg',
      xl: 'text-xl',
    },
    weight: {
      normal: 'font-normal',
      bold: 'font-bold text-foreground-accent',
      extra: 'font-extrabold text-foreground-accent',
      black: 'font-black text-foreground-accent',
    },
    muted: {
      false: '',
      true: 'text-foreground-muted',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
    whiteSpace: {
      normal: 'whitespace-normal',
      nowrap: 'whitespace-nowrap',
      pre: 'whitespace-pre',
      preLine: 'whitespace-pre-line',
      preWrap: 'whitespace-pre-wrap',
      break: 'whitespace-break-spaces',
    },
  },
  defaultVariants: {
    size: 'default',
    weight: 'normal',
    muted: false,
    align: 'left',
    whiteSpace: 'normal',
  },
});

type TextElement = React.ElementRef<'span'>;
type TextAsChildProps = { asChild: true; as?: never } & ComponentPropsWithout<'span', RemovedProps>;
type TextSpanProps = { as?: 'span'; asChild?: false } & ComponentPropsWithout<'span', RemovedProps>;
type TextDivProps = { as: 'div'; asChild?: false } & ComponentPropsWithout<'div', RemovedProps>;
type TextLabelProps = { as: 'label'; asChild?: false } & ComponentPropsWithout<'label', RemovedProps>;
type TextStrongProps = { as: 'strong'; asChild?: false } & ComponentPropsWithout<'strong', RemovedProps>;
type TextPProps = { as: 'p'; asChild?: false } & ComponentPropsWithout<'p', RemovedProps>;

type TextProps = VariantProps<typeof textVariants> &
  (TextAsChildProps | TextSpanProps | TextDivProps | TextLabelProps | TextStrongProps | TextPProps);

const Text = React.forwardRef<TextElement, TextProps>(
  (
    { className, children, size, weight, muted, align, whiteSpace, asChild, as: Tag = 'span', ...textProps },
    ref,
  ) => (
    <Slot
      {...textProps}
      ref={ref}
      className={cn(textVariants({ size, weight, muted, align, whiteSpace, className }))}
    >
      {asChild ? children : <Tag>{children}</Tag>}
    </Slot>
  ),
);

Text.displayName = 'Text';

export { Text, textVariants };
export type { TextProps };
