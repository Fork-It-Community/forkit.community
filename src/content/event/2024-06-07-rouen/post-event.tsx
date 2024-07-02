import { EventFrontmatter } from "@/content/collections";
import { formatDateTime } from "@/lib/utils";

export function PostEvent(
  props: Readonly<{
    event: Omit<EventFrontmatter, "date"> & { date?: string };
  }>,
) {
  return (
    <div id="post-event" className="bg-gray-900">
      <div className="flex flex-col py-6 text-center">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
          What happend?
        </h2>
        {props.event.date && <p>{formatDateTime(props.event.date)} summary!</p>}
      </div>
    </div>
  );
}
