import { MdMoreHoriz } from "react-icons/md";

const MainNavMobileItemMore = () => {
  return (
    <button className="flex flex-1 flex-col items-center justify-center py-3 opacity-60">
      <span className="text-2xl">
        <MdMoreHoriz />
      </span>
      <span className="text-[0.6rem] tracking-wide">More</span>
    </button>
  );
};

export default MainNavMobileItemMore;
