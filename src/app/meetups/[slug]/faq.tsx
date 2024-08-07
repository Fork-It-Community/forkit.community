import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Meetup } from "@/content/collections";

export function Faq(props: Readonly<{ meetup: Meetup }>) {
  return (
    <div className="bg-gray-900 py-16" id="faq">
      <article className="mx-auto max-w-3xl px-6 lg:px-8">
        <h2 className="text-center font-heading text-3xl font-bold sm:text-4xl">
          Frequently asked questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          <dl className="mt-10">
            {props.meetup.faq?.map((item) => (
              <AccordionItem key={item.question} value={item.question}>
                <dt>
                  <AccordionTrigger className="text-xl font-semibold">
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
}
