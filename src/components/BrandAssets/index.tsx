import { AssetsModalTrigger } from "@/components/BrandAssets/ModalTrigger";
import { Logo } from "@/components/Logo";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useState, type MouseEvent } from "react";
import { FaGoogleDrive, FaImages } from "react-icons/fa6";

export const LogoWithPopOver = () => {
  const [showPopOver, setPopOver] = useState(false);

  const handleContextMenu = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setPopOver(true);
  };

  const LogoRightClickContent = [
    {
      label: "Logo assets",
      icon: FaImages,
      isModalTrigger: true,
    },
    {
      label: "full Media Kit",
      href: "https://drive.google.com/drive/folders/1JkxgD0f6fetVdzsjGLLMexTRwRdb3Euv",
      icon: FaGoogleDrive,
    },
  ];

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
      <Popover open={showPopOver} onOpenChange={setPopOver}>
        <PopoverTrigger asChild>
          <div className="sr-only">Hidden trigger</div>
        </PopoverTrigger>
        <PopoverContent
          className="w-56 px-2 py-2"
          align="end"
          alignOffset={-300}
          sideOffset={25}
        >
          {LogoRightClickContent.map((item, index) => {
            const commonClasses =
              "flex items-center gap-3 rounded px-3 py-2.5 text-white opacity-50 transition hover:bg-black/30 hover:opacity-100 cursor-pointer";
            if (item.isModalTrigger) {
              return (
                <AssetsModalTrigger key={index}>
                  <div className={commonClasses}>
                    <span className="text-xl">
                      <item.icon />
                    </span>
                    <span className="text-sm tracking-wide">{item.label}</span>
                  </div>
                </AssetsModalTrigger>
              );
            }

            return (
              <a
                key={index}
                href={item.href}
                className={commonClasses}
                target="_blank"
                rel="noreferrer"
              >
                <span className="text-xl">
                  <item.icon />
                </span>
                <span className="text-sm tracking-wide">{item.label}</span>
              </a>
            );
          })}
        </PopoverContent>
      </Popover>
    </>
  );
};
