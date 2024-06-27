import { Playlist } from "@/lib/data";
import { Link } from "next-view-transitions";
import { CardPlayButton } from "@/components/CardPlayButton";

export default function PlaylistCard({ playlist }: { playlist: Playlist }) {
  const artists = playlist.artists.join(", ");

  return (
    <article className="group relative rounded-md">
      <div className="absolute bottom-16 right-4 translate-y-4 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <CardPlayButton id={playlist.id} />
      </div>

      <Link
        href={"/playlist/" + playlist.id}
        className="flex flex-col gap-2 rounded-md p-2 transition duration-300 hover:bg-neutral-800 focus:bg-neutral-800"
        style={
          {
            "view-transition-name": `playlist-${playlist.id}-box`,
          } as React.CSSProperties
        }
      >
        <picture className="aspect-square h-auto w-full flex-none">
          <img
            src={playlist.cover}
            alt={`Cover of ${playlist.title} by ${artists}`}
            className="h-full w-full rounded-md object-cover"
            style={
              {
                "view-transition-name": `playlist-${playlist.id}-image`,
              } as React.CSSProperties
            }
          />
        </picture>

        <div className="flex flex-auto flex-col truncate">
          <h4
            className="truncate text-sm text-white"
            style={
              {
                "view-transition-name": `playlist-${playlist.id}-title`,
              } as React.CSSProperties
            }
          >
            {playlist.title}
          </h4>
          <span
            className="truncate text-xs text-neutral-400"
            style={
              {
                "view-transition-name": `playlist-${playlist.id}-artists`,
              } as React.CSSProperties
            }
          >
            {artists}
          </span>
        </div>
      </Link>
    </article>
  );
}
