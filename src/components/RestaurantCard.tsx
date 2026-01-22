"use client"

import React from 'react'
import { Heart, ExternalLink, MapPin, Star, Clock } from 'lucide-react'

interface Restaurant {
  id: string | number
  nome: string
  tipo: string
  cidade: string
  bairro: string
  estilo: string
  avaliacao?: number
  horario?: string
  aceitaReserva?: boolean
  visitado?: boolean
  favorito?: boolean
  cardapioUrl?: string
}

interface RestaurantCardProps {
  restaurant: Restaurant
  onToggleFavorite?: (id: string | number) => void
}

const typeColors: Record<string, string> = {
  'Brasileira': 'bg-green-500',
  'Italiana': 'bg-red-500',
  'Japonesa': 'bg-pink-500',
  'Mexicana': 'bg-yellow-500',
  'Arabe': 'bg-amber-600',
  'Chinesa': 'bg-orange-500',
  'default': 'bg-gray-500'
}

const badgeColors: Record<string, { bg: string; text: string }> = {
  'Casual': { bg: 'bg-blue-100 dark:bg-blue-900/40', text: 'text-blue-700 dark:text-blue-300' },
  'Fine Dining': { bg: 'bg-purple-100 dark:bg-purple-900/40', text: 'text-purple-700 dark:text-purple-300' },
  'Fast Food': { bg: 'bg-orange-100 dark:bg-orange-900/40', text: 'text-orange-700 dark:text-orange-300' },
  'Buffet': { bg: 'bg-green-100 dark:bg-green-900/40', text: 'text-green-700 dark:text-green-300' },
  'Rodizio': { bg: 'bg-red-100 dark:bg-red-900/40', text: 'text-red-700 dark:text-red-300' },
  'Delivery': { bg: 'bg-teal-100 dark:bg-teal-900/40', text: 'text-teal-700 dark:text-teal-300' },
  'default': { bg: 'bg-gray-100 dark:bg-gray-700', text: 'text-gray-700 dark:text-gray-300' }
}

export default function RestaurantCard({ restaurant, onToggleFavorite }: RestaurantCardProps) {
  const typeColor = typeColors[restaurant.tipo] || typeColors.default
  const badgeStyle = badgeColors[restaurant.estilo] || badgeColors.default

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Color bar based on type */}
      <div className={`h-2 ${typeColor}`} />

      <div className="p-5">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
              {restaurant.nome}
            </h3>
            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
              <MapPin className="w-4 h-4" />
              <span>{restaurant.bairro}, {restaurant.cidade}</span>
            </div>
          </div>

          <button
            onClick={() => onToggleFavorite?.(restaurant.id)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label={restaurant.favorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            <Heart
              className={`w-5 h-5 ${
                restaurant.favorito
                  ? 'fill-red-500 text-red-500'
                  : 'text-gray-400 dark:text-gray-500'
              }`}
            />
          </button>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${badgeStyle.bg} ${badgeStyle.text}`}>
            {restaurant.estilo}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            {restaurant.tipo}
          </span>
          {restaurant.aceitaReserva && (
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300">
              Aceita Reserva
            </span>
          )}
          {restaurant.visitado && (
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300">
              Visitado
            </span>
          )}
        </div>

        {/* Info row */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
          {restaurant.avaliacao && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span>{restaurant.avaliacao.toFixed(1)}</span>
            </div>
          )}
          {restaurant.horario && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{restaurant.horario}</span>
            </div>
          )}
        </div>

        {/* Action button */}
        {restaurant.cardapioUrl && (
          <a
            href={restaurant.cardapioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <ExternalLink className="w-4 h-4" />
            Ver Cardapio
          </a>
        )}
      </div>
    </div>
  )
}
