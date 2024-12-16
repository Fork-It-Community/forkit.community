import type { CollectionEntry } from "astro:content";

const isBrowser: boolean = typeof window !== "undefined";

const FORK_IT_FAVORITE_KEY = "forkit-";
// Added "" as a valid type for eventSlug initialization in FavoritesContext.
export type EventSlug = CollectionEntry<"events">["slug"] | "";
export type TalkSlug = CollectionEntry<"talk">["slug"];
export type Favorites = Array<TalkSlug>;

export default class Favorite {
  /**
   * Get the favorites stored in local storage
   */
  static getFavorites = (eventSlug: EventSlug): Favorites => {
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
  static setFavorites = (eventSlug: EventSlug, favorites: Favorites) => {
    localStorage.setItem(
      `${FORK_IT_FAVORITE_KEY}${eventSlug}`,
      JSON.stringify(favorites),
    );
  };

  /**
   * Add the conference in the favorites.
   */
  static addFavorite = (eventSlug: EventSlug, talkSlug: TalkSlug) => {
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
  static isFavorite = (eventSlug: EventSlug, talkSlug: TalkSlug) => {
    return Favorite.getFavorites(eventSlug).includes(talkSlug);
  };

  /**
   * Remove the conference matching identifier from the favorites.
   */
  static removeFavorite = (eventSlug: EventSlug, talkSlug: TalkSlug) => {
    const favorites = Favorite.getFavorites(eventSlug);

    const newFavorites = favorites.filter((favorite) => favorite !== talkSlug);

    Favorite.setFavorites(eventSlug, newFavorites);
  };
}
