'use client';

import * as React from 'react';

import {
  CheckCircledIcon,
  Cross1Icon,
  CrossCircledIcon,
  ExclamationTriangleIcon,
  InfoCircledIcon,
} from '@radix-ui/react-icons';
import * as ToastPrimitives from '@radix-ui/react-toast';

import { cn } from '@/lib/cn';

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      'fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 mobile:bottom-0 mobile:right-0 mobile:top-auto mobile:flex-col tablet:max-w-[420px]',
      className,
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

interface ToastInterface {
  variant?: 'info' | 'success' | 'warning' | 'error';
}

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & ToastInterface
>(({ className, variant, children, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(
        'data-[state=open]:sm:slide-in-from-bottom-full group pointer-events-auto relative flex w-full items-center justify-start  space-x-5 overflow-hidden rounded-md border p-4 pr-6 text-foreground shadow-lg backdrop-blur-3xl transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full',
        className,
      )}
      {...props}
    >
      <ToastIcon variant={variant} />
      {children}
    </ToastPrimitives.Root>
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;

const variantStyles = {
  info: {
    backgroundClass: 'bg-info',
    icon: <InfoCircledIcon className="text-info" />,
  },
  success: {
    backgroundClass: 'bg-success',
    icon: <CheckCircledIcon className="text-success" />,
  },
  warning: {
    backgroundClass: 'bg-warning',
    icon: <ExclamationTriangleIcon className="text-warning pt-2pxr" />,
  },
  error: {
    backgroundClass: 'bg-error',
    icon: <CrossCircledIcon className="text-error" />,
  },
};

const ToastIcon = React.forwardRef<HTMLDivElement, ToastInterface>(({ variant }, ref) => {
  if (!variant) return null;

  const { backgroundClass, icon } = variantStyles[variant];

  return (
    <div
      data-variant={variant}
      className="relative mt-3pxr flex size-5 items-center justify-center"
      ref={ref}
    >
      {icon}
      <span className={`${backgroundClass} absolute size-16 rounded-full opacity-40 blur-3xl`} />
    </div>
  );
});
ToastIcon.displayName = 'ToastIcon';

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50',
      className,
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      'absolute right-1 top-1 rounded-md p-1 text-foreground-muted opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100',
      className,
    )}
    toast-close=""
    {...props}
  >
    <Cross1Icon className="h-4 w-4" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn('text-sm font-semibold [&+div]:text-xs', className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description ref={ref} className={cn('text-sm opacity-90', className)} {...props} />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};
