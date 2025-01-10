import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";
import { MdArrowBack } from "react-icons/md";

export const BackButton = (props: { href: string; children?: ReactNode }) => {
  return (
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
        <MdArrowBack className="mr-2" /> {props.children ?? "Back"}
      </a>
    </Button>
  );
};
