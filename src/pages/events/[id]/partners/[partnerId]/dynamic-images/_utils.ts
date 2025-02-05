import { getEventsCollection } from "@/lib/events";
import { getEntries } from "astro:content";

export const getEventPartnerStaticPaths = async () => {
  const events = await getEventsCollection();

  const partners = (
    await Promise.all(
      events.map(async (event) => {
        const sponsors = await getEntries(
          (event.data.sponsors ?? [])
            .map((partner) => partner.slug)
            .filter((p) => !!p),
        );

        const partners = await getEntries(event.data.partners ?? []);
        const coOrganizers = await getEntries(event.data.coOrganizers ?? []);

        return [...coOrganizers, ...sponsors, ...partners].map((p) => ({
          ...p,
          __event: event,
        }));
      }),
    )
  ).flat();

  return partners.map((partner) => ({
    params: { id: partner.__event.id, partnerId: partner.id },
    props: {
      partner,
      event: partner.__event,
    },
  }));
};
