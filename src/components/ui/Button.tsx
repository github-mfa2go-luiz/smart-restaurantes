'use client';

import React, { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';

// Spinner component for loading state
const Spinner = ({ size }: { size: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <svg
      className={`animate-spin ${sizeClasses[size]}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Size of the button */
  size?: ButtonSize;
  /** Show loading spinner */
  loading?: boolean;
  /** Icon to display on the left */
  leftIcon?: ReactNode;
  /** Icon to display on the right */
  rightIcon?: ReactNode;
  /** Full width button */
  fullWidth?: boolean;
  /** Button content */
  children: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    // Base styles
    const baseStyles = [
      'inline-flex items-center justify-center gap-2',
      'font-medium rounded-lg',
      'transition-all duration-150 ease-in-out',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'dark:focus:ring-offset-gray-900',
      'select-none',
    ].join(' ');

    // Size styles
    const sizeStyles: Record<ButtonSize, string> = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
    };

    // Variant styles
    const variantStyles: Record<ButtonVariant, string> = {
      primary: [
        // Default state - amber gradient
        'bg-gradient-to-r from-amber-500 to-amber-600',
        'text-white',
        'shadow-sm shadow-amber-500/25',
        // Hover state
        'hover:from-amber-600 hover:to-amber-700',
        'hover:shadow-md hover:shadow-amber-500/30',
        // Active state
        'active:from-amber-700 active:to-amber-800',
        'active:shadow-sm',
        // Focus ring
        'focus:ring-amber-500/50',
        // Disabled state
        'disabled:from-amber-300 disabled:to-amber-400',
        'disabled:shadow-none disabled:cursor-not-allowed',
        'disabled:text-amber-100',
        // Dark mode
        'dark:from-amber-600 dark:to-amber-700',
        'dark:hover:from-amber-500 dark:hover:to-amber-600',
        'dark:disabled:from-amber-800 dark:disabled:to-amber-900',
        'dark:disabled:text-amber-400',
      ].join(' '),

      secondary: [
        // Default state
        'bg-gray-100 text-gray-700',
        'border border-gray-200',
        // Hover state
        'hover:bg-gray-200 hover:border-gray-300',
        // Active state
        'active:bg-gray-300',
        // Focus ring
        'focus:ring-gray-400/50',
        // Disabled state
        'disabled:bg-gray-50 disabled:text-gray-400',
        'disabled:border-gray-100 disabled:cursor-not-allowed',
        // Dark mode
        'dark:bg-gray-800 dark:text-gray-200',
        'dark:border-gray-700',
        'dark:hover:bg-gray-700 dark:hover:border-gray-600',
        'dark:active:bg-gray-600',
        'dark:disabled:bg-gray-900 dark:disabled:text-gray-600',
        'dark:disabled:border-gray-800',
      ].join(' '),

      ghost: [
        // Default state
        'bg-transparent text-gray-600',
        // Hover state
        'hover:bg-gray-100 hover:text-gray-900',
        // Active state
        'active:bg-gray-200',
        // Focus ring
        'focus:ring-gray-400/50',
        // Disabled state
        'disabled:text-gray-300 disabled:cursor-not-allowed',
        'disabled:hover:bg-transparent',
        // Dark mode
        'dark:text-gray-400',
        'dark:hover:bg-gray-800 dark:hover:text-gray-100',
        'dark:active:bg-gray-700',
        'dark:disabled:text-gray-600',
        'dark:disabled:hover:bg-transparent',
      ].join(' '),

      outline: [
        // Default state
        'bg-transparent text-amber-600',
        'border-2 border-amber-500',
        // Hover state
        'hover:bg-amber-50 hover:border-amber-600',
        // Active state
        'active:bg-amber-100',
        // Focus ring
        'focus:ring-amber-500/50',
        // Disabled state
        'disabled:text-amber-300 disabled:border-amber-200',
        'disabled:cursor-not-allowed disabled:hover:bg-transparent',
        // Dark mode
        'dark:text-amber-400 dark:border-amber-500',
        'dark:hover:bg-amber-950 dark:hover:border-amber-400',
        'dark:active:bg-amber-900',
        'dark:disabled:text-amber-700 dark:disabled:border-amber-800',
        'dark:disabled:hover:bg-transparent',
      ].join(' '),

      danger: [
        // Default state
        'bg-red-600 text-white',
        'shadow-sm shadow-red-500/25',
        // Hover state
        'hover:bg-red-700 hover:shadow-md hover:shadow-red-500/30',
        // Active state
        'active:bg-red-800 active:shadow-sm',
        // Focus ring
        'focus:ring-red-500/50',
        // Disabled state
        'disabled:bg-red-300 disabled:shadow-none',
        'disabled:cursor-not-allowed',
        // Dark mode
        'dark:bg-red-700',
        'dark:hover:bg-red-600',
        'dark:active:bg-red-800',
        'dark:disabled:bg-red-900 dark:disabled:text-red-400',
      ].join(' '),
    };

    // Width style
    const widthStyle = fullWidth ? 'w-full' : '';

    // Combine all styles
    const combinedStyles = [
      baseStyles,
      sizeStyles[size],
      variantStyles[variant],
      widthStyle,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={combinedStyles}
        {...props}
      >
        {loading && <Spinner size={size} />}
        {!loading && leftIcon && (
          <span className="inline-flex shrink-0">{leftIcon}</span>
        )}
        <span className={loading ? 'opacity-0' : ''}>{children}</span>
        {!loading && rightIcon && (
          <span className="inline-flex shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
