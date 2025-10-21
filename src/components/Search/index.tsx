import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { getMainMenuDesktopItems } from "@/content/menus";
import { actions } from "astro:actions";
import { useEffect, useMemo, useRef, useState } from "react";
import { capitalize, entries, groupBy } from "remeda";
import MiniSearch, { type SearchResult } from "minisearch";
import { useSessionStorage } from "@uidotdev/usehooks";
import { DialogTitle } from "@radix-ui/react-dialog";
import { CommandLoading } from "cmdk";

type Data = NonNullable<Awaited<ReturnType<typeof actions.search>>["data"]>;
type SearchResultWithStoreField = SearchResult &
  Pick<Data[number], "title" | "type" | "slug">;

export const Search = (props: { onOpenChange: (open: boolean) => void }) => {
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] =
    useState<Array<SearchResultWithStoreField> | null>(null);

  const [items, setItems] = useSessionStorage<Array<
    Pick<Data[number], "title" | "type" | "slug">
  > | null>("forkit.community-search-index", null);

  const miniSearchRef = useRef<MiniSearch>(
    new MiniSearch({
      fields: ["title"],
      idField: "slug",
      storeFields: ["title", "slug", "type"],
      searchOptions: { fuzzy: true, prefix: true },
    }),
  );

  const MENUS = useMemo(
    () =>
      [
        ...getMainMenuDesktopItems("primary"),
        ...getMainMenuDesktopItems("secondary"),
      ].map((item) => ({
        ...item,
        type: "menu" as const,
        title: item.label,
        slug: item.href,
      })),
    [],
  );

  useEffect(() => {
    async function get() {
      const { data, error } = await actions.search();

      if (!error) {
        const toSet = [...MENUS, ...data];
        miniSearchRef.current.addAll(toSet);
        setItems(toSet);
        return;
      }

      console.error("Failed to fetch search data:", error);
      miniSearchRef.current.addAll(MENUS);
      setItems(MENUS);
    }

    if (items?.length) {
      miniSearchRef.current.addAll(items);
      return;
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
    search.trim().length === 0 ? (items ?? []) : (searchResults ?? []),
    (item) => item.type,
  );

  return (
    <CommandDialog open onOpenChange={props.onOpenChange}>
      <DialogTitle className="sr-only">
        Search for events, people, news...
      </DialogTitle>
      <CommandInput
        placeholder={`Search for events, people, news...  (${modifierKey}+k)`}
        value={search}
        onValueChange={handleOnValueChange}
      />
      <CommandList>
        {search.trim().length !== 0 && searchResults?.length === 0 && (
          <CommandEmpty>No result for "{search.trim()}"</CommandEmpty>
        )}
        {items === null && (
          <CommandLoading className="py-6 text-center text-sm text-muted-foreground">
            Loading data...
          </CommandLoading>
        )}
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
