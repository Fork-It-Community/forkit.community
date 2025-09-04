import { IoMail } from "react-icons/io5";
import type { IconType } from "react-icons/lib";
import { LuMessageCircle } from "react-icons/lu";

type channelsType = "newsletter" | "whatsapp";

export const channels: Array<{
  type: channelsType;
  icon: IconType;
}> = [
  {
    type: "newsletter",
    icon: LuMessageCircle,
  },
  {
    type: "whatsapp",
    icon: IoMail,
  },
];
