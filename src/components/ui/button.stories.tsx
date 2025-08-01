import { Button, type ButtonProps } from "./button";

export default {
  component: Button,
};

export const Default = {
  args: {
    children: "Default",
  } satisfies ButtonProps,
};

export const Secondary = {
  args: {
    children: "Secondary",
    variant: "secondary",
  } satisfies ButtonProps,
};

export const Link = {
  args: {
    children: "Link",
    variant: "link",
  } satisfies ButtonProps,
};

export const LinkNeutral = {
  args: {
    children: "Link Neutral",
    variant: "link-neutral",
  } satisfies ButtonProps,
};
