import type { Partner } from "@/content/partners/partners";
import { cn } from "@/lib/utils";
import type { CollectionEntry } from "astro:content";

function PartnerImage({ partner }: { partner: Partner }) {
  const content = (
    <div
      className={cn("overflow-hidden rounded-md border-gray-100", {
        "hover:border-gray-200": !!partner.href,
      })}
    >
      <img
        className="w-full"
        src={partner.image.src}
        alt={partner.image.alt}
        width={1000}
        height={500}
      />
    </div>
  );

  if (!partner.href) {
    return content;
  }

  return (
    <a
      href={partner.href ?? "#"}
      title={partner.name}
      target="_blank"
      rel="noreferer"
    >
      {content}
    </a>
  );
}
export function Partners(
  props: Readonly<{
    allPartners: Array<CollectionEntry<"partners">>;
  }>,
) {
  return (
    <div className="pb-30 pt-2">
      <div className="max-w-7xl">
        <h3 className="mb-4 font-heading text-2xl font-bold tracking-tight text-white">
          Partners
        </h3>
        <ul className="grid grid-cols-2 gap-4 sm:mx-0 sm:grid-cols-3 lg:grid-cols-4 lg:gap-8">
          {props.allPartners.map((partner) => (
            <li key={partner.data.name} className="gap-4">
              <PartnerImage partner={partner.data} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
