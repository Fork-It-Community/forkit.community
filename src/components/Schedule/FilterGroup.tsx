import { Button } from "@/components/ui/button";

interface FilterGroupProps {
  label: string;
  name: "room" | "type";
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (value: string) => void;
}

export function FilterGroup({
  label,
  name,
  options,
  value,
  onChange,
}: FilterGroupProps) {
  const buttons = [{ value: "__all", label: "All" }, ...options];

  return (
    <div className="flex items-center gap-3">
      <span className="w-12 shrink-0 font-heading text-xs uppercase tracking-widest opacity-60">
        {label}
      </span>
      <div
        className="hide-scrollbar flex min-w-0 flex-1 items-center gap-1 overflow-x-auto rounded-lg bg-white/5 p-1"
        role="group"
        aria-label={`Filter schedule by ${name}`}
      >
        {buttons.map((button) => (
          <Button
            key={button.value}
            type="button"
            variant="ghost"
            aria-pressed={button.value === value}
            onClick={() => onChange(button.value)}
            className="h-auto rounded-md px-3 py-1.5 font-heading text-xs font-normal uppercase tracking-wider transition-none aria-pressed:bg-white/15 aria-pressed:opacity-100"
          >
            {button.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
