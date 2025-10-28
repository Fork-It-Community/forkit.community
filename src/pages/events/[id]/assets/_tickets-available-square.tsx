import type { AssetImageConfig } from "@bearstudio/astro-dynamic-assets";
import { ticketsAvailable } from "./_tickets-available";

export const config: AssetImageConfig = {
  width: 1080,
  height: 1080,
};

export default ticketsAvailable({ ...config, fontScaling: 0.7 });
