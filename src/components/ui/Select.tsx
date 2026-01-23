'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: string;
  className?: string;
  id?: string;
  name?: string;
}

export function Select({
  label,
  placeholder = 'Selecione uma opção',
  options,
  value,
  onChange,
  disabled = false,
  error,
  className = '',
  id,
  name,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) {
      setHighlightedIndex(-1);
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setHighlightedIndex((prev) => {
            const nextIndex = prev + 1;
            return nextIndex >= options.length ? 0 : nextIndex;
          });
          break;
        case 'ArrowUp':
          event.preventDefault();
          setHighlightedIndex((prev) => {
            const nextIndex = prev - 1;
            return nextIndex < 0 ? options.length - 1 : nextIndex;
          });
          break;
        case 'Enter':
          event.preventDefault();
          if (highlightedIndex >= 0 && !options[highlightedIndex]?.disabled) {
            handleSelect(options[highlightedIndex].value);
          }
          break;
        case 'Escape':
          event.preventDefault();
          setIsOpen(false);
          break;
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, highlightedIndex, options]);

  // Scroll highlighted option into view
  useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && listRef.current) {
      const highlightedElement = listRef.current.children[highlightedIndex] as HTMLElement;
      highlightedElement?.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedIndex, isOpen]);

  function handleSelect(optionValue: string) {
    onChange?.(optionValue);
    setIsOpen(false);
  }

  function toggleOpen() {
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  }

  const baseClasses = `
    relative w-full px-4 py-3 text-left
    rounded-lg border transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-0
  `;

  const stateClasses = disabled
    ? `
      bg-zinc-100 dark:bg-zinc-800
      border-zinc-200 dark:border-zinc-700
      text-zinc-400 dark:text-zinc-500
      cursor-not-allowed
    `
    : error
    ? `
      bg-white dark:bg-zinc-900
      border-red-400 dark:border-red-500
      text-zinc-900 dark:text-zinc-100
      cursor-pointer
      hover:border-red-500 dark:hover:border-red-400
      focus:ring-red-500/50 focus:border-red-500
    `
    : `
      bg-white dark:bg-zinc-900
      border-zinc-300 dark:border-zinc-700
      text-zinc-900 dark:text-zinc-100
      cursor-pointer
      hover:border-zinc-400 dark:hover:border-zinc-600
      focus:ring-amber-500/50 focus:border-amber-500
    `;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={id}
          className={`
            block mb-2 text-sm font-medium
            ${disabled ? 'text-zinc-400 dark:text-zinc-500' : 'text-zinc-700 dark:text-zinc-300'}
            ${error ? 'text-red-600 dark:text-red-400' : ''}
          `}
        >
          {label}
        </label>
      )}

      {/* Select Button */}
      <button
        type="button"
        id={id}
        name={name}
        onClick={toggleOpen}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={label ? id : undefined}
        className={`${baseClasses} ${stateClasses}`}
      >
        <span className={`block truncate pr-8 ${!selectedOption ? 'text-zinc-400 dark:text-zinc-500' : ''}`}>
          {selectedOption?.label || placeholder}
        </span>

        {/* Chevron Icon */}
        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ChevronDown
            className={`
              w-5 h-5 transition-transform duration-200 ease-out
              ${disabled ? 'text-zinc-300 dark:text-zinc-600' : 'text-zinc-500 dark:text-zinc-400'}
              ${isOpen ? 'rotate-180' : 'rotate-0'}
            `}
          />
        </span>
      </button>

      {/* Dropdown Options */}
      {isOpen && !disabled && (
        <ul
          ref={listRef}
          role="listbox"
          aria-activedescendant={highlightedIndex >= 0 ? `option-${highlightedIndex}` : undefined}
          className={`
            absolute z-50 w-full mt-2 py-1
            bg-white dark:bg-zinc-900
            border border-zinc-200 dark:border-zinc-700
            rounded-lg shadow-lg
            max-h-60 overflow-auto
            animate-in fade-in-0 zoom-in-95 duration-150
          `}
        >
          {options.length === 0 ? (
            <li className="px-4 py-3 text-sm text-zinc-400 dark:text-zinc-500">
              Nenhuma opção disponível
            </li>
          ) : (
            options.map((option, index) => {
              const isSelected = option.value === value;
              const isHighlighted = index === highlightedIndex;
              const isDisabled = option.disabled;

              return (
                <li
                  key={option.value}
                  id={`option-${index}`}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={isDisabled}
                  onClick={() => !isDisabled && handleSelect(option.value)}
                  onMouseEnter={() => !isDisabled && setHighlightedIndex(index)}
                  className={`
                    relative px-4 py-3 text-sm cursor-pointer
                    transition-colors duration-100
                    ${
                      isDisabled
                        ? 'text-zinc-300 dark:text-zinc-600 cursor-not-allowed'
                        : isSelected
                        ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 font-medium'
                        : isHighlighted
                        ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100'
                        : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    }
                  `}
                >
                  <span className="block truncate">{option.label}</span>

                  {/* Selected Indicator */}
                  {isSelected && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                      <svg
                        className="w-4 h-4 text-amber-600 dark:text-amber-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  )}
                </li>
              );
            })
          )}
        </ul>
      )}

      {/* Error Message */}
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1.5">
          <svg
            className="w-4 h-4 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

export default Select;
