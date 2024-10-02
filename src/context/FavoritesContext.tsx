import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type PropsWithChildren,
} from "react";

import Favorite, { type Favorites } from "@/services/Favorite";
import type { Event } from "@/content/events/events";
import type { Talk } from "@/content/talks/talks";

type FavoritesContextType = {
  favorites: Favorites;
  addFavorite: (talkSlug: Talk) => void;
  removeFavorite: (talkSlug: Talk) => void;
  eventSlug: Event;
};

const initEventSlug: Event = {
  title: "",
  name: "",
  date: new Date(),
  location: {
    name: "",
    address: "",
  },
  status: "EventCancelled",
  sponsoringLevels: [],
  attendanceMode: "OfflineEventAttendanceMode",
  schedule: [],
  subPages: [],
};

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  eventSlug: initEventSlug,
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
}: PropsWithChildren & { eventSlug: Event }) => {
  const [favorites, setFavorites] = useState<Favorites>([]);

  useEffect(() => {
    setFavorites(Favorite.getFavorites(eventSlug));
  }, [eventSlug, setFavorites]);

  const addFavorite = useCallback(
    (talkSlug: Talk) => {
      Favorite.addFavorite(eventSlug, talkSlug);

      setFavorites(Favorite.getFavorites(eventSlug));
    },
    [eventSlug],
  );

  const removeFavorite = useCallback(
    (talkSlug: Talk) => {
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
