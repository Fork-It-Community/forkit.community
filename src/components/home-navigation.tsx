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
            <a href={item.href} key={item.name}>
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};
