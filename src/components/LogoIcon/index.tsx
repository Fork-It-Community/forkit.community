import type { SVGProps } from "react";

export const LogoIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 27 18" fill="none" {...props}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M14.742 18V6.89L3.39 18 .5 15.179 11.855 4.064H.5V0h15.808l2.58 2.526V18z"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      d="M26.954 0h-4.032v10.895h4.032zM26.954 14.053h-4.032V18h4.032z"
    />
  </svg>
);
