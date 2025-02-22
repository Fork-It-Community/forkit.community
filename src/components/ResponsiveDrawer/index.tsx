import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Dialog, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { type ComponentProps } from "react";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const useIsMobile = () => {
  return useMediaQuery("only screen and (max-width : 640px)");
};

export const ResponsiveDrawer = (
  props: ComponentProps<typeof Drawer | typeof Dialog>,
) => (useIsMobile() ? <Drawer {...props} /> : <Dialog {...props} />);

export const ResponsiveDrawerTrigger = (
  props: ComponentProps<typeof DrawerTrigger | typeof DialogTrigger>,
) =>
  useIsMobile() ? <DrawerTrigger {...props} /> : <DialogTrigger {...props} />;

export const ResponsiveDrawerPortal = (
  props: ComponentProps<typeof DrawerPortal | typeof DialogPortal>,
) =>
  useIsMobile() ? <DrawerPortal {...props} /> : <DialogPortal {...props} />;

export const ResponsiveDrawerClose = (
  props: ComponentProps<typeof DrawerClose | typeof DialogClose>,
) => (useIsMobile() ? <DrawerClose {...props} /> : <DialogClose {...props} />);

export const ResponsiveDrawerOverlay = (
  props: ComponentProps<typeof DrawerOverlay | typeof DialogOverlay>,
) =>
  useIsMobile() ? <DrawerOverlay {...props} /> : <DialogOverlay {...props} />;

export const ResponsiveDrawerContent = (
  props: ComponentProps<typeof DrawerContent | typeof DialogContent>,
) =>
  useIsMobile() ? <DrawerContent {...props} /> : <DialogContent {...props} />;

export const ResponsiveDrawerHeader = (
  props: ComponentProps<typeof DrawerHeader | typeof DialogHeader>,
) =>
  useIsMobile() ? <DrawerHeader {...props} /> : <DialogHeader {...props} />;

export const ResponsiveDrawerFooter = (
  props: ComponentProps<typeof DrawerFooter | typeof DialogFooter>,
) =>
  useIsMobile() ? <DrawerFooter {...props} /> : <DialogFooter {...props} />;

export const ResponsiveDrawerTitle = (
  props: ComponentProps<typeof DrawerTitle | typeof DialogTitle>,
) => (useIsMobile() ? <DrawerTitle {...props} /> : <DialogTitle {...props} />);

export const ResponsiveDrawerDescription = (
  props: ComponentProps<typeof DrawerDescription | typeof DialogDescription>,
) =>
  useIsMobile() ? (
    <DrawerDescription {...props} />
  ) : (
    <DialogDescription {...props} />
  );
