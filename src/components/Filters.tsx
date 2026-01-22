"use client"

import React from 'react'
import { X } from 'lucide-react'

interface FiltersProps {
  cidade?: string
  tipoComida?: string
  bairro?: string
  estilo?: string
  onCidadeChange?: (value: string) => void
  onTipoComidaChange?: (value: string) => void
  onBairroChange?: (value: string) => void
  onEstiloChange?: (value: string) => void
  onClearFilters?: () => void
  cidades?: string[]
  tiposComida?: string[]
  bairros?: string[]
  estilos?: string[]
}

export default function Filters({
  cidade = '',
  tipoComida = '',
  bairro = '',
  estilo = '',
  onCidadeChange,
  onTipoComidaChange,
  onBairroChange,
  onEstiloChange,
  onClearFilters,
  cidades = ['Sao Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Curitiba', 'Porto Alegre'],
  tiposComida = ['Brasileira', 'Italiana', 'Japonesa', 'Mexicana', 'Arabe', 'Chinesa'],
  bairros = ['Centro', 'Jardins', 'Pinheiros', 'Vila Madalena', 'Moema', 'Itaim'],
  estilos = ['Casual', 'Fine Dining', 'Fast Food', 'Buffet', 'Rodizio', 'Delivery']
}: FiltersProps) {
  const selectClass = "w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 cursor-pointer"

  const hasActiveFilters = cidade || tipoComida || bairro || estilo

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Cidade
          </label>
          <select
            value={cidade}
            onChange={(e) => onCidadeChange?.(e.target.value)}
            className={selectClass}
          >
            <option value="">Todas as cidades</option>
            {cidades.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tipo de Comida
          </label>
          <select
            value={tipoComida}
            onChange={(e) => onTipoComidaChange?.(e.target.value)}
            className={selectClass}
          >
            <option value="">Todos os tipos</option>
            {tiposComida.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Bairro
          </label>
          <select
            value={bairro}
            onChange={(e) => onBairroChange?.(e.target.value)}
            className={selectClass}
          >
            <option value="">Todos os bairros</option>
            {bairros.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Estilo
          </label>
          <select
            value={estilo}
            onChange={(e) => onEstiloChange?.(e.target.value)}
            className={selectClass}
          >
            <option value="">Todos os estilos</option>
            {estilos.map((e) => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClearFilters}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
          >
            <X className="w-4 h-4" />
            Limpar Filtros
          </button>
        </div>
      )}
    </div>
  )
}
