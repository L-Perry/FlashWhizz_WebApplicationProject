import { SearchIcon, CircleUserRoundIcon } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";

const Header: React.FC = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query.trim()) return;

    const path = `quiz/${query}`;
    navigate(path);
  };

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
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            placeholder="Search quizzes..."
            className="h-60px w-full rounded-full bg-white px-4 py-2 pr-12 text-black focus:outline-none focus:ring-1 focus:ring-primary"
            style={{
              border: "solid",
              borderWidth: "5px",
              borderColor: "var(--palette-2)",
            }}
          />

          <SearchIcon
            size={40}
            color="var(--palette-4)"
            strokeWidth={2}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={handleSearch}
          />
        </div>
        <Link to="/profile">
          <CircleUserRoundIcon
            size={96}
            color="var(--palette-4)"
            strokeWidth={1.5}
            className="cursor-pointer"
          />
        </Link>
      </div>

    </header>
  );
};

export default Header;

