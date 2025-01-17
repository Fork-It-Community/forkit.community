import { COLORS } from "@/components/OpenGraph/utils";
import type { CollectionEntry } from "astro:content";

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
      }}
    >
      {/* @ts-expect-error: Type 'ArrayBuffer' is not assignable to type 'string' */}
      <img src={props.postCover?.buffer ?? ""} />
      <h1 style={{ color: "white" }}>{props.event?.data.name}</h1>
    </div>
  );
};
