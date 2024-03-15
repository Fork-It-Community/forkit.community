import collections from "@/content/collections";
import Link from "next/link";
import Image from "next/image";

export async function Partners() {
  const allPartners = await collections.partner.getAll();
  return (
    <div className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h2 className="font-heading text-3xl font-bold uppercase text-gray-900 sm:text-4xl">
            Partners
          </h2>
          <ul className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {allPartners.map((partner) => (
              <li key={partner.name} className="flex flex-col gap-4">
                {partner.href ? (
                  <Link
                    href={partner.href}
                    title={partner.name}
                    target="_blank"
                    rel="noreferer"
                  >
                    <Image
                      src={partner.image.src}
                      alt={partner.image.alt}
                      width={1000}
                      height={500}
                    />
                  </Link>
                ) : (
                  <Image
                    src={partner.image.src}
                    alt={partner.image.alt}
                    width={1000}
                    height={500}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
