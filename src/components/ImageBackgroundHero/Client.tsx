import type { ReactNode } from "react";

import { useWindowSize } from "@uidotdev/usehooks";
import { motion, useScroll, useTransform } from "motion/react";

export const Client = (props: {
  children?: ReactNode;
  defaultBlur?: boolean;
}) => {
  const { scrollY } = useScroll();
  const { height } = useWindowSize();
  const windowHeightRange = [0, height ?? 0];

  const yValue = useTransform(scrollY, windowHeightRange, [0, -200]);
  const opacityValue = useTransform(scrollY, windowHeightRange, [1, 0.5]);
  const scaleValue = useTransform(
    scrollY,
    windowHeightRange,
    props.defaultBlur ? [1.1, 1.3] : [1, 1.1],
  );
  const blurValue = useTransform(
    scrollY,
    windowHeightRange,
    props.defaultBlur ? [10, 60] : [0, 50],
  );
  const blurFilter = useTransform(
    blurValue,
    (value) => `blur(${Math.round(value)}px)`,
  );

  return (
    <motion.div
      style={{
        filter: blurFilter,
        y: yValue,
        opacity: opacityValue,
        scale: scaleValue,
      }}
      className="absolute inset-0"
    >
      {props.children}
    </motion.div>
  );
};
