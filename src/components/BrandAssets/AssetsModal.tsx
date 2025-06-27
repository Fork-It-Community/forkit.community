import {
  ResponsiveDrawer,
  ResponsiveDrawerContent,
  ResponsiveDrawerHeader,
  ResponsiveDrawerTitle,
  ResponsiveDrawerTrigger,
} from "@/components/ResponsiveDrawer";
import { AssetCard } from "./AssetCard";
import { logos, icons } from "./logos";
import dayjs from "dayjs";

interface BrandAssetsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const BrandAssetsModal = ({
  open,
  onOpenChange,
}: BrandAssetsModalProps) => {
  return (
    <ResponsiveDrawer open={open} onOpenChange={onOpenChange}>
      <ResponsiveDrawerTrigger asChild>
        <div className="sr-only" />
      </ResponsiveDrawerTrigger>
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
                className="flex w-full flex-col items-center p-6 transition-all duration-300 hover:scale-105"
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
  );
};
