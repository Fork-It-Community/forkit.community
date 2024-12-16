import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { CollectionEntry } from "astro:content";

import "@/styles/globals.css";

export const FAQ = (
  props: Readonly<{ faq: CollectionEntry<"events">["data"]["faq"] }>,
) => {
  return (
    <div className="py-16" id="faq">
      <article className="mx-auto max-w-3xl px-6 lg:px-8">
        <h2 className="text-center font-heading text-3xl font-bold sm:text-4xl">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          <dl className="mt-10">
            {props.faq?.map((item) => (
              <AccordionItem key={item.question} value={item.question}>
                <dt>
                  <AccordionTrigger className="text-left text-xl font-semibold transition hover:text-neutral-400 hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                </dt>
                <dd>
                  <AccordionContent className="text-base text-gray-300">
                    {item.answer}
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
