import { type AssetImageConfig } from "@/generated-assets/image";
import { registrationStillOpen } from "./_registration-still-open";

export const config: AssetImageConfig = {
  width: 1080,
  height: 1350,
};

export default registrationStillOpen({ ...config, fontScaling: 0.7 });
