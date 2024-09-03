
import { type FC, type MouseEvent, useState } from "react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { Heart, HeartOff } from "lucide-react";

type FavoriteButtonProps = ButtonProps & {
  isIconButton?: boolean;
};

export const FavoriteButton: FC<FavoriteButtonProps> = ({
  isIconButton,
  ...rest
}) => {
  // const { addFavorite, removeFavorite, eventSlug } = useFavoriteContext();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (isFavorite) {
      setIsFavorite(false);
    } else {
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
