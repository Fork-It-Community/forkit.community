import { LogoIcon } from "@/components/LogoIcon";
import {
  getAstroImageBase64,
  type AssetImageConfig,
} from "@/generated-assets/image";
import { COLORS } from "@/generated-assets/theme";
import worldImage from "@/assets/images/world.png";
import { getImage } from "astro:assets";

export const CfpCoverNoFlag = async (props: { config: AssetImageConfig }) => {
  const worldImageResult = await getImage({
    format: worldImage.format,
    src: worldImage,
  });

  const defaultBackgroundImage = {
    src: worldImageResult.src,
    width: worldImage.width,
    height: worldImage.height,
    format: worldImage.format,
  };

  const noFlagImage = await getAstroImageBase64(defaultBackgroundImage);

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
