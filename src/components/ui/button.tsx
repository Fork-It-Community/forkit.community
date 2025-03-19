import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils-client";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-white/5 text-white hover:bg-white/10",
        "secondary-dark":
          "bg-black/40 text-white/80 hover:bg-black hover:text-foreground",
        link: "text-primary text-sm underline-offset-4 p-0 hover:underline",
        "link-neutral":
          "text-white text-sm underline-offset-4 p-0 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2 text-sm",
        xs: "h-7 rounded-md px-2.5 text-xs",
        sm: "h-9 rounded-md px-3 text-sm",
        lg: "h-11 rounded-md px-6 text-sm",
        icon: "h-10 w-10",
      },
    },
    compoundVariants: [
      {
        variant: "link",
        className: "p-0 h-auto",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
