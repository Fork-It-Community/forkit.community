import { Fragment } from "react";
import { Logo } from "@/components/Logo";
import { getEventDisplayDate } from "@/lib/events";
import {
  COLORS,
  generateImageMethods,
  getAstroImageBase64,
} from "@/dynamic-images/utils";

import { getEventStaticPaths } from "./_utils";
import { Frame } from "@/dynamic-images/components/Frame";
import { match } from "ts-pattern";
import { LogoIcon } from "@/components/LogoIcon";

export default generateImageMethods({
  width: 1080,
  height: 1080,
  getStaticPaths: getEventStaticPaths,
  render: async (props) => {
    const postCover = await getAstroImageBase64(props.event.data.image.src);
    const coOrganizers = await Promise.all(
      props.coOrganizers.map(async (coOrganiser) => ({
        ...coOrganiser,
        logo: await getAstroImageBase64(coOrganiser.data.logos.noBgSquare),
      })),
    );
    return (
      <Frame {...props.dynamicImage} style={{ padding: 96 }}>
        <img
          src={postCover}
          alt=""
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: props.dynamicImage.width,
            height: props.dynamicImage.height,
            objectFit: "cover",
          }}
        />
        <img
          src={postCover}
          alt=""
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: props.dynamicImage.width,
            height: props.dynamicImage.height,
            objectFit: "cover",
            filter: "blur(10px)",
            maskImage: "linear-gradient(45deg, black 40%, transparent 100%)",
          }}
        />
        <div
          style={{
            background:
              "linear-gradient(45deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 100%)",
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: 2,
          }}
        />

        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            gap: 40,
            width: "100%",
            justifyContent: "space-between",
            zIndex: 100,
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              columnGap: 12,
              rowGap: 0,
              alignItems: "center",
            }}
          >
            {coOrganizers.length ? (
              <LogoIcon
                style={{
                  width: 27 * 5,
                  height: 18 * 5,
                  marginRight: 40,
                  color: COLORS.primary,
                }}
              />
            ) : (
              <Logo
                style={{
                  width: 169 * 3,
                  height: 18 * 3,
                }}
              />
            )}

            {coOrganizers.map((orga) => (
              <Fragment key={orga.id}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: 48,
                    opacity: 0.2,
                  }}
                >
                  &times;
                </div>
                <img
                  src={orga.logo}
                  alt=""
                  style={{
                    width: 160,
                    height: 160,
                    objectFit: "cover",
                    zIndex: 10,
                  }}
                />
              </Fragment>
            ))}
          </div>
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
                letterSpacing: 4,
              }}
            >
              Save the date
            </div>

            <div
              style={{
                display: "flex",
                fontSize: 124,
                fontWeight: 500,
                lineHeight: 1,
                color: COLORS.primary,
                marginTop: -16,
                marginLeft: -6, // Visual alignment
                textTransform: "uppercase",
              }}
            >
              {props.event.data.city}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 60,
                fontWeight: 500,
                lineHeight: 1,
                marginBottom: 48,
                marginTop: -8,
                color: COLORS.primary,
                textTransform: "uppercase",
              }}
            >
              {match(props.event.data.type)
                .with("event", () => "Full Day Event")
                .with("meetup", () => "Community Meetup")
                .exhaustive()}
            </div>
            <div
              style={{
                display: "flex",
                gap: 12,
                fontSize: 48,
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
                  fontSize: 48,
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
