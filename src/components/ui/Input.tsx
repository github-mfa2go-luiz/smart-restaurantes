'use client';

import React, { forwardRef, useState, useId } from 'react';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showClearButton?: boolean;
  onClear?: () => void;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      showClearButton = false,
      onClear,
      size = 'md',
      fullWidth = false,
      disabled = false,
      className = '',
      id,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState('');

    const currentValue = value !== undefined ? value : internalValue;
    const hasValue = currentValue !== '' && currentValue !== undefined;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (value === undefined) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    const handleClear = () => {
      if (value === undefined) {
        setInternalValue('');
      }
      onClear?.();
    };

    const sizeClasses = {
      sm: 'h-9 text-sm',
      md: 'h-11 text-base',
      lg: 'h-13 text-lg',
    };

    const paddingClasses = {
      sm: {
        base: 'px-3',
        withLeftIcon: 'pl-9',
        withRightIcon: 'pr-9',
        withClear: 'pr-9',
        withBoth: 'pr-16',
      },
      md: {
        base: 'px-4',
        withLeftIcon: 'pl-11',
        withRightIcon: 'pr-11',
        withClear: 'pr-11',
        withBoth: 'pr-20',
      },
      lg: {
        base: 'px-5',
        withLeftIcon: 'pl-13',
        withRightIcon: 'pr-13',
        withClear: 'pr-13',
        withBoth: 'pr-24',
      },
    };

    const iconSizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    };

    const iconPositionClasses = {
      sm: {
        left: 'left-3',
        right: 'right-3',
        clearWithIcon: 'right-8',
      },
      md: {
        left: 'left-4',
        right: 'right-4',
        clearWithIcon: 'right-11',
      },
      lg: {
        left: 'left-5',
        right: 'right-5',
        clearWithIcon: 'right-14',
      },
    };

    let paddingClass = paddingClasses[size].base;
    if (leftIcon) {
      paddingClass = paddingClasses[size].withLeftIcon;
    }
    if (rightIcon && showClearButton && hasValue) {
      paddingClass = leftIcon
        ? `${paddingClasses[size].withLeftIcon} ${paddingClasses[size].withBoth}`
        : paddingClasses[size].withBoth;
    } else if (rightIcon || (showClearButton && hasValue)) {
      paddingClass = leftIcon
        ? `${paddingClasses[size].withLeftIcon} ${paddingClasses[size].withRightIcon}`
        : paddingClasses[size].withRightIcon;
    }

    const baseInputClasses = `
      w-full
      ${sizeClasses[size]}
      ${paddingClass}
      rounded-lg
      border
      transition-all
      duration-200
      ease-in-out
      outline-none
      placeholder:text-zinc-400
      dark:placeholder:text-zinc-500
    `;

    const stateClasses = error
      ? `
        bg-red-50 dark:bg-red-950/20
        border-red-400 dark:border-red-500
        text-zinc-900 dark:text-zinc-100
        focus:ring-2 focus:ring-red-500/50
        focus:border-red-500
      `
      : disabled
      ? `
        bg-zinc-100 dark:bg-zinc-800
        border-zinc-200 dark:border-zinc-700
        text-zinc-400 dark:text-zinc-500
        cursor-not-allowed
      `
      : `
        bg-zinc-50 dark:bg-zinc-900
        border-zinc-300 dark:border-zinc-700
        text-zinc-900 dark:text-zinc-100
        hover:border-zinc-400 dark:hover:border-zinc-600
        focus:ring-2 focus:ring-amber-500/50
        focus:border-amber-500 dark:focus:border-amber-500
      `;

    const labelClasses = `
      block
      mb-2
      text-sm
      font-medium
      transition-colors
      duration-200
      ${error
        ? 'text-red-600 dark:text-red-400'
        : disabled
        ? 'text-zinc-400 dark:text-zinc-500'
        : 'text-zinc-700 dark:text-zinc-300'
      }
    `;

    const iconBaseClasses = `
      absolute
      top-1/2
      -translate-y-1/2
      ${iconSizeClasses[size]}
      transition-colors
      duration-200
      pointer-events-none
    `;

    const iconColorClasses = error
      ? 'text-red-400 dark:text-red-500'
      : disabled
      ? 'text-zinc-300 dark:text-zinc-600'
      : isFocused
      ? 'text-amber-500 dark:text-amber-400'
      : 'text-zinc-400 dark:text-zinc-500';

    return (
      <div className={`${fullWidth ? 'w-full' : 'w-fit'} ${className}`}>
        {label && (
          <label htmlFor={inputId} className={labelClasses}>
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <span
              className={`
                ${iconBaseClasses}
                ${iconPositionClasses[size].left}
                ${iconColorClasses}
              `}
            >
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            value={currentValue}
            onChange={handleChange}
            disabled={disabled}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            className={`${baseInputClasses} ${stateClasses}`}
            aria-invalid={!!error}
            aria-describedby={
              error
                ? `${inputId}-error`
                : helperText
                ? `${inputId}-helper`
                : undefined
            }
            {...props}
          />

          {showClearButton && hasValue && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className={`
                absolute
                top-1/2
                -translate-y-1/2
                ${rightIcon ? iconPositionClasses[size].clearWithIcon : iconPositionClasses[size].right}
                ${iconSizeClasses[size]}
                flex
                items-center
                justify-center
                rounded-full
                text-zinc-400
                hover:text-zinc-600
                dark:text-zinc-500
                dark:hover:text-zinc-300
                hover:bg-zinc-200
                dark:hover:bg-zinc-700
                transition-all
                duration-200
                focus:outline-none
                focus:ring-2
                focus:ring-amber-500/50
              `}
              aria-label="Clear input"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-full h-full"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}

          {rightIcon && (
            <span
              className={`
                ${iconBaseClasses}
                ${iconPositionClasses[size].right}
                ${iconColorClasses}
              `}
            >
              {rightIcon}
            </span>
          )}
        </div>

        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1.5"
            role="alert"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4 flex-shrink-0"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}

        {helperText && !error && (
          <p
            id={`${inputId}-helper`}
            className="mt-2 text-sm text-zinc-500 dark:text-zinc-400"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
