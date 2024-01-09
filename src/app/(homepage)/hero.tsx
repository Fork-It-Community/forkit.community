import { Button } from "@/components/ui/button";
import Image from "next/image";
import ImgForkItLogo from "@/../public/forkit-medium.svg";
import HeroImage from "./hero.jpg";
import { MailIcon } from "lucide-react";

export function Hero() {
  return (
    <div className="relative">
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="px-6 pb-12 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-48 xl:col-span-6">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <Image className="w-40" src={ImgForkItLogo} alt="Fork it!" />

            <h1 className="mt-20 text-4xl font-medium sm:mt-10 sm:text-6xl font-heading uppercase text-balance">
              Global
              <br /> Developer
              <br /> Conferences
            </h1>
            <p className="mt-4 text-lg text-gray-400 text-balance max-w-[40ch]">
              <strong className="text-white font-medium">
                Fork it! Community
              </strong>
              ’s mission is to share computer science knowledge through
              worldwide events.
            </p>
            <div className="mt-8 flex items-center gap-4 flex-wrap">
              <Button size="lg" asChild className="w-full sm:w-auto">
                <a href="https://discord.gg/MEJ6TfJC2H" target="_blank">
                  <svg
                    fill="currentColor"
                    role="img"
                    viewBox="0 0 24 24"
                    className="size-4 mr-2"
                  >
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"></path>
                  </svg>
                  Join us on Discord
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="w-full sm:w-auto"
              >
                <a href="https://tally.so/r/wz7zPZ" target="_blank">
                  <MailIcon size="1em" className="mr-2" />
                  Keep in touch
                </a>
              </Button>
            </div>
          </div>
        </div>
        <div className="relative m-auto lg:absolute lg:inset-0 lg:left-1/2 lg:mr-0 logo-mask">
          <Image
            priority
            className="aspect-[3/2] w-full bg-primary text-gray-900 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
            src={HeroImage}
            alt="Speaker giving a tech talk in from of attendees"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </div>
  );
}
