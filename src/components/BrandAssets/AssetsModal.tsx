import {
  ResponsiveDrawer,
  ResponsiveDrawerContent,
  ResponsiveDrawerDescription,
  ResponsiveDrawerHeader,
  ResponsiveDrawerTitle,
} from "@/components/ResponsiveDrawer";
import dayjs from "dayjs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AssetsContent } from "./AssetsContent";

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
      <ResponsiveDrawerContent className="max-h-[90vh] max-w-2xl">
        <ResponsiveDrawerHeader>
          <ResponsiveDrawerTitle>Logo Assets</ResponsiveDrawerTitle>
          <ResponsiveDrawerDescription>
            Quickly download the Fork it! logo
          </ResponsiveDrawerDescription>
        </ResponsiveDrawerHeader>
        <ScrollArea className="max-sm:overflow-auto sm:max-h-[80vh]">
          <AssetsContent />
          <div className="border-t py-4 pt-6 text-center text-xs text-gray-500 max-sm:pb-8">
            © {dayjs().year()} Fork it! Community
          </div>
        </ScrollArea>
      </ResponsiveDrawerContent>
    </ResponsiveDrawer>
  );
};
