import collections from "@/content/collections";

export async function Sponsors() {
  const sponsors = await collections.sponsor.getAll();

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="-mx-6 grid grid-cols-2 gap-0.5 overflow-hidden sm:mx-0 sm:rounded-2xl md:grid-cols-3">
          {sponsors.map((sponsor, index) => (
            <div className="p-8 sm:p-10" key={index}>
              {/* <Image
                className="max-h-12 w-full object-contain"
                src={sponsor.imageUrl}
                alt={sponsor.name}
                width={158}
                height={48}
              /> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
