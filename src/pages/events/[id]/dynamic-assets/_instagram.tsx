import { Logo } from "@/components/Logo";
import { getEventDisplayDate } from "@/lib/events";
import {
  COLORS,
  generateImageMethods,
  getAstroImageBase64,
} from "@/lib/dynamic-assets";
import { getCollection } from "astro:content";
import { match } from "ts-pattern";

export default generateImageMethods({
  width: 1080,
  height: 1080,
  getStaticPaths: async () => {
    const events = await getCollection("events");

    return events.map((event) => {
      return {
        params: { id: event.id },
        props: {
          event,
        },
      };
    });
  },
  render: async (props) => {
    const postCover = await getAstroImageBase64(props.event.data.image.src);
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Tomorrow",
          backgroundColor: COLORS.background,
          width: 1080,
          height: 1080,
          boxSizing: "border-box",
          position: "relative",
          padding: 128,
        }}
      >
        <img
          src={postCover}
          alt=""
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1080,
            height: 1080,
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
            width: 1080,
            height: 1080,
            objectFit: "cover",
            filter: "blur(10px)",
            maskImage: "linear-gradient(90deg, black 40%, transparent 100%)",
          }}
        />
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 100%)",
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
              {match(props.event.data.type)
                .with("event", () => "Full Day Event")
                .with("meetup", () => "Community Meetup")
                .exhaustive()}
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
      </div>
    );
  },
});
