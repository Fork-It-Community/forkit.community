import { useEffect, useRef, useState } from "react";

import { FilterGroup } from "@/components/Schedule/FilterGroup";

interface FilterOption {
  value: string;
  label: string;
}

interface ScheduleFiltersProps {
  showRoom: boolean;
  showType: boolean;
  rooms: FilterOption[];
  typeOptions: FilterOption[];
}

const ALL = "__all";

export function ScheduleFilters({
  showRoom,
  showType,
  rooms,
  typeOptions,
}: ScheduleFiltersProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [room, setRoom] = useState(ALL);
  const [type, setType] = useState(ALL);

  useEffect(() => {
    const scope = rootRef.current?.closest<HTMLElement>("[data-schedule]");
    if (!scope) return;

    const rows = scope.querySelectorAll<HTMLElement>(".schedule-row");
    const empty = scope.querySelector<HTMLElement>("[data-schedule-empty]");
    const visibleRows: HTMLElement[] = [];

    rows.forEach((row) => {
      const roomPass = room === ALL || row.dataset.room === room;
      const typePass = type === ALL || row.dataset.type === type;
      const isVisible = roomPass && typePass;
      row.style.display = isVisible ? "" : "none";

      const connector = row.querySelector<HTMLElement>(".schedule-connector");
      if (connector) connector.style.display = "";
      if (isVisible) visibleRows.push(row);
    });

    const lastConnector = visibleRows
      .at(-1)
      ?.querySelector<HTMLElement>(".schedule-connector");
    if (lastConnector) lastConnector.style.display = "none";

    empty?.classList.toggle("hidden", visibleRows.length > 0);
  }, [room, type]);

  return (
    <div ref={rootRef} className="flex flex-col gap-2">
      {showRoom && (
        <FilterGroup
          label="Room"
          name="room"
          options={rooms}
          value={room}
          onChange={setRoom}
        />
      )}
      {showType && (
        <FilterGroup
          label="Type"
          name="type"
          options={typeOptions}
          value={type}
          onChange={setType}
        />
      )}
    </div>
  );
}
