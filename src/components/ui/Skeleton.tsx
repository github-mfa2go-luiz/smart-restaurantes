'use client';

import React from 'react';

// Base Skeleton Props
interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

// Rounded styles mapping
const roundedStyles: Record<string, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  full: 'rounded-full',
};

/**
 * Base Skeleton component with smooth pulse animation
 * Uses neutral zinc colors for light/dark mode support
 */
export function Skeleton({
  className = '',
  width,
  height,
  rounded = 'md',
}: SkeletonProps) {
  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={`
        bg-zinc-200 dark:bg-zinc-700
        animate-pulse
        ${roundedStyles[rounded]}
        ${className}
      `.replace(/\s+/g, ' ').trim()}
      style={style}
      aria-hidden="true"
    />
  );
}

/**
 * SkeletonCard - Skeleton for restaurant cards
 * Mimics the structure of RestaurantCard component
 */
export function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      {/* Color bar placeholder */}
      <Skeleton height={8} rounded="none" className="w-full" />

      <div className="p-5">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            {/* Restaurant name */}
            <Skeleton height={24} className="w-3/4 mb-2" rounded="md" />
            {/* Location */}
            <div className="flex items-center gap-1">
              <Skeleton width={16} height={16} rounded="full" />
              <Skeleton height={16} className="w-1/2" rounded="md" />
            </div>
          </div>
          {/* Favorite button */}
          <Skeleton width={36} height={36} rounded="full" />
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Skeleton width={70} height={26} rounded="full" />
          <Skeleton width={80} height={26} rounded="full" />
          <Skeleton width={90} height={26} rounded="full" />
        </div>

        {/* Info row */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            <Skeleton width={16} height={16} rounded="full" />
            <Skeleton width={32} height={16} rounded="md" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton width={16} height={16} rounded="full" />
            <Skeleton width={60} height={16} rounded="md" />
          </div>
        </div>

        {/* Action button */}
        <Skeleton height={42} className="w-full" rounded="lg" />
      </div>
    </div>
  );
}

/**
 * SkeletonStats - Skeleton for stats cards
 * Mimics the structure of StatsCards component
 */
export function SkeletonStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              {/* Stat title */}
              <Skeleton height={16} className="w-24 mb-2" rounded="md" />
              {/* Stat value */}
              <Skeleton height={36} className="w-16" rounded="md" />
            </div>
            {/* Icon container */}
            <Skeleton width={48} height={48} rounded="full" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * SkeletonFilters - Skeleton for filters area
 * Mimics the structure of Filters component
 */
export function SkeletonFilters() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((index) => (
          <div key={index}>
            {/* Label */}
            <Skeleton height={16} className="w-20 mb-2" rounded="md" />
            {/* Select input */}
            <Skeleton height={42} className="w-full" rounded="lg" />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * SkeletonText - Skeleton for text lines
 * Useful for paragraph-like loading states
 */
export function SkeletonText({
  lines = 3,
  className = '',
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          height={16}
          className={index === lines - 1 ? 'w-2/3' : 'w-full'}
          rounded="md"
        />
      ))}
    </div>
  );
}

/**
 * SkeletonAvatar - Skeleton for avatar/profile images
 */
export function SkeletonAvatar({
  size = 'md',
}: {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}) {
  const sizeMap = {
    sm: 32,
    md: 40,
    lg: 48,
    xl: 64,
  };

  return (
    <Skeleton
      width={sizeMap[size]}
      height={sizeMap[size]}
      rounded="full"
    />
  );
}

/**
 * SkeletonButton - Skeleton for buttons
 */
export function SkeletonButton({
  size = 'md',
  fullWidth = false,
}: {
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}) {
  const heightMap = {
    sm: 32,
    md: 40,
    lg: 48,
  };

  const widthMap = {
    sm: 80,
    md: 100,
    lg: 120,
  };

  return (
    <Skeleton
      width={fullWidth ? '100%' : widthMap[size]}
      height={heightMap[size]}
      rounded="lg"
    />
  );
}

export default Skeleton;
