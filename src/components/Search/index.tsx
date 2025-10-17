import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { getMainMenuDesktopItems } from "@/content/menus";
import { ROUTES } from "@/routes.gen";
import { lunalink } from "@bearstudio/lunalink";

import { actions } from "astro:actions";
import { CommandLoading } from "cmdk";
import dayjs from "dayjs";

import { useEffect, useState } from "react";
import { LuHouse } from "react-icons/lu";
import { isEmpty, isNullish } from "remeda";

export const Search = (props: { onOpenChange: (open: boolean) => void }) => {
  const [data, setData] = useState<
    Awaited<ReturnType<typeof actions.search>>["data"] | null
  >(null);

  useEffect(() => {
    async function get() {
      const { data, error } = await actions.search();

      if (!error) {
        setData(data);
        return;
      }

      setData({ events: [], news: [], people: [], podcasts: [] });
    }

    if (isEmpty(data ?? {})) {
      get();
    }
  }, [data]);

  const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);
  const modifierKey = isMac ? "⌘" : "Ctrl";

  return (
    <CommandDialog open onOpenChange={props.onOpenChange}>
      <CommandInput
        placeholder={`Search for events, people, news...  (${modifierKey}+k)`}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup>
          <CommandItem
            onSelect={() => window.location.assign(lunalink(ROUTES.__path, {}))}
          >
            <LuHouse />
            <span>Hub</span>
          </CommandItem>
          {getMainMenuDesktopItems("primary").map((item) => (
            <CommandItem
              key={item.href}
              onSelect={() => window.location.assign(item.href)}
            >
              <item.icon />
              <span>{item.label}</span>
            </CommandItem>
          ))}
          {getMainMenuDesktopItems("secondary").map((item) => (
            <CommandItem
              key={item.href}
              onSelect={() => window.location.assign(item.href)}
            >
              <item.icon />
              <span>{item.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        {isNullish(data) && (
          <CommandLoading className="p-4 text-center text-sm">
            Loading data
          </CommandLoading>
        )}

        <CommandGroup heading="Events">
          {data?.events.map((item) => (
            <CommandItem
              key={item.slug}
              onSelect={() => {
                window.location.assign(item.slug);
              }}
            >
              {item.title} - {dayjs(item.metadata.date).format("DD MMM YYYY")}
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
        <CommandGroup heading="Podcasts">
          {data?.podcasts.map((item) => (
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
        <CommandGroup heading="People">
          {data?.people.map((item) => (
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
