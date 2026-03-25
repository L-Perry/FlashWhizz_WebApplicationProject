import SearchIcon from "./icons/search";
import CircleUserRoundIcon from "./icons/circle-user-round";

const Header: React.FC = () => {
  return (
    <header id="header" className="flex items-center justify-between px-4 py-2">
      <h1
        className="jersey-25-regular"
        style={{ fontSize: '6rem', color: 'var(--palette-1)', WebkitTextStrokeWidth: '0.15rem', WebkitTextStrokeColor: 'black' }}>
          FlashWhizz
      </h1>
      <div id="navigation" className="flex items-center gap-4">
        <div id="search" className="relative min-w-50">
          <input
            type="text"
            placeholder=""
            className="h-60px w-full rounded-full bg-white px-4 py-2 pr-12 text-black focus:outline-none focus:ring-1 focus:ring-primary"
            style={{border: 'solid', borderWidth: '5px', borderColor: 'var(--palette-2)'}}
          />
          <input type="button" value="" />
          <SearchIcon
            size={40}
            color="var(--palette-4)"
            strokeWidth={2}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
          />
        </div>
        <CircleUserRoundIcon
          size={96}
          color="var(--palette-4)"
          strokeWidth={1.5}
          className="cursor-pointer"
          />
      </div>
      
    </header>
  );
};

export default Header;

