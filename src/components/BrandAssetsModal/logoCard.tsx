import type { Asset } from "@/components/BrandAssetsModal/logos";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils-client";

export const AssetCard = ({
  asset,
  isIcon = false,
}: {
  asset: Asset;
  isIcon?: boolean;
}) => (
  <div className="flex w-full flex-col rounded-lg bg-white/5">
    <div
      className={cn(
        "relative flex h-40 items-center justify-center p-4",
        asset.bg,
      )}
    >
      <img
        src={asset.image}
        alt={asset.label}
        className={
          isIcon
            ? "h-28 w-28 object-contain"
            : "h-full w-auto max-w-full object-contain"
        }
        height={200}
        width={200}
      />
    </div>

    <div className="p-4">
      <div className="mb-3 flex justify-between text-xs text-gray-500">
        <span>Color</span>
        <span>{asset.label}</span>
      </div>
      <div className="flex justify-center gap-4">
        {asset.variants.map((variant) => {
          return (
            <a
              key={variant.type}
              href={variant.url}
              download
              className={cn(
                buttonVariants({
                  variant: variant.type === "svg" ? "default" : "secondary",
                }),
              )}
            >
              <span className="relative z-10">
                {variant.type.toUpperCase()}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  </div>
);
