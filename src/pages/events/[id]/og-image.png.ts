import fs from "fs/promises";
import satori from "satori";
import sharp from "sharp";
import type { APIRoute } from "astro";
import { getCollection, getEntry } from "astro:content";

export async function getStaticPaths() {
  const events = await getCollection("events");

  return events.map((event) => ({
    params: { id: event.id },
    props: event,
  }));
}

export const GET: APIRoute = async function get({ params }) {
  const tomorrowData = await fs.readFile(
    "./public/fonts/tomorrow/Tomorrow-Regular.ttf",
  );
  const event = await getEntry("events", params.id ?? "");
  const svg = await satori(
    // @ts-ignore Satori want ReactNode when react is installed.
    {
      type: "div",
      props: {
        children: [
          {
            type: "img",
            props: {
              src: new URL(
                "/forkit-open-graph.png",
                "http://localhost:4321",
              ).toString(),
              style: {
                objectFit: "cover",
                "margin-top": "10rem",
              },
            },
          },
          {
            type: "p",
            props: {
              children: event?.data.name,
            },
          },
        ],
        style: {
          height: "100vh",
          width: "100vw",
          backgroundColor: "#171717",
          color: "#ffffff",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          lineHeight: 0,
          fontSize: "4rem",
          justifyContent: "space-between",
          alignItems: "center",
        },
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Tomorrow",
          data: tomorrowData,
          style: "normal",
        },
      ],
    },
  );

  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
    },
  });
};
