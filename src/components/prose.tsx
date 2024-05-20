import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export const Prose = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={cn(
        "prose prose-sm prose-invert mx-auto p-6 md:prose-base prose-headings:scroll-m-10 prose-headings:font-heading prose-headings:text-primary prose-h3:flex prose-h3:items-center prose-h3:gap-2 prose-h3:font-bold prose-h3:text-white",
        props.className,
      )}
    />
  );
};
