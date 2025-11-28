import type { AssetImageConfig } from "@/generated-assets/image";
import { cfpStillOpen } from "@/pages/events/[id]/assets/_cfp-still-open";

export const config: AssetImageConfig = {
  width: 1080,
  height: 1350,
};

export default cfpStillOpen({ ...config, fontScaling: 0.7 });
