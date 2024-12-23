import { EventCard } from "@/components/EventCard";

export default {
  component: EventCard,
};

export const Default = {
  args: {
    activity: {
      title: "Fork it! Rouen 2024",
      name: "Rouen, France",
      date: new Date("2024-06-07T00:00:00.000Z"),
      location: {
        name: "Le Village By Ca Rouen Vallée De Seine",
        address: "107 All. François Mitterrand, 76100, Rouen",
      },
      excerpt:
        "Come meet more than 200 people sharing their real professional lives and feedback. No nonsense, no divas, just genuine individuals discussing real problems and solutions. From students eager to learn more to professionals wanting to share their experiences, come enjoy a fulfilling day with a dozen conferences in the heart of Rouen.",
      image: {
        src: "/events/2024-06-07-rouen.jpg",
        alt: "Gros Horloge, Rouen, France",
      },
      cfp: {
        href: "https://conference-hall.io/public/event/1GyOS8KvW02suD6jQmjz",
        endDate: new Date("2024-04-01T23:59:00.000Z"),
      },
      tickets: {
        href: "https://my.weezevent.com/fork-it-rouen-2024",
        offers: [],
      },
      prospectus: {
        href: "https://drive.google.com/drive/folders/1ZIwH4J9gDbBXbG10a_Q4fSGwx0DFqXpk?usp=sharing",
        endDate: new Date("2024-05-31T23:59:00.000Z"),
      },
      published: true,
      sponsoringLevels: ["SILVER", "BRONZE", "LOGISTIC"],
      sponsors: [],
      speakers: [],
      talks: [],
      faq: [],
      status: "EventScheduled",
      attendanceMode: "OfflineEventAttendanceMode",
      schedule: [],
      feedback: {
        link: "https://openfeedback.io/fork-it-community-rouen-2024/2024-06-07",
      },
      content: {},
      subPages: [],
    },
  },
};
