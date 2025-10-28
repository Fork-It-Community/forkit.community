import type { AssetImageConfig } from "@bearstudio/astro-dynamic-assets";
import { saveTheDate } from "./_save-the-date";

export const config: AssetImageConfig = {
  width: 1080,
  height: 1080,
};

export default saveTheDate(config);
