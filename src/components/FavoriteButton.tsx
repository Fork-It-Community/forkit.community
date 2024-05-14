"use client";

import { FC, useEffect, useState } from "react";

import { Button, ButtonProps } from "@/components/ui/button";
import { Heart } from "lucide-react";

import { useFavoriteContext } from "@/app/events/[slug]/contexts/FavoritesContext";
import Favorite from "@/app/events/[slug]/services/Favorite";
import { Talk } from "@/content/collections";

type FavoriteButtonProps = ButtonProps & {
  talk: Talk;
};

export const FavoriteButton: FC<FavoriteButtonProps> = ({ talk, ...rest }) => {
  const { addFavorite, removeFavorite } = useFavoriteContext();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(Favorite.isFavorite(talk));
  }, [talk]);

  const handleOnClick = () => {
    if (isFavorite) {
      removeFavorite(talk);
      setIsFavorite(false);
    } else {
      addFavorite(talk);
      setIsFavorite(true);
    }
  };

  return (
    <Button
      color="pink"
      variant={isFavorite ? "default" : "outline"}
      onClick={handleOnClick}
      {...rest}
    >
      <Heart />
      {isFavorite ? "Remove from favorites" : "Add to favorites"}
    </Button>
  );
};
