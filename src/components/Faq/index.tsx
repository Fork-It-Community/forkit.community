import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { CollectionEntry } from "astro:content";

export const FAQ = (
  props: Readonly<{ faq: CollectionEntry<"events">["data"]["faq"] }>,
) => {
  return (
    <div className="relative py-16 md:py-32">
      <article className="mx-auto max-w-3xl px-6 lg:px-8">
        <h2
          id="faq"
          className="scroll-mt-32 font-heading text-2xl font-medium uppercase tracking-widest"
        >
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          <dl className="mt-10">
            {props.faq?.map((item) => (
              <AccordionItem key={item.question} value={item.question}>
                <dt>
                  <AccordionTrigger className="hover:text-neutral-400 text-left font-heading text-lg font-semibold tracking-wide transition hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                </dt>
                <dd>
                  <AccordionContent className="text-base text-gray-300">
                    <div dangerouslySetInnerHTML={{ __html: item.answer }} />
                  </AccordionContent>
                </dd>
              </AccordionItem>
            ))}
          </dl>
        </Accordion>
      </article>
    </div>
  );
};
