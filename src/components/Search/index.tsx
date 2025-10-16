import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { actions } from "astro:actions";
import dayjs from "dayjs";

import { useEffect, useState } from "react";

export const Search = () => {
  const [data, setData] =
    useState<Awaited<ReturnType<typeof actions.search>>["data"]>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function get() {
      const { data, error } = await actions.search();
      if (!error) {
        setData(data);
      }
    }

    get();
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Events">
          {data?.events.map((item) => (
            <CommandItem
              key={item.slug}
              onSelect={() => {
                window.location.assign(item.slug);
              }}
            >
              {item.title} - {dayjs(item.metadata.date).format("DD/MM/YYYY")}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="News">
          {data?.news.map((item) => (
            <CommandItem
              key={item.slug}
              onSelect={() => {
                window.location.assign(item.slug);
              }}
            >
              {item.title}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
