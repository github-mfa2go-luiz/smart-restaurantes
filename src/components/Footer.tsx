"use client"

import React from 'react'
import { ChefHat, Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ChefHat className="w-6 h-6 text-orange-500" />
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              Guia de Restaurantes Brasil
            </span>
          </div>

          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
            <span>Feito com</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>no Brasil</span>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-500">
            &copy; {currentYear} Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
