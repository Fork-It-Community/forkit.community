import { MeetupCard } from "@/components/MeetupCard";

export default {
  component: MeetupCard,
};
export const Default = {
  args: {
    activity: {
      title: "Fork it! Meetups Tunis 2024",
      name: "Meetup Tunis, Tunisia",
      date: new Date("2024-09-24T00:00:00.000Z"),
      location: {
        name: "COMWORK",
        address: "17 rue Mahmoud El Matri, Mutuelleville, 1053, Tunis",
      },
      excerpt:
        "For the first time in Tunisia, Fork It! is organizing a meetup! The goal is to bring together web development and UX enthusiasts for meetings focused on sharing experiences and constructive discussions. Our community continues to grow and has chosen Tunisia to host its first conference day in Africa. Follow us and sign up for the meetup to be part of this unique experience!\n",
      image: {
        src: "/meetups/tunis-tunisia-09-2024.jpg",
        alt: "Habib Bourguiba Avenue, Tunis, Tunisia",
      },
      published: true,
      sponsoringLevels: ["SILVER"],
      sponsors: [],
      speakers: ["idriss-neumann", "sofiane-boukhris"],
      talks: ["deployment-as-a-service", "concevoir-avec-efficacite"],
      status: "EventScheduled",
      attendanceMode: "OfflineEventAttendanceMode",
      schedule: [],
    },
  },
};
