import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";
import { MdArrowBack } from "react-icons/md";
import { useEffect } from "react";

const VISITED_PATHS_KEY = "visited-paths";

export const BackButton = (props: {
  href: string;
  buttonLabel?: ReactNode;
  contextLabel?: ReactNode;
}) => {
  useEffect(() => {
    const currentPath = window.location.pathname;
    const storedPaths = sessionStorage.getItem(VISITED_PATHS_KEY);
    const visitedPaths = storedPaths ? JSON.parse(storedPaths) : [];

    if (!visitedPaths.includes(currentPath)) {
      visitedPaths.push(currentPath);
      sessionStorage.setItem(VISITED_PATHS_KEY, JSON.stringify(visitedPaths));
    }
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const referrer = document.referrer;
    const hasReferrer = !!referrer && referrer.includes(window.location.host);
    const hasHistory = window.history.length > 1;

    const storedPaths = sessionStorage.getItem(VISITED_PATHS_KEY);
    const visitedPaths = storedPaths ? JSON.parse(storedPaths) : [];
    const hasVisitedPaths = visitedPaths.length > 1;

    if (hasHistory && (hasReferrer || hasVisitedPaths)) {
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
