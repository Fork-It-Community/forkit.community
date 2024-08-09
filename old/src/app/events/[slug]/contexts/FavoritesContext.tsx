"use client";

import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import Favorite, { Favorites } from "@/app/events/services/Favorite";
import { Event, Talk } from "@/content/collections";

type FavoritesContextType = {
  favorites: Favorites;
  addFavorite: (talkSlug: Talk["metadata"]["slug"]) => void;
  removeFavorite: (talkSlug: Talk["metadata"]["slug"]) => void;
  eventSlug: Event["metadata"]["slug"];
};

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  eventSlug: "",
});

export const useFavoriteContext = () => {
  const ctx = useContext(FavoritesContext);

  if (!ctx) {
    throw new Error(
      "useFavoritesContext should be in a FavoritesContextProvider",
    );
  }

  return ctx;
};

export const FavoritesContextProvider = ({
  eventSlug,
  children,
}: PropsWithChildren & { eventSlug: Event["metadata"]["slug"] }) => {
  const [favorites, setFavorites] = useState<Favorites>([]);

  useEffect(() => {
    setFavorites(Favorite.getFavorites(eventSlug));
  }, [eventSlug, setFavorites]);

  const addFavorite = useCallback(
    (talkSlug: Talk["metadata"]["slug"]) => {
      Favorite.addFavorite(eventSlug, talkSlug);

      setFavorites(Favorite.getFavorites(eventSlug));
    },
    [eventSlug],
  );

  const removeFavorite = useCallback(
    (talkSlug: Talk["metadata"]["slug"]) => {
      Favorite.removeFavorite(eventSlug, talkSlug);

      setFavorites(Favorite.getFavorites(eventSlug));
    },
    [eventSlug],
  );

  const value = useMemo(
    () => ({
      favorites,
      addFavorite,
      removeFavorite,
      eventSlug,
    }),
    [addFavorite, eventSlug, favorites, removeFavorite],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
