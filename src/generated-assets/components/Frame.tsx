import { COLORS } from "@/generated-assets/theme";
import type { CSSProperties, ReactNode } from "react";

export const Frame = ({
  width,
  height,
  style,
  children,
}: {
  children: ReactNode;
  width: number;
  height: number;
  style?: CSSProperties | undefined;
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Tomorrow",
        backgroundColor: COLORS.background,
        color: COLORS.white,
        width,
        height,
        boxSizing: "border-box",
        position: "relative",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
