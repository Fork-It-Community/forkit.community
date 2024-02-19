import collections from "@/content/collections";
import { formatDateTime } from "@/lib/utils";
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
// App router includes @vercel/og.
// No need to install it.

export const runtime = "nodejs";

export async function GET(
  _: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const event = await collections.event.getBySlug(params.slug);
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            fontSize: "5rem",
            color: "white",
            width: "100%",
            height: "100%",
            padding: "50px 200px",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
          tw="bg-neutral-900"
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {event.date && (
              <p
                style={{
                  fontSize: "10rem",
                  color: "hsl(65 100% 53%)",
                  fontFamily: '"Tomorrow"',
                }}
              >
                {formatDateTime(event.date)}
              </p>
            )}
            {event.name && <p>{event.name}</p>}
          </div>
        </div>
      ),
      {
        width: 2400,
        height: 1260,
      },
    );
  } catch {
    return notFound();
  }
}
