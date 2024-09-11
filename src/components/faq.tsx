import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { Event } from "@/content/events/events"

export const FaqComponent = (props: Readonly<{ event: Event }>) => {
  return (
    <div className="py-16" id="faq">
      <article className="mx-auto max-w-3xl px-6 lg:px-8">
        <h2 className="font-heading font-bold text-3xl text-center sm:text-4xl">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          <dl className="mt-10">
            {props.event.faq?.map((item) => (
              <AccordionItem key={item.question} value={item.question}>
                <dt>
                  <AccordionTrigger className="transition text-xl font-semibold hover:no-underline hover:text-neutral-400 text-left">
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
  )
}