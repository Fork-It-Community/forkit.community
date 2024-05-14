import React, {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import Favorite, { Favorites } from "@/app/events/[slug]/services/Favorite";
import { Talk } from "@/content/collections";

type FavoritesContextType = {
  favorites: Favorites;
  addFavorite: (talk: Talk) => void;
  removeFavorite: (talk: Talk) => void;
};

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
});
export const useFavoriteContext = () => useContext(FavoritesContext);

export const FavoritesContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Favorites>([]);

  useEffect(() => {
    setFavorites(Favorite.getFavorites());
  }, [setFavorites]);

  const addFavorite = (talk: Talk) => {
    Favorite.addFavorite(talk);

    setFavorites(Favorite.getFavorites());
  };

  const removeFavorite = (talk: Talk) => {
    Favorite.removeFavorite(talk);

    setFavorites(Favorite.getFavorites());
  };

  const value = useMemo(
    () => ({
      favorites,
      addFavorite,
      removeFavorite,
    }),
    [favorites],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
