'use client'

import { useState, useEffect, useCallback } from 'react'

const FAVORITES_STORAGE_KEY = 'smart-restaurantes-favorites'

interface UseFavoritesReturn {
  /** Lista de IDs dos restaurantes favoritos */
  favorites: string[]
  /** Adiciona um restaurante aos favoritos */
  addFavorite: (id: string) => void
  /** Remove um restaurante dos favoritos */
  removeFavorite: (id: string) => void
  /** Alterna o estado de favorito de um restaurante */
  toggleFavorite: (id: string) => void
  /** Verifica se um restaurante esta nos favoritos */
  isFavorite: (id: string) => boolean
}

/**
 * Hook para gerenciar restaurantes favoritos
 * Persiste os favoritos no localStorage
 */
export function useFavorites(): UseFavoritesReturn {
  const [favorites, setFavorites] = useState<string[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  // Carrega favoritos do localStorage na inicializacao
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          setFavorites(parsed)
        }
      }
    } catch (error) {
      console.error('Erro ao carregar favoritos do localStorage:', error)
    }
    setIsInitialized(true)
  }, [])

  // Salva favoritos no localStorage quando mudam
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites))
      } catch (error) {
        console.error('Erro ao salvar favoritos no localStorage:', error)
      }
    }
  }, [favorites, isInitialized])

  const addFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      if (prev.includes(id)) {
        return prev
      }
      return [...prev, id]
    })
  }, [])

  const removeFavorite = useCallback((id: string) => {
    setFavorites((prev) => prev.filter((favId) => favId !== id))
  }, [])

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      if (prev.includes(id)) {
        return prev.filter((favId) => favId !== id)
      }
      return [...prev, id]
    })
  }, [])

  const isFavorite = useCallback(
    (id: string): boolean => {
      return favorites.includes(id)
    },
    [favorites]
  )

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
  }
}
