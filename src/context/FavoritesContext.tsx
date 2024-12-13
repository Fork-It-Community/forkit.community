import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type PropsWithChildren,
} from "react";

import Favorite, {
  type Favorites,
  type EventSlug,
  type TalkSlug,
} from "@/services/Favorite";

type FavoritesContextType = {
  favorites: Favorites;
  addFavorite: (talkSlug: TalkSlug) => void;
  removeFavorite: (talkSlug: TalkSlug) => void;
  eventSlug: EventSlug;
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
}: PropsWithChildren & {
  eventSlug: EventSlug;
}) => {
  const [favorites, setFavorites] = useState<Favorites>([]);

  useEffect(() => {
    setFavorites(Favorite.getFavorites(eventSlug));
  }, [eventSlug, setFavorites]);

  const addFavorite = useCallback(
    (talkSlug: TalkSlug) => {
      Favorite.addFavorite(eventSlug, talkSlug);

      setFavorites(Favorite.getFavorites(eventSlug));
    },
    [eventSlug],
  );

  const removeFavorite = useCallback(
    (talkSlug: TalkSlug) => {
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
