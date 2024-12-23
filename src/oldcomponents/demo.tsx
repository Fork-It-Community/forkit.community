import type { ReactNode } from "react";

export type DemoProps = { children: ReactNode };

export const Demo = ({ children }: DemoProps) => {
  return <div className="not-prose">{children}</div>;
};
