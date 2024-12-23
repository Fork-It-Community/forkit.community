import { decorators } from "@/components/astrobook.config";
import { ExploreTheCommunity } from "@/components/ExploreTheCommunity";

export default {
  component: ExploreTheCommunity,
  decorators,
};

export const Default = {
  args: {
    title: "Home",
  },
};
