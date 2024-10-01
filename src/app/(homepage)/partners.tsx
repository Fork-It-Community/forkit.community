import collections, { Partner } from "@/content/collections";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

async function PartnerImage({ partner }: { partner: Partner }) {
  const content = (
    <div
      className={cn("overflow-hidden rounded-md border-2 border-gray-100", {
        "hover:border-gray-200": !!partner.href,
      })}
    >
       <Image
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
    <Link
      href={partner.href ?? "#"}
      title={partner.name}
      target="_blank"
      rel="noreferer"
    >
      {content}
    </Link>
  );
}
export async function Partners({PartnersSlugs}: {PartnersSlugs : string[] }) {
  const allPartners : Partner[] =  
   await Promise.all(
    PartnersSlugs.map(
        async (partnerSLug) =>
          await collections.partner.getBySlug(partnerSLug),
      ),
    )
  return (
    <div className="bg-gray-950 pb-12 pt-6">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto flex max-w-2xl flex-col gap-10 lg:max-w-none">
          <h2 className="text-center font-heading text-3xl font-bold text-white sm:text-4xl">
            Partners
          </h2>
          <ul className="mx-auto grid max-w-2xl grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-4 lg:gap-x-8">
            {allPartners.map((partner) => (
              <li key={partner.name} className="gap-4">
                <PartnerImage partner={partner} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
