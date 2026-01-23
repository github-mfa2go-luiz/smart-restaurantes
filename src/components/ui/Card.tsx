'use client';

import React, { forwardRef, HTMLAttributes, ReactNode } from 'react';

export type CardVariant = 'default' | 'elevated' | 'outlined';
export type CardPadding = 'sm' | 'md' | 'lg';

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Visual style variant */
  variant?: CardVariant;
  /** Padding size */
  padding?: CardPadding;
  /** Optional header title */
  cardTitle?: ReactNode;
  /** Optional header actions (buttons, icons, etc.) */
  headerActions?: ReactNode;
  /** Optional footer content */
  footer?: ReactNode;
  /** Disable hover effect */
  disableHover?: boolean;
  /** Card content */
  children: ReactNode;
}

export interface CardHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Header title */
  title?: ReactNode;
  /** Header subtitle */
  subtitle?: ReactNode;
  /** Header actions (buttons, icons, etc.) */
  actions?: ReactNode;
  children?: ReactNode;
}

export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  /** Padding size */
  padding?: CardPadding;
  children: ReactNode;
}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  /** Align footer content */
  align?: 'left' | 'center' | 'right' | 'between';
  children: ReactNode;
}

// Padding styles mapping
const paddingStyles: Record<CardPadding, string> = {
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

// Header padding styles mapping
const headerPaddingStyles: Record<CardPadding, string> = {
  sm: 'px-3 py-2',
  md: 'px-4 py-3',
  lg: 'px-6 py-4',
};

// Footer padding styles mapping
const footerPaddingStyles: Record<CardPadding, string> = {
  sm: 'px-3 py-2',
  md: 'px-4 py-3',
  lg: 'px-6 py-4',
};

// Variant styles mapping
const variantStyles: Record<CardVariant, string> = {
  default: [
    // Light mode
    'bg-white border border-zinc-200',
    'shadow-sm',
    // Dark mode
    'dark:bg-zinc-900 dark:border-zinc-800',
  ].join(' '),

  elevated: [
    // Light mode
    'bg-white border border-zinc-100',
    'shadow-md shadow-zinc-200/50',
    // Dark mode
    'dark:bg-zinc-900 dark:border-zinc-800',
    'dark:shadow-lg dark:shadow-black/20',
  ].join(' '),

  outlined: [
    // Light mode
    'bg-white/50 border-2 border-zinc-200',
    // Dark mode
    'dark:bg-zinc-900/50 dark:border-zinc-700',
  ].join(' '),
};

// Hover styles
const hoverStyles = [
  'hover:shadow-lg hover:shadow-zinc-200/40',
  'hover:-translate-y-0.5',
  'dark:hover:shadow-lg dark:hover:shadow-black/30',
].join(' ');

/**
 * CardHeader component for optional header section
 */
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ title, subtitle, actions, children, className = '', ...props }, ref) => {
    const baseStyles = [
      'flex items-center justify-between gap-4',
      'border-b border-zinc-200',
      'dark:border-zinc-800',
    ].join(' ');

    return (
      <div ref={ref} className={`${baseStyles} ${className}`} {...props}>
        {children || (
          <>
            <div className="flex-1 min-w-0">
              {title && (
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5 truncate">
                  {subtitle}
                </p>
              )}
            </div>
            {actions && (
              <div className="flex items-center gap-2 shrink-0">{actions}</div>
            )}
          </>
        )}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

/**
 * CardBody component for main content section
 */
export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ padding = 'md', children, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`${paddingStyles[padding]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardBody.displayName = 'CardBody';

/**
 * CardFooter component for optional footer section
 */
export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ align = 'right', children, className = '', ...props }, ref) => {
    const alignStyles: Record<string, string> = {
      left: 'justify-start',
      center: 'justify-center',
      right: 'justify-end',
      between: 'justify-between',
    };

    const baseStyles = [
      'flex items-center gap-3',
      'border-t border-zinc-200',
      'dark:border-zinc-800',
      alignStyles[align],
    ].join(' ');

    return (
      <div ref={ref} className={`${baseStyles} ${className}`} {...props}>
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';

/**
 * Main Card component
 */
const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      padding = 'md',
      cardTitle,
      headerActions,
      footer,
      disableHover = false,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles = [
      'rounded-xl',
      'overflow-hidden',
      'transition-all duration-200 ease-in-out',
    ].join(' ');

    // Combine all styles
    const combinedStyles = [
      baseStyles,
      variantStyles[variant],
      !disableHover && hoverStyles,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const hasHeader = cardTitle || headerActions;

    return (
      <div ref={ref} className={combinedStyles} {...props}>
        {hasHeader && (
          <CardHeader
            title={cardTitle}
            actions={headerActions}
            className={headerPaddingStyles[padding]}
          />
        )}

        <div className={paddingStyles[padding]}>{children}</div>

        {footer && (
          <CardFooter className={footerPaddingStyles[padding]}>
            {footer}
          </CardFooter>
        )}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
