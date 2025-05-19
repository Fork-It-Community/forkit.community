import { useState } from "react";
import GlobeComponent from "../Globe";
import type { zLocation } from "@/schemas/locations";

export default function GlobeModal({ points }: { points: zLocation[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Masquer le globe" : "Afficher le globe"}
      </button>

      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <GlobeComponent points={points} />
          </div>
        </div>
      )}
    </>
  );
}
