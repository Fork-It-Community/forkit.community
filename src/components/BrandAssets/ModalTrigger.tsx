import { useState, type ReactNode } from "react";
import { BrandAssetsModal } from "./AssetsModal";

interface Props {
  children: ReactNode;
}

export const AssetsModalTrigger = ({ children }: Props) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div onClick={() => setShowModal(true)}>{children}</div>
      <BrandAssetsModal open={showModal} onOpenChange={setShowModal} />
    </>
  );
};
