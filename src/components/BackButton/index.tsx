import type { ReactNode } from "react";

import { MdArrowBack } from "react-icons/md";

import { Button } from "@/components/ui/button";

export const BackButton = (props: {
  href: string;
  buttonLabel?: ReactNode;
  contextLabel?: ReactNode;
}) => {
  return (
    <div className="flex items-center gap-4">
      <Button asChild variant="secondary-dark" size="xs">
        <a
          href={props.href}
          onClick={(e) => {
            if (
              window.history.length > 1 &&
              document.referrer.indexOf(window.location.host) !== -1
            ) {
              e.preventDefault();
              window.history.back();
            }
          }}
        >
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
