import { AssetCard } from "./AssetCard";

export const AssetsContent = () => {
  return (
    <div className="flex flex-col gap-6 overflow-auto">
      <div className="flex flex-col gap-2">
        <h3 className="font-heading text-sm uppercase tracking-wider opacity-80 max-sm:px-4 max-sm:text-center">
          Logo without background
        </h3>
        <div className="grid justify-items-center gap-4 max-sm:px-4 sm:grid-cols-3">
          <AssetCard type="logo" color="default" />
          <AssetCard type="logo" color="black" />
          <AssetCard type="logo" color="white" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-heading text-sm uppercase tracking-wider opacity-80 max-sm:px-4 max-sm:text-center">
          Logo with background
        </h3>
        <div className="grid justify-items-center gap-4 max-sm:px-4 sm:grid-cols-3">
          <AssetCard type="logo" color="default" withBackground />
          <AssetCard type="logo" color="black" withBackground />
          <AssetCard type="logo" color="white" withBackground />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-heading text-sm uppercase tracking-wider opacity-80 max-sm:px-4 max-sm:text-center">
          Icon without background
        </h3>
        <div className="grid justify-items-center gap-4 max-sm:px-4 sm:grid-cols-3">
          <AssetCard type="icon" color="default" />
          <AssetCard type="icon" color="black" />
          <AssetCard type="icon" color="white" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-heading text-sm uppercase tracking-wider opacity-80 max-sm:px-4 max-sm:text-center">
          Icon with background
        </h3>
        <div className="grid justify-items-center gap-4 max-sm:px-4 sm:grid-cols-3">
          <AssetCard type="icon" color="default" withBackground />
          <AssetCard type="icon" color="black" withBackground />
          <AssetCard type="icon" color="white" withBackground />
        </div>
      </div>
    </div>
  );
};
