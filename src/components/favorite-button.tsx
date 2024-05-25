"use client";

import { FC, MouseEvent, useEffect, useState } from "react";

import { Button, ButtonProps } from "@/components/ui/button";
import { Heart, HeartOff } from "lucide-react";

import { useFavoriteContext } from "@/app/events/[slug]/contexts/FavoritesContext";
import Favorite from "@/app/events/services/Favorite";
import { Talk } from "@/content/collections";

type FavoriteButtonProps = ButtonProps & {
  talkSlug: Talk["metadata"]["slug"];
  isIconButton?: boolean;
};

export const FavoriteButton: FC<FavoriteButtonProps> = ({
  isIconButton,
  talkSlug,
  ...rest
}) => {
  const { addFavorite, removeFavorite, eventSlug } = useFavoriteContext();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(Favorite.isFavorite(eventSlug, talkSlug));
  }, [eventSlug, talkSlug]);

  const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    // We in a link such as a card or else
    e.stopPropagation();
    e.preventDefault();
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
      {...rest}
    >
      <div className="flex items-center gap-2">
        {isFavorite ? (
          <HeartOff className="h-6 w-6" />
        ) : (
          <Heart className="h-6 w-6" />
        )}
        {!isIconButton &&
          (isFavorite ? "Remove from favorites" : "Add to favorites")}
      </div>
    </Button>
  );
};
