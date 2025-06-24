import { AssetCard } from "@/components/BrandAssetsModal/logoCard";
import { icons, logos } from "@/components/BrandAssetsModal/logos";
import { Logo } from "@/components/Logo";
import {
  ResponsiveDrawer,
  ResponsiveDrawerContent,
  ResponsiveDrawerHeader,
  ResponsiveDrawerTitle,
} from "@/components/ResponsiveDrawer";
import dayjs from "dayjs";

import { useState, type MouseEvent } from "react";

export const LogoWithBrandingModal = () => {
  const [showModal, setShowModal] = useState(false);

  const handleContextMenu = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <>
      <a
        href="/"
        className="py-2"
        title="Home page of Fork it! Community"
        id="fork-it-logo"
        onContextMenu={handleContextMenu}
      >
        <Logo className="w-28" />
      </a>

      {showModal && (
        <ResponsiveDrawer open={showModal} onOpenChange={setShowModal}>
          <ResponsiveDrawerContent className="max-w-4xl gap-0 overflow-y-auto p-0 pb-4">
            <ResponsiveDrawerHeader className="p-4 text-center">
              <ResponsiveDrawerTitle>
                Fork it! Assets Collection
              </ResponsiveDrawerTitle>
              <p className="mt-2 text-sm text-gray-600">
                Download our logos and icons in SVG or PNG format
              </p>
            </ResponsiveDrawerHeader>

            <div className="px-4">
              <h3 className="text-center text-base font-semibold text-white">
                Logos
              </h3>
              <div className="grid justify-items-center gap-4 sm:grid-cols-3 sm:gap-6">
                {logos.map((logo, i) => (
                  <div
                    key={i}
                    className={`flex w-full flex-col items-center p-6 transition-all duration-300 hover:scale-105`}
                  >
                    <AssetCard asset={logo} />
                  </div>
                ))}
              </div>
            </div>

            <div className="px-6 pb-6">
              <div className="pt-6">
                <h3 className="text-center text-base font-semibold text-white">
                  Icons
                </h3>
                <div className="mx-auto grid max-w-4xl grid-cols-3 justify-items-center gap-4">
                  {icons.map((icon, i) => (
                    <div
                      key={i}
                      className="flex w-full flex-col items-center p-4 transition-all duration-300 hover:scale-105"
                    >
                      <AssetCard asset={icon} isIcon />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 px-4 py-3 text-center text-sm text-gray-500">
              © {dayjs().year()} Fork it! Community
            </div>
          </ResponsiveDrawerContent>
        </ResponsiveDrawer>
      )}
    </>
  );
};
