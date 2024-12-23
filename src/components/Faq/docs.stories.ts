import { FAQ } from "@/oldcomponents/Faq";

export default {
  component: FAQ,
};
export const Default = {
  args: {
    faq: [
      {
        question: "How many tickets are available for the event?",
        answer: "There is 50 early bird tickets and 200 tickets in total.",
      },
      {
        question: "In which languages will the talks be delivered?",
        answer:
          "The talks will be delivered in both French and English, with live transcription and translation provided.",
      },
    ],
  },
};
