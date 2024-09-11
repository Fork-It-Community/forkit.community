import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const tagVariants = cva(
  "inline-flex items-center rounded-lg px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-neutral-900/40 text-neutral-100",
        primary:
          "border-transparent bg-primary/40 text-primary-foreground",
        secondary:
          "border-transparent bg-secondary/40 text-secondary-foreground",
        destructive:
          "border-transparent bg-destructive/40 text-destructive-foreground",
        outline: "text-foreground border border-foreground/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface TagProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tagVariants> {}

  function Tag({ className, variant, ...props }: TagProps) {
    return (
      <div className={cn(tagVariants({ variant }), className)} {...props} />
    );
  }

export { Tag, tagVariants };