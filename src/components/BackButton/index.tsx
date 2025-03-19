import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";
import { MdArrowBack } from "react-icons/md";
import { useEffect, useState } from "react";

export const BackButton = (props: {
  href: string;
  buttonLabel?: ReactNode;
  contextLabel?: ReactNode;
}) => {
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    const checkBackNavigation = () => {
      setCanGoBack(window.history.length > 1);
    };

    checkBackNavigation();
    document.addEventListener("astro:page-load", checkBackNavigation);

    return () => {
      document.removeEventListener("astro:page-load", checkBackNavigation);
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (canGoBack) {
      e.preventDefault();
      window.history.back();
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Button asChild variant="secondary-dark" size="xs">
        <a href={props.href} onClick={handleClick}>
          <MdArrowBack className="mr-2" /> {props.buttonLabel ?? "Back"}
        </a>
      </Button>
      {!!props.contextLabel && (
        <a
          href={props.href}
          className="text-xs font-medium uppercase tracking-widest opacity-60 transition hover:opacity-100"
        >
          {props.contextLabel}
        </a>
      )}
    </div>
  );
};
