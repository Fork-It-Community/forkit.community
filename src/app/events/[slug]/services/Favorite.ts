import { Talk } from "@/content/collections";
const isBrowser: boolean = typeof window !== "undefined";

//TODO : add the event slug instead of "rouen"
const FAVORITE_KEY = `forkit-favorite-rouen`;

export type Favorites = Array<Talk>;

export default class Favorite {
  /**
   * Get the favorites stored in local storage
   *
   * @returns {Array<String>}
   */
  static getFavorites = (): Favorites => {
    if (isBrowser) {
      const favorites = localStorage.getItem(FAVORITE_KEY);

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
  static setFavorites = (favorites: Favorites) => {
    localStorage.setItem(FAVORITE_KEY, JSON.stringify(favorites));
  };

  /**
   * Add the conference in the favorites.
   *
   * @param {string} talk The identifier of the conference.
   */
  static addFavorite = (talk: Talk) => {
    const favorites = Favorite.getFavorites();

    // If it is already a favorite, we do not add it again.
    if (favorites.includes(talk)) {
      return;
    }

    favorites.push(talk);

    Favorite.setFavorites(favorites);
  };

  /**
   * Check if the conference matching the identifier is a favorite.
   *
   * @param {string} id The identifier of the conference.
   */
  static isFavorite = (talk: Talk) => {
    return Favorite.getFavorites().includes(talk);
  };

  /**
   * Remove the conference matching identifier from the favorites.
   *
   * @param {string} id The identifier of the conference.
   */
  static removeFavorite = (talk: Talk) => {
    const favorites = Favorite.getFavorites();

    const newFavorites = favorites.filter((favorite) => favorite !== talk);

    Favorite.setFavorites(newFavorites);
  };
}
