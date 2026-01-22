'use client'

import { useState, useCallback } from 'react'

/** Interface para representar um restaurante */
export interface Restaurant {
  id: string
  name: string
  category: string
  description: string
  tags: string[]
  priceRange: string
  rating: number
  isOpen: boolean
  city?: string
  foodType?: string
  neighborhood?: string
  type?: string
}

interface UseFiltersReturn {
  /** Termo de busca atual */
  searchTerm: string
  /** Define o termo de busca */
  setSearchTerm: (term: string) => void
  /** Categoria selecionada */
  selectedCategory: string
  /** Define a categoria selecionada */
  setSelectedCategory: (category: string) => void
  /** Faixa de preco selecionada */
  selectedPriceRange: string
  /** Define a faixa de preco selecionada */
  setSelectedPriceRange: (priceRange: string) => void
  /** Avaliacao minima selecionada */
  selectedRating: number
  /** Define a avaliacao minima selecionada */
  setSelectedRating: (rating: number) => void
  /** Filtrar apenas abertos */
  showOpenOnly: boolean
  /** Define se deve filtrar apenas abertos */
  setShowOpenOnly: (show: boolean) => void
  /** Filtrar apenas favoritos */
  showFavoritesOnly: boolean
  /** Define se deve filtrar apenas favoritos */
  setShowFavoritesOnly: (show: boolean) => void
  /** Cidade selecionada */
  selectedCity: string
  /** Define a cidade selecionada */
  setSelectedCity: (city: string) => void
  /** Tipo de comida selecionado */
  selectedFoodType: string
  /** Define o tipo de comida selecionado */
  setSelectedFoodType: (foodType: string) => void
  /** Bairro selecionado */
  selectedNeighborhood: string
  /** Define o bairro selecionado */
  setSelectedNeighborhood: (neighborhood: string) => void
  /** Tipo selecionado */
  selectedType: string
  /** Define o tipo selecionado */
  setSelectedType: (type: string) => void
  /** Limpa todos os filtros */
  clearFilters: () => void
  /** Filtra uma lista de restaurantes com base nos filtros atuais */
  filterRestaurants: (
    restaurants: Restaurant[],
    isFavorite?: (id: string) => boolean
  ) => Restaurant[]
}

/**
 * Hook para gerenciar filtros de restaurantes
 */
export function useFilters(): UseFiltersReturn {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedPriceRange, setSelectedPriceRange] = useState('')
  const [selectedRating, setSelectedRating] = useState(0)
  const [showOpenOnly, setShowOpenOnly] = useState(false)
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedFoodType, setSelectedFoodType] = useState('')
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('')
  const [selectedType, setSelectedType] = useState('')

  const clearFilters = useCallback(() => {
    setSearchTerm('')
    setSelectedCategory('')
    setSelectedPriceRange('')
    setSelectedRating(0)
    setShowOpenOnly(false)
    setShowFavoritesOnly(false)
    setSelectedCity('')
    setSelectedFoodType('')
    setSelectedNeighborhood('')
    setSelectedType('')
  }, [])

  const filterRestaurants = useCallback(
    (
      restaurants: Restaurant[],
      isFavorite?: (id: string) => boolean
    ): Restaurant[] => {
      return restaurants.filter((restaurant) => {
        // Filtro por termo de busca
        if (searchTerm) {
          const search = searchTerm.toLowerCase()
          const matchesSearch =
            restaurant.name.toLowerCase().includes(search) ||
            restaurant.category.toLowerCase().includes(search) ||
            restaurant.description.toLowerCase().includes(search) ||
            restaurant.tags.some((tag) => tag.toLowerCase().includes(search))
          if (!matchesSearch) return false
        }

        // Filtro por categoria
        if (selectedCategory && selectedCategory !== 'all') {
          if (restaurant.category !== selectedCategory) return false
        }

        // Filtro por faixa de preco
        if (selectedPriceRange && selectedPriceRange !== 'all') {
          if (restaurant.priceRange !== selectedPriceRange) return false
        }

        // Filtro por avaliacao minima
        if (selectedRating && selectedRating > 0) {
          if (restaurant.rating < selectedRating) return false
        }

        // Filtro por abertos agora
        if (showOpenOnly) {
          if (!restaurant.isOpen) return false
        }

        // Filtro por favoritos
        if (showFavoritesOnly && isFavorite) {
          if (!isFavorite(restaurant.id)) return false
        }

        // Filtro por cidade
        if (selectedCity && selectedCity !== 'all') {
          if (restaurant.city !== selectedCity) return false
        }

        // Filtro por tipo de comida
        if (selectedFoodType && selectedFoodType !== 'all') {
          if (restaurant.foodType !== selectedFoodType) return false
        }

        // Filtro por bairro
        if (selectedNeighborhood && selectedNeighborhood !== 'all') {
          if (restaurant.neighborhood !== selectedNeighborhood) return false
        }

        // Filtro por tipo
        if (selectedType && selectedType !== 'all') {
          if (restaurant.type !== selectedType) return false
        }

        return true
      })
    },
    [
      searchTerm,
      selectedCategory,
      selectedPriceRange,
      selectedRating,
      showOpenOnly,
      showFavoritesOnly,
      selectedCity,
      selectedFoodType,
      selectedNeighborhood,
      selectedType,
    ]
  )

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedPriceRange,
    setSelectedPriceRange,
    selectedRating,
    setSelectedRating,
    showOpenOnly,
    setShowOpenOnly,
    showFavoritesOnly,
    setShowFavoritesOnly,
    selectedCity,
    setSelectedCity,
    selectedFoodType,
    setSelectedFoodType,
    selectedNeighborhood,
    setSelectedNeighborhood,
    selectedType,
    setSelectedType,
    clearFilters,
    filterRestaurants,
  }
}
