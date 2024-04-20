import { ICONS } from "@/components/icons";
import Link from "next/link";
import { SVGProps } from "react";

const navigation = [
  {
    name: "Discord",
    href: "https://discord.gg/MEJ6TfJC2H",
    icon: (props: SVGProps<SVGSVGElement>) => ICONS["discord"],
  },
  {
    name: "X Twitter",
    href: "https://twitter.com/ForkitCommunity",
    icon: (props: SVGProps<SVGSVGElement>) => ICONS["x"],
  },
  {
    name: "Linkedin",
    href: "https://www.linkedin.com/company/fork-it-community",
    icon: (props: SVGProps<SVGSVGElement>) => ICONS["linkedin"],
  },
  {
    name: "GitHub",
    href: "https://github.com/Fork-It-Community",
    icon: (props: SVGProps<SVGSVGElement>) => ICONS["github"],
  },
];

export function Footer() {
  return (
    <footer>
      <div className="mx-auto max-w-7xl border-t border-t-gray-800 px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          {navigation.map((item) => (
            <a key={item.name} href={item.href}>
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-0 space-y-1 md:order-1 md:mt-0">
          <div className="flex items-center justify-center gap-2 md:justify-start">
            <Link className="text-xs hover:text-primary" href="/">
              Home
            </Link>
            ·
            <Link
              className="text-xs hover:text-primary"
              href="https://drive.google.com/drive/folders/1JkxgD0f6fetVdzsjGLLMexTRwRdb3Euv?usp=sharing"
            >
              Media Kit
            </Link>
            ·
            <Link
              className="text-xs hover:text-primary"
              href="/code-of-conduct"
            >
              Code of Conduct
            </Link>
          </div>
          <p className="text-center text-xs leading-5 text-gray-400">
            &copy; {new Date().getFullYear()} Fork it! Community. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
