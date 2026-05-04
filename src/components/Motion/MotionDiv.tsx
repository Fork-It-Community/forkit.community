import { motion, type HTMLMotionProps } from "motion/react";

export const MotionDiv = (props: HTMLMotionProps<"div">) => (
  <motion.div {...props} />
);
