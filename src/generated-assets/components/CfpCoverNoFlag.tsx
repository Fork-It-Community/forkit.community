import { LogoIcon } from "@/components/LogoIcon";
import { COLORS } from "@/generated-assets/theme";
import worldImage from "@/assets/images/world.png";
import type { AssetImageConfig } from "@bearstudio/astro-dynamic-assets";
import DynamicAssets from "@/lib/astro-dynamic-assets";
export const CfpCoverNoFlag = async (props: { config: AssetImageConfig }) => {
  const noFlagImage = await DynamicAssets.getAstroImageBase64(worldImage);

  return (
    <div
      style={{
        display: "flex",
        position: "absolute",
        top: 0,
        left: 0,
        width: props.config.width,
        height: props.config.height,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={noFlagImage}
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          objectFit: "cover",
          zIndex: 1,
        }}
      />

      <LogoIcon
        style={{
          width: 118 * 6,
          height: 82 * 6,
          color: COLORS.primary,
          inset: 0,
          margin: 30,
          zIndex: 10,
        }}
      />
    </div>
  );
};
