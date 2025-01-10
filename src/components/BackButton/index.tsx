import { Button } from "@/components/ui/button";
import { MdArrowBack } from "react-icons/md";

export const BackButton = (props: { href: string }) => {
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
        <MdArrowBack className="mr-2" /> Back
      </a>
    </Button>
  );
};
