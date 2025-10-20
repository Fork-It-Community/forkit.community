import {
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { getMainMenuDesktopItems } from "@/content/menus";
import { actions } from "astro:actions";
import { useEffect, useRef, useState } from "react";
import { capitalize, entries, groupBy } from "remeda";
import MiniSearch, { type SearchResult } from "minisearch";

type Data = NonNullable<Awaited<ReturnType<typeof actions.search>>["data"]>;
type SearchResultWithStoreField = SearchResult &
  Pick<Data[number], "title" | "type" | "slug">;

export const Search = (props: { onOpenChange: (open: boolean) => void }) => {
  const [search, setSearch] = useState<string>("");
  const [items, setItems] = useState<
    Array<Pick<Data[number], "title" | "type" | "slug">>
  >([]);
  const [searchResults, setSearchResults] =
    useState<Array<SearchResultWithStoreField> | null>(null);

  const miniSearchRef = useRef<MiniSearch>(
    new MiniSearch({
      fields: ["title"],
      idField: "slug",
      storeFields: ["title", "slug", "type"],
      searchOptions: { fuzzy: true, prefix: true },
    }),
  );

  const MENUS = [
    ...getMainMenuDesktopItems("primary"),
    ...getMainMenuDesktopItems("secondary"),
  ].map((item) => ({
    ...item,
    type: "menu" as const,
    title: item.label,
    slug: item.href,
  }));

  useEffect(() => {
    async function get() {
      const { data, error } = await actions.search();

      if (!error) {
        const toSet = [...MENUS, ...data];
        miniSearchRef.current.addAll(toSet);
        setItems(toSet);
        return;
      }

      miniSearchRef.current.addAll(MENUS);
    }

    if (miniSearchRef.current.documentCount === 0) {
      get();
    }
  }, []);

  const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);
  const modifierKey = isMac ? "⌘" : "Ctrl";

  const handleOnValueChange = (value: string) => {
    const results = miniSearchRef.current.search(value.trim());

    setSearch(value);
    setSearchResults(results as Array<SearchResultWithStoreField>);
  };

  const searchGrouppedByType = groupBy(
    search.trim().length === 0 ? items : (searchResults ?? []),
    (item) => item.type,
  );

  return (
    <CommandDialog open onOpenChange={props.onOpenChange}>
      <CommandInput
        placeholder={`Search for events, people, news...  (${modifierKey}+k)`}
        value={search}
        onValueChange={handleOnValueChange}
      />
      <CommandList>
        {entries(searchGrouppedByType).map(([key, values]) => (
          <CommandGroup key={key} heading={capitalize(key)}>
            {values.map((item) => (
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
        ))}
      </CommandList>
    </CommandDialog>
  );
};
