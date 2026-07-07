import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loadFavoriteIds, saveFavoriteIds } from "../services/storage";

type FavoritesContextType = {
  favoriteIds: string[];
  isLoading: boolean;
  isFavorite: (idMeal: string) => boolean;
  toggleFavorite: (idMeal: string) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadFavorites() {
      const storedFavorites = await loadFavoriteIds();
      setFavoriteIds(storedFavorites);
      setIsLoading(false);
    }

    loadFavorites();
  }, []);

  const toggleFavorite = (idMeal: string) => {
    setFavoriteIds((currentFavorites) => {
      const isFavorite = currentFavorites.includes(idMeal);
      const nextFavorites = isFavorite
        ? currentFavorites.filter((fav) => fav !== idMeal)
        : [...currentFavorites, idMeal];

      void saveFavoriteIds(nextFavorites);
      return nextFavorites;
    });
  };

  const value = useMemo(
    () => ({
      favoriteIds,
      isLoading,
      isFavorite: (idMeal: string) => favoriteIds.includes(idMeal),
      toggleFavorite,
    }),
    [favoriteIds, isLoading]
  );

  return (
    <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used inside a FavoritesProvider");
  }

  return context;
}
