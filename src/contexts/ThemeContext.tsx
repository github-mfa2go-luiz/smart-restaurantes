'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  setDarkMode: (value: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'theme-preference';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  // Inicializa o tema do localStorage ou usa dark como padrão
  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);

    if (storedTheme !== null) {
      const prefersDark = storedTheme === 'dark';
      setIsDark(prefersDark);
    } else {
      // Dark mode como padrão
      setIsDark(true);
    }

    setMounted(true);
  }, []);

  // Atualiza a classe 'dark' no documento e persiste no localStorage
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem(THEME_STORAGE_KEY, 'light');
    }
  }, [isDark, mounted]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const setDarkMode = (value: boolean) => {
    setIsDark(value);
  };

  // Evita flash de conteúdo durante a hidratação
  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ isDark: true, toggleTheme: () => {}, setDarkMode: () => {} }}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }

  return context;
}

export default ThemeContext;
