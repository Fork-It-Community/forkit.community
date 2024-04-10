import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Event } from "@/content/collections";

export function Faq(props: Readonly<{ event: Event }>) {
  return (
    <div className="bg-gray-950 py-16">
      <article className="mx-auto max-w-3xl px-6 lg:px-8">
        <h2 className="text-center font-heading text-3xl font-bold sm:text-4xl">
          Frequently asked questions
        </h2>
        <dl className="mt-10">
          {props.event.faq?.map((item) => (
            <Accordion
              type="single"
              collapsible
              className="w-full"
              key={item.question}
            >
              <AccordionItem value={item.question}>
                <AccordionTrigger className=" text-xl font-semibold">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-gray-300">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </dl>
      </article>
    </div>
  );
}
