import { COLORS } from "@/components/OpenGraph/utils";
import type { CollectionEntry } from "astro:content";
import dayjs from "dayjs";
import { match } from "ts-pattern";

export const OGEvent = (props: {
  event: CollectionEntry<"events">;
  site: string;
  postCover: Buffer | undefined;
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
      }}
    >
      <div
        style={{
          position: "absolute",
          right: 0,
          display: "flex",
        }}
      >
        <img
          /* @ts-expect-error: Type 'ArrayBuffer' is not assignable to type 'string' */
          src={props.postCover?.buffer ?? ""}
          alt=""
          style={{
            width: "80rem",
            filter: "blur(4px)",
          }}
        />
      </div>

      <div
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.2) 100%)",
          position: "absolute",
          width: "100%",
          height: "100%",
          inset: 0,
          zIndex: 2,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8rem",
          position: "absolute",
          top: "8rem",
          left: "8rem",
          fontFamily: "Tomorrow",
          color: COLORS.white,
          zIndex: 100,
        }}
      >
        <div
          style={{
            fontSize: "3rem",
            fontWeight: 400,
            textTransform: "uppercase",
            opacity: 0.6,
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
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          <div
            style={{
              fontSize: "8rem",
              fontWeight: 700,
            }}
          >
            {dayjs(props.event.data.date).format("MMMM DD, YYYY")}
          </div>
          <div
            style={{
              fontSize: "5rem",
              fontWeight: 500,
              opacity: 0.8,
            }}
          >
            {props.event.data.name}
          </div>
        </div>
      </div>
    </div>
  );
};
