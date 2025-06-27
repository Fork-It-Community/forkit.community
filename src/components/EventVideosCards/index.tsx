import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { EventComputed } from "@/lib/events";

import { VideoCard } from "@/components/EventVideosCards/videoCard";

export const EventVideosCards = (props: { event: EventComputed }) => {
  const [open, setOpen] = useState(false);
  const initialTalks = props.event.data._computed.talks.slice(0, 3);
  const hasMore = props.event.data._computed.talks.length > 3;

  return (
    <section className="space-y-6">
      <div className="flex flex-row items-center justify-between">
        <h2 className="mb-2 font-heading text-xl font-medium">
          {props.event.data._computed.name}
        </h2>
        {hasMore && (
          <Collapsible open={open} onOpenChange={setOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="secondary">
                {open ? "Show Less" : "Show More"}
              </Button>
            </CollapsibleTrigger>
          </Collapsible>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {initialTalks.map((talk) => (
          <VideoCard talk={talk} key={talk.id} />
        ))}
      </div>

      {hasMore && (
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleContent>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {props.event.data._computed.talks.slice(3).map((talk) => (
                <VideoCard talk={talk} key={talk.id} />
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}
    </section>
  );
};
