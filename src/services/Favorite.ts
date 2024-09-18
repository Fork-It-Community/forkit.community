import type { Event } from "@/content/events/events";
import type { Talk } from "@/content/talks/talks";
const isBrowser: boolean = typeof window !== "undefined";

const FORK_IT_FAVORITE_KEY = "forkit-";

export type Favorites = Array<Talk>

export default class Favorite {
  /**
   * Get the favorites stored in local storage
   */
  static getFavorites = (eventSlug: Event): Favorites => {
    if (isBrowser) {
      const favorites = localStorage.getItem(
        `${FORK_IT_FAVORITE_KEY}${eventSlug}`,
      );

      if (favorites) {
        return JSON.parse(favorites);
      } else {
        return [];
      }
    }

    return [];
  };
  
  /**
   * Save a the list of favorites.
   *
   * @param {Array<string>} favorites The list of favorites to save.
   */
  static setFavorites = (eventSlug: Event, favorites: Favorites) => {
    localStorage.setItem(
      `${FORK_IT_FAVORITE_KEY}${eventSlug}`,
      JSON.stringify(favorites),
    );
  };

  static addFavorite = (
    eventSlug: Event,
    talkSlug: Talk
  ) => {
    const favorites = Favorite.getFavorites(eventSlug);

    // If it is already a favorite, we do not add it again.
    if (favorites.includes(talkSlug)) {
      return;
    }

    favorites.push(talkSlug);

    Favorite.setFavorites(eventSlug, favorites);
  };
  
  /**
   * Check if the conference matching the identifier is a favorite.
   */
  static isFavorite = (
    eventSlug: Event,
    talkSlug: Talk
  ) => {
    const favorites = Favorite.getFavorites(eventSlug);
  
    const favoriteTitles = favorites.map((favorite) => favorite?.title);
    const talkTitles = talkSlug?.title;

    return favoriteTitles.includes(talkTitles);
  };

  static removeFavorite = (
    eventSlug: Event,
    talkSlug: Talk
  ) => {
    const favorites = Favorite.getFavorites(eventSlug);
    const newFavorites = favorites.filter((favorite) => favorite?.title !== talkSlug?.title);

    Favorite.setFavorites(eventSlug, newFavorites);
  };
}