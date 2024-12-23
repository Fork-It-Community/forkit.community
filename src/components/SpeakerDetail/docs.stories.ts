import { decorators } from "@/components/astrobook.config";
import { SpeakerDetail } from "@/components/SpeakerDetail";

export default {
  component: SpeakerDetail,
  decorators,
};

export const Default = {
  args: {
    speaker: {
      name: "Andrey Sitnik",
      avatar: "/speakers/andrey-sitnik.jpg",
      job: "Creator of Autoprefixer, PostCSS, Browserslist",
      socials: [
        { type: "x", href: "https://twitter.com/sitnikcode" },
        { type: "github", href: "https://github.com/ai" },
      ],
      company: { title: "Evil Martians", href: "https://evilmartians.com/" },
    },
  },
};
