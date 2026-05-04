import "react";

declare module "react" {
  interface HTMLAttributes<T> {
    tw?: string | undefined;
  }
  interface SVGAttributes<T> {
    tw?: string | undefined;
  }
}
