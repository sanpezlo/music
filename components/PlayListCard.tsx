import { Playlist } from "@/lib/data";
import Link from "next/link";

export default function PlaylistCard({ playlist }: { playlist: Playlist }) {
  const artists = playlist.artists.join(", ");

  return (
    <article className="rounded-md">
      <Link
        href={"/playlist/" + playlist.id}
        className="flex flex-col gap-2 rounded-md p-2 hover:bg-neutral-800 focus:bg-neutral-800"
      >
        <picture className="aspect-square h-auto w-full flex-none">
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
    </article>
  );
}
