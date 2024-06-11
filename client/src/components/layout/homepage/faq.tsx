import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  return (
    <section className="grid items-center gap-x-4 py-14 sm:py-16 md:grid-cols-[1fr_30rem] lg:pt-28 lg:pb-36">
      <h2 className="space-x-5 self-center text-center font-serif text-[20vw] font-bold min-[300px]:space-x-7 sm:text-[17vw] md:text-[8vw] lg:text-[12vw] xl:text-[12rem]">
        <span className="inline-block animate-bounce">F</span>
        <span className="inline-block animate-bounce delay-75">A</span>
        <span className="inline-block animate-bounce">Q</span>
      </h2>

      <Accordion type="multiple" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is there a cost to use STP?</AccordionTrigger>
          <AccordionContent className="text-base">
            <abbr title="Social Travel Platform">STP</abbr> is free to use for
            all basic features, including creating an account, posting travel
            plans, and searching for trips. However, we may offer premium
            features in the future that could come with a subscription fee.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How do I contact another user?</AccordionTrigger>
          <AccordionContent className="text-base">
            Communication between users is facilitated through the travel
            request process. When you submit a travel request to join a trip,
            your contact information is shared with the trip organizer. You can
            also connect via our messaging system once both parties agree to
            travel together.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            Is my personal information secure?
          </AccordionTrigger>
          <AccordionContent className="text-base">
            Yes, we prioritize the security of our {"User's"} personal
            information. We use secure login systems with password hashing and
            follow best practices for data protection. For more information,
            please read our Privacy Policy.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>
            What if I encounter inappropriate behavior or content?
          </AccordionTrigger>
          <AccordionContent className="text-base">
            If you encounter any inappropriate behavior or content, please
            report it to us immediately contact our support team at{" "}
            <a
              href="mailto:support@stp.com"
              className="underline underline-offset-4"
            >
              support@stp.com
            </a>
            . We take such matters seriously and will take appropriate action.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
