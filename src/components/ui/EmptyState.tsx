'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateAction {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
}

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: EmptyStateAction;
  className?: string;
}

const actionVariantStyles: Record<string, string> = {
  primary: `
    bg-gradient-to-r from-orange-500 to-red-600
    hover:from-orange-600 hover:to-red-700
    text-white shadow-md hover:shadow-lg
    active:scale-[0.98]
  `,
  secondary: `
    bg-gray-100 hover:bg-gray-200
    dark:bg-gray-700 dark:hover:bg-gray-600
    text-gray-700 dark:text-gray-200
    shadow-sm hover:shadow-md
    active:scale-[0.98]
  `,
  outline: `
    bg-transparent border-2 border-gray-300
    dark:border-gray-600
    hover:border-gray-400 dark:hover:border-gray-500
    hover:bg-gray-50 dark:hover:bg-gray-800/50
    text-gray-700 dark:text-gray-300
    active:scale-[0.98]
  `,
};

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className = '',
}: EmptyStateProps) {
  return (
    <div
      className={`
        flex flex-col items-center justify-center
        py-16 px-8
        animate-fade-in
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      {/* Icon Container */}
      <div
        className="
          relative mb-6
          flex items-center justify-center
          w-24 h-24 rounded-full
          bg-gray-100/80 dark:bg-gray-800/50
          ring-1 ring-gray-200/50 dark:ring-gray-700/50
        "
      >
        <Icon
          className="
            w-12 h-12
            text-gray-400 dark:text-gray-500
            stroke-[1.5]
          "
        />
        {/* Subtle decorative ring */}
        <div
          className="
            absolute inset-0 rounded-full
            bg-gradient-to-br from-gray-200/20 to-transparent
            dark:from-gray-600/10 dark:to-transparent
          "
        />
      </div>

      {/* Title */}
      <h3
        className="
          text-xl font-semibold
          text-gray-800 dark:text-gray-100
          mb-2 text-center
        "
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className="
          text-sm text-gray-500 dark:text-gray-400
          text-center max-w-sm
          leading-relaxed
        "
      >
        {description}
      </p>

      {/* Optional Action Button */}
      {action && (
        <button
          onClick={action.onClick}
          className={`
            mt-6 px-6 py-2.5
            font-medium text-sm
            rounded-lg
            transition-all duration-200 ease-out
            focus:outline-none focus:ring-2 focus:ring-offset-2
            focus:ring-orange-500 dark:focus:ring-offset-gray-900
            ${actionVariantStyles[action.variant || 'primary']}
          `.replace(/\s+/g, ' ').trim()}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
