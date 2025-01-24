import { Logo } from "@/components/Logo";
import { COLORS } from "@/og-images/utils";
import type { CollectionEntry } from "astro:content";
import dayjs from "dayjs";

export const OGNews = (props: {
  article: CollectionEntry<"news">;
  background: Buffer;
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
            filter: "blur(10px)",
            maskImage: "linear-gradient(0deg, black 40%, transparent 100%)",
          }}
        />
        <div
          style={{
            background:
              "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 100%)",
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
          gap: 96,
          flex: 1,
          width: "100%",
          height: "100%",
          minWidth: 0,
          justifyContent: "center",
          fontFamily: "Tomorrow",
          color: COLORS.white,
          zIndex: 100,
          paddingRight: 60,
        }}
      >
        <Logo style={{ width: 169 * 3, height: 18 * 3, marginTop: "auto" }} />

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
              fontSize: 96,
              fontWeight: 500,
              lineHeight: 1,
              marginLeft: -6, // Visual alignment
            }}
          >
            {props.article.data.title}
          </div>
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
            NEWS · {dayjs(props.article.data.date).format("MMMM DD, YYYY")}
          </div>
        </div>
      </div>
    </div>
  );
};
