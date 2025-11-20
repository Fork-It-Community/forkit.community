import type { AssetImageConfig } from "@/generated-assets/image";
import { cfpOpen } from "@/pages/events/[id]/assets/_cfp_open";

export const config: AssetImageConfig = {
  width: 1080,
  height: 1350,
};

export default cfpOpen({ ...config, fontScaling: 0.7 });
