'use client'

import { useState, useMemo } from 'react'
import { restaurantsData, Restaurant } from '@/data/restaurants'
import { MapPin, Utensils, Calendar, Star, ExternalLink, Filter, ChefHat, Search, Sun, Moon, Heart, X } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function Home() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Filtros
  const [selectedFoodType, setSelectedFoodType] = useState('Todos')
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('Todos')
  const [selectedType, setSelectedType] = useState('Todos')
  const [selectedCity, setSelectedCity] = useState('Todos')
  const [searchTerm, setSearchTerm] = useState('')

  // Favoritos
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('restaurant-favorites')
      return saved ? JSON.parse(saved) : []
    }
    return []
  })
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)

  // Montar cliente
  useState(() => {
    setMounted(true)
    const saved = localStorage.getItem('restaurant-favorites')
    if (saved) setFavorites(JSON.parse(saved))
  })

  // Opções únicas para filtros
  const foodTypes = ['Todos', ...new Set(restaurantsData.map(r => r.foodType).filter(Boolean))]
  const neighborhoods = ['Todos', ...new Set(restaurantsData.map(r => r.neighborhood).filter(Boolean))]
  const types = ['Todos', ...new Set(restaurantsData.map(r => r.type).filter(Boolean))]
  const cities = ['Todos', ...new Set(restaurantsData.map(r => r.city).filter(Boolean))]

  // Filtrar restaurantes
  const filteredRestaurants = useMemo(() => {
    return restaurantsData.filter(restaurant => {
      const matchesFoodType = selectedFoodType === 'Todos' || restaurant.foodType === selectedFoodType
      const matchesNeighborhood = selectedNeighborhood === 'Todos' || restaurant.neighborhood === selectedNeighborhood
      const matchesType = selectedType === 'Todos' || restaurant.type === selectedType
      const matchesCity = selectedCity === 'Todos' || restaurant.city === selectedCity
      const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFavorites = !showFavoritesOnly || favorites.includes(restaurant.name)

      return matchesFoodType && matchesNeighborhood && matchesType && matchesCity && matchesSearch && matchesFavorites
    })
  }, [selectedFoodType, selectedNeighborhood, selectedType, selectedCity, searchTerm, showFavoritesOnly, favorites])

  // Estatísticas
  const stats = {
    total: restaurantsData.length,
    visited: restaurantsData.filter(r => r.status === 'FOMOS').length,
    pending: restaurantsData.filter(r => r.status === 'PENDING').length,
    withReservation: restaurantsData.filter(r => r.reservation === 'SIM').length
  }

  // Toggle favorito
  const toggleFavorite = (name: string) => {
    const newFavorites = favorites.includes(name)
      ? favorites.filter(f => f !== name)
      : [...favorites, name]
    setFavorites(newFavorites)
    localStorage.setItem('restaurant-favorites', JSON.stringify(newFavorites))
  }

  // Limpar filtros
  const clearFilters = () => {
    setSelectedFoodType('Todos')
    setSelectedNeighborhood('Todos')
    setSelectedType('Todos')
    setSelectedCity('Todos')
    setSearchTerm('')
    setShowFavoritesOnly(false)
  }

  const hasActiveFilters = selectedFoodType !== 'Todos' || selectedNeighborhood !== 'Todos' ||
    selectedType !== 'Todos' || selectedCity !== 'Todos' || searchTerm !== '' || showFavoritesOnly

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 light:from-orange-50 light:via-white light:to-red-50 transition-colors">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <ChefHat className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Guia de Restaurantes Brasil</h1>
                <p className="text-orange-100 text-sm">Seus restaurantes favoritos em um só lugar</p>
              </div>
            </div>
            <button
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
              aria-label="Alternar tema"
            >
              {resolvedTheme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 dark:bg-gray-800 rounded-lg shadow-lg p-6 border-l-4 border-orange-500">
            <div className="text-3xl font-bold text-orange-500">{stats.total}</div>
            <div className="text-gray-400 text-sm">Total Restaurantes</div>
          </div>
          <div className="bg-gray-800 dark:bg-gray-800 rounded-lg shadow-lg p-6 border-l-4 border-green-500">
            <div className="text-3xl font-bold text-green-500">{stats.visited}</div>
            <div className="text-gray-400 text-sm">Já Visitados</div>
          </div>
          <div className="bg-gray-800 dark:bg-gray-800 rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
            <div className="text-3xl font-bold text-blue-500">{stats.pending}</div>
            <div className="text-gray-400 text-sm">Para Visitar</div>
          </div>
          <div className="bg-gray-800 dark:bg-gray-800 rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
            <div className="text-3xl font-bold text-purple-500">{stats.withReservation}</div>
            <div className="text-gray-400 text-sm">Aceitam Reserva</div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-gray-800 dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar restaurante..."
              className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-800 dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-orange-500" />
              <h2 className="text-xl font-bold text-white">Filtros</h2>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  showFavoritesOnly
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Heart className={`w-4 h-4 ${showFavoritesOnly ? 'fill-current' : ''}`} />
                Favoritos ({favorites.length})
              </button>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Limpar
                </button>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Cidade</label>
              <select
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Tipo de Comida</label>
              <select
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
                value={selectedFoodType}
                onChange={(e) => setSelectedFoodType(e.target.value)}
              >
                {foodTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Bairro</label>
              <select
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
                value={selectedNeighborhood}
                onChange={(e) => setSelectedNeighborhood(e.target.value)}
              >
                {neighborhoods.map(neighborhood => (
                  <option key={neighborhood} value={neighborhood}>{neighborhood}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Estilo</label>
              <select
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-400">
            Mostrando <span className="font-bold text-orange-500">{filteredRestaurants.length}</span> restaurante(s)
            {hasActiveFilters && <span className="ml-2 text-sm">(de {restaurantsData.length} no total)</span>}
          </p>
        </div>

        {/* Restaurant Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant, index) => (
            <div key={index} className="bg-gray-800 dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all overflow-hidden border border-gray-700 hover:border-orange-500/50">
              {/* Header Color Bar */}
              <div className={`h-2 ${
                restaurant.type === 'SOFISTICADO'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                  : restaurant.type === 'FITNESS'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                    : 'bg-gradient-to-r from-orange-500 to-red-500'
              }`}></div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-white line-clamp-2 flex-1">{restaurant.name}</h3>
                  <button
                    onClick={() => toggleFavorite(restaurant.name)}
                    className="ml-2 p-2 rounded-full hover:bg-gray-700 transition-colors"
                    aria-label={favorites.includes(restaurant.name) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        favorites.includes(restaurant.name)
                          ? 'text-red-500 fill-current'
                          : 'text-gray-400'
                      }`}
                    />
                  </button>
                </div>

                {/* Food Type Badge */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/20 text-orange-400">
                    <Utensils className="w-3 h-3 mr-1" />
                    {restaurant.foodType}
                  </span>
                  {restaurant.type && (
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      restaurant.type === 'SOFISTICADO' ? 'bg-purple-500/20 text-purple-400' :
                      restaurant.type === 'FITNESS' ? 'bg-green-500/20 text-green-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {restaurant.type}
                    </span>
                  )}
                </div>

                {/* Location */}
                <div className="flex items-start gap-2 text-gray-400 mb-3">
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-red-500" />
                  <div className="text-sm">
                    <div className="font-medium text-gray-300">{restaurant.neighborhood}</div>
                    <div className="text-xs text-gray-500">{restaurant.city}</div>
                  </div>
                </div>

                {/* Occasion */}
                {restaurant.occasion && (
                  <div className="flex items-center gap-2 text-gray-400 mb-4">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">{restaurant.occasion}</span>
                  </div>
                )}

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {restaurant.reservation === 'SIM' && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                      <Star className="w-3 h-3 mr-1" />
                      Aceita Reserva
                    </span>
                  )}
                  {restaurant.priority === 'HIGH' && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400">
                      Alta Prioridade
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-gray-700">
                  {restaurant.menu && restaurant.menu !== 'Indisponivel' && restaurant.menu !== '' && (
                    <a
                      href={restaurant.menu}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition-all text-sm font-medium"
                    >
                      Ver Cardápio
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredRestaurants.length === 0 && (
          <div className="text-center py-12">
            <Utensils className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">Nenhum restaurante encontrado</h3>
            <p className="text-gray-500 mb-4">Tente ajustar os filtros ou a busca</p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Limpar filtros
              </button>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 mt-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <ChefHat className="w-5 h-5 text-orange-500" />
            <span className="font-semibold">Smart Restaurantes</span>
          </div>
          <p className="text-gray-500 text-sm">
            Total: {stats.total} restaurantes | Janeiro 2026
          </p>
        </div>
      </footer>
    </div>
  )
}
