"use client"

import React from 'react'
import { Utensils, CheckCircle, MapPin, CalendarCheck } from 'lucide-react'

interface StatsCardsProps {
  totalRestaurantes?: number
  visitados?: number
  paraVisitar?: number
  aceitamReserva?: number
}

export default function StatsCards({
  totalRestaurantes = 0,
  visitados = 0,
  paraVisitar = 0,
  aceitamReserva = 0
}: StatsCardsProps) {
  const stats = [
    {
      title: 'Total Restaurantes',
      value: totalRestaurantes,
      icon: Utensils,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30'
    },
    {
      title: 'Visitados',
      value: visitados,
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/30'
    },
    {
      title: 'Para Visitar',
      value: paraVisitar,
      icon: MapPin,
      color: 'text-orange-500',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30'
    },
    {
      title: 'Aceitam Reserva',
      value: aceitamReserva,
      icon: CalendarCheck,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30'
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-200 hover:shadow-lg hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
