import ForktItYellow from "/public/forkit-medium.svg";

const navigations = [
  { name: "Tab", href: "#" },
  { name: "Tab", href: "#" },
  { name: "Tab", href: "#" },
  { name: "Tab", href: "#" },
];
export const HomeNavigation = () => {
  return (
    <nav className="mx-40 rounded-lg bg-neutral-900 bg-opacity-40 px-4 py-2">
      <div className="flex items-center justify-between">
        <img src={ForktItYellow.src} alt="" width="168px" height="18px" />
        <div className="flex items-center justify-end gap-6 font-medium text-primary">
          {navigations.map((item) => (
            <a
              href={item.href}
              key={item.name}
              className="relative inline-block px-4 py-2 text-primary after:absolute after:left-0 after:right-0 after:block after:h-[3px] after:w-full after:origin-center after:scale-x-0 after:bg-primary after:transition after:duration-300 after:content-[''] hover:after:scale-x-100"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};
