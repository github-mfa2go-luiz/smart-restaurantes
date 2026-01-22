"use client"

import React from 'react'
import { Search } from 'lucide-react'

interface SearchBarProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
}

export default function SearchBar({
  value = '',
  onChange,
  placeholder = 'Buscar restaurantes...'
}: SearchBarProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
      </div>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 shadow-sm hover:shadow-md"
      />
    </div>
  )
}
