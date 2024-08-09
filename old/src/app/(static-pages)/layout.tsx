import ImgForkItLogo from "@/../public/forkit-medium.svg";
import Image from "next/image";
import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header>
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <Link href="/">
            <span className="sr-only">Fork it! Community</span>
            <Image className="w-40" src={ImgForkItLogo} alt="" />
          </Link>
        </nav>
      </header>
      {children}
    </>
  );
};

export default Layout;
