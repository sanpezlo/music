import HomeIcon from "@/icons/HomeIcon";
import LibraryIcon from "@/icons/LibraryIcon";
import SearchIcon from "@/icons/SearchIcon";
import Link from "next/link";

export default function AsideMenu() {
  return (
    <nav className="flex flex-1 flex-col gap-2 overflow-y-auto">
      <Container>
        <ul>
          <MenuItem href="/">
            <HomeIcon />
            Home
          </MenuItem>

          <MenuItem href="/">
            <SearchIcon />
            Search
          </MenuItem>
        </ul>
      </Container>

      <Container className="flex flex-1 flex-col overflow-y-auto">
        <ul className="flex flex-1 flex-col overflow-y-auto">
          <MenuItem href="/library">
            <LibraryIcon />
            Your Library
          </MenuItem>

          <div className="overflow-y-auto"></div>
        </ul>
      </Container>
    </nav>
  );
}

function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`"rounded-lg bg-neutral-800 p-2 ${className}`}>
      {children}
    </div>
  );
}

function MenuItem({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center gap-4 px-5 py-3 font-medium text-neutral-300 transition duration-300 hover:text-white focus:text-white"
      >
        {children}
      </Link>
    </li>
  );
}
