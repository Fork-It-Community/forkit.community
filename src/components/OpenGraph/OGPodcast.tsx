import { Logo } from "@/components/Logo";
import { COLORS } from "@/components/OpenGraph/utils";
import type { CollectionEntry } from "astro:content";
import dayjs from "dayjs";

export const OGPodcast = (props: {
  episode: CollectionEntry<"episodes">;
  show: CollectionEntry<"podcasts">;
  site: string;
  episodeCover: Buffer | undefined;
  background: Buffer | undefined;
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Tomorrow",
        height: "100%",
        backgroundColor: COLORS.black,
        width: "100%",
        padding: 128,
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
      >
        <img
          // @ts-expect-error: Type 'ArrayBuffer' is not assignable to type 'string'
          src={props.background?.buffer ?? ""}
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
          src={props.background?.buffer ?? ""}
          alt=""
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1920,
            height: 1080,
            objectFit: "cover",
            filter: "blur(20px)",
            maskImage: "linear-gradient(90deg, black 40%, transparent 100%)",
          }}
        />
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,1) 0%, transparent 100%)",
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: 2,
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 128,
          flex: 1,
          width: "100%",
          minWidth: 0,
          justifyContent: "center",
          fontFamily: "Tomorrow",
          color: COLORS.white,
          zIndex: 100,
          paddingRight: 60,
        }}
      >
        <Logo style={{ width: 169 * 3, height: 18 * 3 }} />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 48,
            minWidth: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 32,
              fontWeight: 500,
              textTransform: "uppercase",
              opacity: 0.6,
              letterSpacing: 4,
            }}
          >
            {dayjs(props.episode.data.releaseDate).format("MMMM DD, YYYY")}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 96,
              fontWeight: 500,
              lineHeight: 1.1,
              marginLeft: -6, // Visual alignment
            }}
          >
            {props.episode.data.title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 48,
              fontWeight: 500,
              color: COLORS.primary,
              marginLeft: -2, // Visual alignment
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            {props.episode.data.language} Podcast
          </div>
        </div>
      </div>

      <img
        // @ts-expect-error: Type 'ArrayBuffer' is not assignable to type 'string'
        src={props.episodeCover?.buffer ?? ""}
        alt=""
        style={{
          width: 600,
          height: 600,
          objectFit: "cover",
          borderRadius: 12,
        }}
      />
    </div>
  );
};