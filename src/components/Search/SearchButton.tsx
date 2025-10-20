import { Search } from "@/components/Search";
import { cn } from "@/lib/utils-client";
import { useEffect, useState, type ComponentProps } from "react";
import { LuSearch } from "react-icons/lu";

export const SearchButton = (
  props: Pick<ComponentProps<"button">, "className">,
) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <button
        className={cn(
          "hidden h-9 w-9 items-center justify-center rounded px-3 py-2 opacity-50 transition hover:bg-black/30 hover:opacity-100 md:flex",
          props.className,
        )}
        onClick={() => setIsOpen(true)}
      >
        <LuSearch />
      </button>
      {isOpen && <Search onOpenChange={setIsOpen} />}
    </>
  );
};
