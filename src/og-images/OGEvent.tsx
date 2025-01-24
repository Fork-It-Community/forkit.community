import { Logo } from "@/components/Logo";
import { COLORS } from "@/og-images/utils";
import type { CollectionEntry } from "astro:content";
import dayjs from "dayjs";
import { match } from "ts-pattern";

export const OGEvent = (props: {
  event: CollectionEntry<"events">;
  site: string;
  postCover: Buffer;
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Tomorrow",
        height: "100%",
        backgroundColor: COLORS.background,
        width: "100%",
        position: "relative",
        padding: 128,
      }}
    >
      <img
        // @ts-expect-error: Type 'ArrayBuffer' is not assignable to type 'string'
        src={props.postCover?.buffer ?? ""}
        alt=""
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1920,
          height: 1080,
          objectFit: "cover",
        }}
      />
      <img
        // @ts-expect-error: Type 'ArrayBuffer' is not assignable to type 'string'
        src={props.postCover?.buffer ?? ""}
        alt=""
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1920,
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
            {dayjs(props.event.data.date).format("MMMM DD, YYYY")}
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
};
