"use client";

import { FC, useEffect, useState } from "react";

import { Button, ButtonProps } from "@/components/ui/button";
import { Heart } from "lucide-react";

import { useFavoriteContext } from "@/app/events/[slug]/contexts/FavoritesContext";
import Favorite from "@/app/events/services/Favorite";
import { Talk } from "@/content/collections";

type FavoriteButtonProps = ButtonProps & {
  talkSlug: Talk["metadata"]["slug"];
};

export const FavoriteButton: FC<FavoriteButtonProps> = ({
  talkSlug,
  ...rest
}) => {
  const { addFavorite, removeFavorite, eventSlug } = useFavoriteContext();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(Favorite.isFavorite(eventSlug, talkSlug));
  }, [eventSlug, talkSlug]);

  const handleOnClick = () => {
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
      <Heart />
      {/* {isFavorite ? "Remove from favorites" : "Add to favorites"} */}
    </Button>
  );
};
