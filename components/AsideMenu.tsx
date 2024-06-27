import HomeIcon from "@/icons/HomeIcon";
import LibraryIcon from "@/icons/LibraryIcon";
import SearchIcon from "@/icons/SearchIcon";
import { Playlist, playlists } from "@/lib/data";
import { Link } from "next-view-transitions";

export default function AsideMenu() {
  return (
    <nav className="flex flex-1 flex-col gap-2 overflow-y-auto">
      <Container>
        <ul className="p-2">
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
          <MenuItem href="/">
            <LibraryIcon />
            Your Library
          </MenuItem>

          <div className="scrollbar-thin overflow-y-auto p-2 hover:[--scrollbar-thumb:#404040]">
            {playlists.map((playlist) => (
              <MunuCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        </ul>
      </Container>
    </nav>
  );
}

function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-lg bg-neutral-900 ${className}`}>{children}</div>
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
        className="flex items-center gap-4 px-5 py-3 font-medium text-neutral-400 transition duration-300 hover:text-white focus:text-white"
      >
        {children}
      </Link>
    </li>
  );
}

function MunuCard({ playlist }: { playlist: Playlist }) {
  const artists = playlist.artists.join(", ");

  return (
    <Link
      href={"/playlist/" + playlist.id}
      className="flex items-center gap-2 rounded-md p-2 hover:bg-neutral-800 focus:bg-neutral-800"
    >
      <picture className="h-12 w-12 flex-none">
        <img
          src={playlist.cover}
          alt={`Cover of ${playlist.title} by ${artists}`}
          className="h-full w-full rounded-md object-cover"
        />
      </picture>

      <div className="flex flex-auto flex-col truncate">
        <h4 className="truncate text-sm text-white">{playlist.title}</h4>
        <span className="truncate text-xs text-neutral-400">{artists}</span>
      </div>
    </Link>
  );
}
