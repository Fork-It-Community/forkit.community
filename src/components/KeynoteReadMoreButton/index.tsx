import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils-client";
import { useEffect, useState } from "react";
import { MdArrowForward } from "react-icons/md";

interface Props {
  href: string;
  targetId: string;
}

export const KeynoteReadMoreButton = ({ href, targetId }: Props) => {
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;

    const checkOverflow = () => {
      setIsOverflowing(target.scrollHeight > target.clientHeight + 1);
    };

    checkOverflow();
    document.fonts?.ready.then(checkOverflow);

    const observer = new ResizeObserver(checkOverflow);
    observer.observe(target);

    return () => observer.disconnect();
  }, [targetId]);

  if (!isOverflowing) return null;

  return (
    <a
      href={href}
      className={cn(
        buttonVariants({ variant: "link-neutral", size: "sm" }),
        "w-fit gap-2 px-0",
      )}
    >
      Read more
      <MdArrowForward />
    </a>
  );
};
