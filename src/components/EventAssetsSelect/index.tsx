import { LuCheck, LuChevronsUpDown } from "react-icons/lu";

import { cn } from "@/lib/utils-client";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { CollectionEntry } from "astro:content";
import { lunalink } from "@bearstudio/lunalink";
import { ROUTES } from "@/routes.gen";
import dayjs from "dayjs";
import type { EventComputed } from "@/lib/events";

export default function EventAssetsSelect({
  currentEvent,
  pastEvents,
}: {
  currentEvent: CollectionEntry<"events">["id"];
  pastEvents: Array<EventComputed>;
}) {
  const events = pastEvents.map((event) => {
    return {
      id: event.id,
      href: lunalink(ROUTES.events[":id"].assets.__path, { id: event.id }),
      name: `${event.data._computed.city?.data.name}, ${event.data._computed.country?.data.name} - ${dayjs(event.data.date).format("D MMM, YYYY")}`,
    };
  });

  const selectedOption = events.find((e) => e.id === currentEvent);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          role="combobox"
          className="w-full justify-between border border-input bg-transparent hover:bg-accent hover:text-accent-foreground"
        >
          <span className="flex-1 truncate text-left">
            {selectedOption?.name ?? "Select an Event"}
          </span>
          <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput />
          <CommandList>
            <CommandGroup>
              {events.map((event) => (
                <CommandItem
                  key={event.id}
                  value={event.name}
                  onSelect={() => window.location.assign(event.href)}
                >
                  <a
                    href={event.href}
                    className="flex w-full items-center gap-2"
                  >
                    <LuCheck
                      className={cn(
                        "h-4 w-4",
                        selectedOption?.id === event.id
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    {event.name}
                  </a>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
