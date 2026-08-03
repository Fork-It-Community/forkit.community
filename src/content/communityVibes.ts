import franceImage from "@/content/countries/france/images/image-1.jpg";
import tunisiaImage from "@/content/countries/tunisia/images/image-2.jpg";
import vietnamImage from "@/content/countries/vietnam/images/image-2.jpeg";
import franceImage2 from "@/content/countries/france/images/image-4.jpg";
import kualaImage from "@/content/events/2025-malaysia-kuala-lumpur/images/image3.jpg";
import forkids from "@/content/for-kids-events/2025-france-rouen-2/images/image2.jpg";

// A curated selection of pictures from events and meetups across the
// worldwide Fork it! Community. Displayed in the "Community vibes" section
// on the home page.
export const COMMUNITY_VIBES_IMAGES = [
  { src: franceImage, alt: "Fork it! community event in France" },
  { src: tunisiaImage, alt: "Fork it! community event in Tunisia" },
  { src: vietnamImage, alt: "Fork it! community event in Vietnam" },
  { src: franceImage2, alt: "Fork it! community meetup in France" },
  {
    src: kualaImage,
    alt: "Fork it! community event in Kuala Lumpur, Malaysia",
  },
  { src: forkids, alt: "Fork it! For Kids event in Rouen, France" },
] as const;
