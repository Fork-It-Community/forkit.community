import { Search } from "@/components/Search";
import { Button } from "@/components/ui/button";
import { useEffect, useState, type ComponentProps } from "react";
import { LuSearch } from "react-icons/lu";

export const SearchButton = (props: ComponentProps<"button">) => {
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
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => setIsOpen(true)}
        {...props}
      >
        <LuSearch />
      </Button>
      {isOpen && <Search onOpenChange={setIsOpen} />}
    </>
  );
};
