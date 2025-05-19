import { useState } from "react";
import GlobeComponent from "../Globe";

export default function GlobeModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button onClick={isOpen ? closeModal : openModal}>
        {isOpen ? "Masquer le globe" : "Afficher le globe"}
      </button>

      {isOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <GlobeComponent />
          </div>
        </div>
      )}
    </>
  );
}
