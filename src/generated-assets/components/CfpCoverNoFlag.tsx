import { LogoIcon } from "@/components/LogoIcon";
import { COLORS } from "@/generated-assets/theme";

export const CfpCoverNoFlag = (props: { image: string; config: any }) => {
  return (
    <div
      style={{
        display: "flex",
        position: "absolute",
        top: 0,
        left: 0,
        width: props.config.width,
        height: props.config.height,
        objectFit: "cover",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={props.image}
        alt=""
        style={{
          position: "absolute",
        }}
      />

      <LogoIcon
        style={{
          width: 118 * 6,
          height: 82 * 6,
          color: COLORS.primary,
          inset: 0,
          margin: 30,
        }}
      />
    </div>
  );
};
