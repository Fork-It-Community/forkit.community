import {
  COLORS,
  generateImageMethods,
  getAstroImageBase64,
} from "@/dynamic-images/utils";
import { getEventPartnerStaticPaths } from "./_utils";
import { Frame } from "@/dynamic-images/components/Frame";
import { BgImage } from "@/dynamic-images/components/BgImage";
import { shouldBuildEventImage } from "@/pages/events/[id]/dynamic-images/_utils";
import { Logo } from "@/components/Logo";
import { getEventDisplayDate } from "@/lib/events";

export default generateImageMethods({
  width: 1080,
  height: 1080,
  shouldBuild: shouldBuildEventImage,
  getStaticPaths: getEventPartnerStaticPaths,
  render: async (props) => {
    const postCover = await getAstroImageBase64(props.event.data.image.media);
    const partnerLogo = await getAstroImageBase64(
      props.partner.data.logos.bgWhite,
    );

    return (
      <Frame {...props.dynamicImage} style={{ padding: 64 }}>
        <BgImage
          src={postCover}
          width={props.dynamicImage.width}
          height={props.dynamicImage.height}
        />

        <div
          style={{
            zIndex: 100,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              flexDirection: "column",
              flex: 0.8,
              gap: 16,
            }}
          >
            <div
              style={{
                fontSize: 24,
                fontWeight: 500,
                lineHeight: 1.2,
                color: COLORS.white,
                textWrap: "balance",
                textTransform: "uppercase",
                textAlign: "center",
                letterSpacing: 4,
              }}
            >
              Thanks to
            </div>
            <div
              style={{
                fontSize: 80,
                fontWeight: 500,
                lineHeight: 1.1,
                color: COLORS.primary,
                textAlign: "center",
              }}
            >
              {props.partner.data.name}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 40,
                fontWeight: 500,
                lineHeight: 1.2,
                color: COLORS.white,
                textWrap: "balance",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                textTransform: "uppercase",
                letterSpacing: 4,
              }}
            >
              For supporting the Community
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              gap: 48,
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 24,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  background: COLORS.white,
                  color: COLORS.background,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 12,
                  padding: 12,
                  overflow: "hidden",
                }}
              >
                <img src={partnerLogo} width="100%" />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: 64,
                  opacity: 0.2,
                }}
              >
                &times;
              </div>
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  background: COLORS.black,
                  color: COLORS.white,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 12,
                  padding: 12,
                  overflow: "hidden",
                }}
              >
                <Logo width={360} />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                columnGap: 48,
                rowGap: 24,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  fontSize: 40,
                  fontWeight: 500,
                  lineHeight: 1,
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  style={{
                    flex: "none",
                    opacity: 0.6,
                    width: "1em",
                    height: "1em",
                  }}
                >
                  <path
                    fill="currentColor"
                    d="M19 19H5V8h14m-3-7v2H8V1H6v2H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-1V1m-1 11h-5v5h5z"
                  />
                </svg>
                {getEventDisplayDate(props.event)}
              </div>

              {!!props.event.data.location?.name && (
                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "center",
                    fontSize: 40,
                    fontWeight: 500,
                    lineHeight: 1.2,
                    textWrap: "balance",
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    style={{
                      flex: "none",
                      opacity: 0.6,
                      width: "1em",
                      height: "1em",
                    }}
                  >
                    <path
                      fill="currentColor"
                      d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7"
                    />
                  </svg>
                  {props.event.data.location.name}
                </div>
              )}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 32,
                fontWeight: 500,
                lineHeight: 1.2,
                textTransform: "uppercase",
                opacity: 0.6,
              }}
            >
              {props.event.data.city}, {props.event.data.country}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 32,
                fontWeight: 500,
                lineHeight: 1.2,
                textTransform: "uppercase",
                opacity: 0.6,
              }}
            >
              www.forkit.community
            </div>
          </div>
        </div>
      </Frame>
    );
  },
});
