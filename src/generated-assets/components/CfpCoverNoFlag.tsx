import { LogoIcon } from "@/components/LogoIcon";
import type { AssetImageConfig } from "@/generated-assets/image";
import { COLORS } from "@/generated-assets/theme";

export const CfpCoverNoFlag = (props: {
  image: string;
  config: AssetImageConfig;
}) => {
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
        src={props.image}
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          objectFit: "cover",
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
