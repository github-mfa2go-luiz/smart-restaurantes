'use client';

import React from 'react';

type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: `
    bg-gray-100 text-gray-700
    dark:bg-gray-800 dark:text-gray-300
    hover:bg-gray-200 dark:hover:bg-gray-700
  `,
  primary: `
    bg-amber-100 text-amber-700
    dark:bg-amber-900/30 dark:text-amber-400
    hover:bg-amber-200 dark:hover:bg-amber-900/50
  `,
  secondary: `
    bg-slate-100 text-slate-700
    dark:bg-slate-800 dark:text-slate-300
    hover:bg-slate-200 dark:hover:bg-slate-700
  `,
  success: `
    bg-emerald-100 text-emerald-700
    dark:bg-emerald-900/30 dark:text-emerald-400
    hover:bg-emerald-200 dark:hover:bg-emerald-900/50
  `,
  warning: `
    bg-amber-100 text-amber-600
    dark:bg-amber-900/30 dark:text-amber-400
    hover:bg-amber-200 dark:hover:bg-amber-900/50
  `,
  error: `
    bg-rose-100 text-rose-700
    dark:bg-rose-900/30 dark:text-rose-400
    hover:bg-rose-200 dark:hover:bg-rose-900/50
  `,
  outline: `
    bg-transparent border border-gray-300 text-gray-700
    dark:border-gray-600 dark:text-gray-300
    hover:bg-gray-100 dark:hover:bg-gray-800
  `,
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs gap-1',
  md: 'px-2.5 py-1 text-sm gap-1.5',
  lg: 'px-3 py-1.5 text-base gap-2',
};

const iconSizeStyles: Record<BadgeSize, string> = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
};

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  icon,
  iconPosition = 'left',
  className = '',
}: BadgeProps) {
  const baseStyles = `
    inline-flex items-center justify-center
    font-medium rounded-full
    transition-colors duration-200 ease-in-out
    whitespace-nowrap
  `;

  const iconElement = icon && (
    <span className={`flex-shrink-0 ${iconSizeStyles[size]}`}>
      {icon}
    </span>
  );

  return (
    <span
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      {icon && iconPosition === 'left' && iconElement}
      {children}
      {icon && iconPosition === 'right' && iconElement}
    </span>
  );
}

export default Badge;
