import { Logo } from "@/components/Logo";
import { getEventDisplayDate, getEventDisplayType } from "@/lib/events";
import {
  COLORS,
  generateImageMethods,
  getAstroImageBase64,
} from "@/dynamic-images/utils";
import { getEventStaticPaths } from "./_utils";
import { Frame } from "@/dynamic-images/components/Frame";
import { BgImage } from "@/dynamic-images/components/BgImage";

export default generateImageMethods({
  width: 1920,
  height: 1080,
  getStaticPaths: getEventStaticPaths,
  render: async (props) => {
    const postCover = await getAstroImageBase64(props.event.data.image.media);
    return (
      <Frame {...props.dynamicImage} style={{ padding: 128 }}>
        <BgImage
          src={postCover}
          width={props.dynamicImage.width}
          height={props.dynamicImage.height}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 128,
            width: "100%",
            justifyContent: "center",
            fontFamily: "Tomorrow",
            color: COLORS.white,
            zIndex: 100,
          }}
        >
          <Logo style={{ width: 169 * 3, height: 18 * 3 }} />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <div
              style={{
                fontSize: 32,
                fontWeight: 500,
                textTransform: "uppercase",
                opacity: 0.6,
                letterSpacing: 4,
              }}
            >
              {getEventDisplayType(props.event.data.type)}
            </div>
            <div
              style={{
                fontSize: 132,
                fontWeight: 500,
                marginLeft: -6, // Visual alignment
              }}
            >
              {getEventDisplayDate(props.event)}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 80,
                fontWeight: 500,
                color: COLORS.primary,
                marginTop: -16,
                marginLeft: -2, // Visual alignment
              }}
            >
              {props.event.data.city}, {props.event.data.country}
            </div>
          </div>
        </div>
      </Frame>
    );
  },
});
