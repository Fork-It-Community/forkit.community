
import { type FC, type MouseEvent, useState, useEffect } from "react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { Heart, HeartOff } from "lucide-react";

import { useFavoriteContext } from "@/context/FavoritesContext";
import Favorite from "@/services/Favorite";
import type { Talk } from "@/content/talks/talks";

type FavoriteButtonProps = ButtonProps & {
  talkSlug: Talk | undefined
  isIconButton?: boolean;
};

export const FavoriteButton: FC<FavoriteButtonProps> = ({
  talkSlug,
  isIconButton,
  ...rest
}) => {
  const { addFavorite, removeFavorite, eventSlug } = useFavoriteContext();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!talkSlug) return;
    setIsFavorite(Favorite.isFavorite(eventSlug, talkSlug));
  }, [eventSlug, talkSlug]);

  const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (!talkSlug) return;

    if (isFavorite) {
      removeFavorite(talkSlug);
      setIsFavorite(false);
    } else {
      addFavorite(talkSlug);
      setIsFavorite(true);
    }
  };

  return (
    <Button
      variant={isFavorite ? "default" : "outline"}
      onClick={handleOnClick}
      className="max-w-8 max-h-8"
      {...rest}
    >
      <div className="flex items-center gap-2">
        {isFavorite ? (
          <HeartOff className="h-3 w-3" aria-label="Remove from favorites" />
        ) : (
          <Heart className="h-3 w-3" aria-label="Add to favorites" />
        )}
        {!isIconButton &&
          (isFavorite ? "Remove from favorites" : "Add to favorites")}
      </div>
    </Button>
  );
};
