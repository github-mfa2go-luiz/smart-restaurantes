'use client'

import { useState, useMemo, useEffect } from 'react'
import { restaurantsData } from '@/data/restaurants'
import {
  MapPin,
  Utensils,
  Calendar,
  Star,
  ExternalLink,
  SlidersHorizontal,
  ChefHat,
  Search,
  Sun,
  Moon,
  Heart,
  X,
  Sparkles,
  Clock,
  Users
} from 'lucide-react'
import { useTheme } from 'next-themes'

export default function Home() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Filtros
  const [selectedFoodType, setSelectedFoodType] = useState('Todos')
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('Todos')
  const [selectedType, setSelectedType] = useState('Todos')
  const [selectedCity, setSelectedCity] = useState('Todos')
  const [searchTerm, setSearchTerm] = useState('')

  // Favoritos
  const [favorites, setFavorites] = useState<string[]>([])
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)

  // Carregar favoritos do localStorage no cliente
  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('restaurant-favorites')
    if (saved) {
      try {
        setFavorites(JSON.parse(saved))
      } catch {
        setFavorites([])
      }
    }
    // Simular loading
    setTimeout(() => setIsLoading(false), 500)
  }, [])

  // Opcoes unicas para filtros
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

  // Estatisticas
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

  // Skeleton Card Component
  const SkeletonCard = () => (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      <div className="h-1.5 bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
      <div className="p-5">
        <div className="flex justify-between mb-3">
          <div className="h-6 w-3/4 bg-zinc-200 dark:bg-zinc-700 rounded-lg animate-pulse" />
          <div className="h-8 w-8 bg-zinc-200 dark:bg-zinc-700 rounded-full animate-pulse" />
        </div>
        <div className="flex gap-2 mb-3">
          <div className="h-6 w-20 bg-zinc-200 dark:bg-zinc-700 rounded-full animate-pulse" />
          <div className="h-6 w-24 bg-zinc-200 dark:bg-zinc-700 rounded-full animate-pulse" />
        </div>
        <div className="h-4 w-1/2 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse mb-4" />
        <div className="h-10 w-full bg-zinc-200 dark:bg-zinc-700 rounded-xl animate-pulse mt-4" />
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-lg shadow-amber-500/20">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                  Smart Restaurantes
                </h1>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 hidden sm:block">
                  Curadoria de restaurantes premium
                </p>
              </div>
            </div>
            <button
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-200"
              aria-label="Alternar tema"
            >
              {mounted && (resolvedTheme === 'dark'
                ? <Sun className="w-5 h-5 text-amber-500" />
                : <Moon className="w-5 h-5 text-zinc-600" />
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50 transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                <Utensils className="w-4 h-4 text-amber-600 dark:text-amber-500" />
              </div>
              <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Total</span>
            </div>
            <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{stats.total}</div>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50 transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
              </div>
              <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Visitados</span>
            </div>
            <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{stats.visited}</div>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50 transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-sky-100 dark:bg-sky-900/30 rounded-lg">
                <Clock className="w-4 h-4 text-sky-600 dark:text-sky-500" />
              </div>
              <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Pendentes</span>
            </div>
            <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{stats.pending}</div>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50 transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-violet-100 dark:bg-violet-900/30 rounded-lg">
                <Users className="w-4 h-4 text-violet-600 dark:text-violet-500" />
              </div>
              <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Reservas</span>
            </div>
            <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{stats.withReservation}</div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-2 mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar restaurante..."
              className="w-full pl-12 pr-4 py-3 bg-transparent text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <X className="w-4 h-4 text-zinc-400" />
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-zinc-500" />
              <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">Filtros</h2>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  showFavoritesOnly
                    ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/25'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                <Heart className={`w-4 h-4 ${showFavoritesOnly ? 'fill-current' : ''}`} />
                <span className="hidden sm:inline">Favoritos</span>
                <span className="bg-white/20 px-1.5 py-0.5 rounded-md text-xs">{favorites.length}</span>
              </button>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-sm font-medium"
                >
                  <X className="w-4 h-4" />
                  Limpar
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider">
                Cidade
              </label>
              <select
                className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-zinc-900 dark:text-zinc-100 text-sm transition-all"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider">
                Culinaria
              </label>
              <select
                className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-zinc-900 dark:text-zinc-100 text-sm transition-all"
                value={selectedFoodType}
                onChange={(e) => setSelectedFoodType(e.target.value)}
              >
                {foodTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider">
                Bairro
              </label>
              <select
                className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-zinc-900 dark:text-zinc-100 text-sm transition-all"
                value={selectedNeighborhood}
                onChange={(e) => setSelectedNeighborhood(e.target.value)}
              >
                {neighborhoods.map(neighborhood => (
                  <option key={neighborhood} value={neighborhood}>{neighborhood}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider">
                Categoria
              </label>
              <select
                className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-zinc-900 dark:text-zinc-100 text-sm transition-all"
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
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Mostrando <span className="font-semibold text-zinc-900 dark:text-zinc-50">{filteredRestaurants.length}</span> restaurante{filteredRestaurants.length !== 1 ? 's' : ''}
            {hasActiveFilters && <span className="ml-1 text-zinc-400">(de {restaurantsData.length})</span>}
          </p>
        </div>

        {/* Restaurant Cards */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredRestaurants.map((restaurant, index) => (
              <div
                key={index}
                className="group bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Header Color Bar */}
                <div className={`h-1.5 ${
                  restaurant.type === 'SOFISTICADO'
                    ? 'bg-gradient-to-r from-violet-500 to-purple-600'
                    : restaurant.type === 'FITNESS'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600'
                      : 'bg-gradient-to-r from-amber-500 to-orange-600'
                }`} />

                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 line-clamp-2 flex-1 pr-2">
                      {restaurant.name}
                    </h3>
                    <button
                      onClick={() => toggleFavorite(restaurant.name)}
                      className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                      aria-label={favorites.includes(restaurant.name) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                    >
                      <Heart
                        className={`w-5 h-5 transition-colors ${
                          favorites.includes(restaurant.name)
                            ? 'text-rose-500 fill-current'
                            : 'text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-400'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border border-amber-200/50 dark:border-amber-800/50">
                      <Utensils className="w-3 h-3 mr-1.5" />
                      {restaurant.foodType}
                    </span>
                    {restaurant.type && (
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border ${
                        restaurant.type === 'SOFISTICADO'
                          ? 'bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400 border-violet-200/50 dark:border-violet-800/50'
                          : restaurant.type === 'FITNESS'
                            ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-800/50'
                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700'
                      }`}>
                        {restaurant.type}
                      </span>
                    )}
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-2.5 text-zinc-500 dark:text-zinc-400 mb-3">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-zinc-400" />
                    <div className="text-sm">
                      <span className="text-zinc-700 dark:text-zinc-300">{restaurant.neighborhood}</span>
                      <span className="mx-1.5 text-zinc-300 dark:text-zinc-600">·</span>
                      <span className="text-zinc-500">{restaurant.city}</span>
                    </div>
                  </div>

                  {/* Occasion */}
                  {restaurant.occasion && (
                    <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 mb-4">
                      <Calendar className="w-4 h-4 text-zinc-400" />
                      <span className="text-sm">{restaurant.occasion}</span>
                    </div>
                  )}

                  {/* Extra Badges */}
                  {restaurant.reservation === 'SIM' && (
                    <div className="mb-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/50">
                        <Star className="w-3 h-3 mr-1.5" />
                        Aceita Reserva
                      </span>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
                    {restaurant.menu && restaurant.menu !== 'Indisponivel' && restaurant.menu !== '' ? (
                      <a
                        href={restaurant.menu}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors text-sm font-medium"
                      >
                        Ver Cardapio
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    ) : (
                      <div className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-400 rounded-xl text-sm">
                        Cardapio indisponivel
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredRestaurants.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 mb-4">
              <Search className="w-8 h-8 text-zinc-400" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
              Nenhum restaurante encontrado
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 mb-6 max-w-md mx-auto">
              Tente ajustar os filtros ou buscar por outro termo para encontrar o que procura.
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors text-sm font-medium"
              >
                <X className="w-4 h-4" />
                Limpar filtros
              </button>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg">
                <ChefHat className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Smart Restaurantes</span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {stats.total} restaurantes curados · 2026
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
