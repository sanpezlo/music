import { CardPlayButton } from "@/components/CardPlayButton";
import Gradient from "@/components/Gradient";
import MusicsTable from "@/components/MusicTable";
import { playlists, songs } from "@/lib/data";
import { notFound } from "next/navigation";

export default function PlaylistPage({ params }: { params: { id: string } }) {
  const playlist = playlists.find((playlist) => playlist.id === params.id);

  if (!playlist) {
    notFound();
  }

  const artists = playlist.artists.join(", ");

  const playlistSongs = songs.filter(
    (song) => song.albumId === playlist.albumId,
  );

  return (
    <Gradient
      color={playlist.color.dark}
      className="flex flex-col"
      style={
        {
          "view-transition-name": `playlist-${playlist.id}-box`,
        } as React.CSSProperties
      }
    >
      <header className="mt-12 flex flex-row gap-8 px-6">
        <picture className="aspect-square h-52 w-52 flex-none">
          <img
            src={playlist.cover}
            alt={`Cover of ${playlist.title} by ${artists}`}
            className="h-full w-full rounded-md object-cover shadow-lg"
            style={
              {
                "view-transition-name": `playlist-${playlist.id}-image`,
              } as React.CSSProperties
            }
          />
        </picture>

        <div className="flex flex-col justify-between gap-2">
          <h2 className="flex flex-1 items-end">Playlist</h2>

          <h1
            className="block text-5xl font-bold text-white"
            style={
              {
                "view-transition-name": `playlist-${playlist.id}-title`,
              } as React.CSSProperties
            }
          >
            {playlist.title}
          </h1>

          <div className="flex flex-1 flex-col justify-end text-sm font-normal text-gray-300">
            <span
              style={
                {
                  "view-transition-name": `playlist-${playlist.id}-artists`,
                } as React.CSSProperties
              }
            >
              {playlist?.artists.join(", ")}
            </span>

            <p className="mt-1">
              <span className="text-white">
                {playlistSongs.length} canciones
              </span>
              , 3 h aproximadamente
            </p>
          </div>
        </div>
      </header>

      <div className="pl-6 pt-6">
        <CardPlayButton id={playlist.id} size="large" />
      </div>

      <div className="relative z-10 px-6 pt-10"></div>

      <div className="absolute inset-0 -z-[1] bg-gradient-to-t from-zinc-900 via-zinc-900/80"></div>

      <section className="p-6">
        <MusicsTable songs={playlistSongs} />
      </section>
    </Gradient>
  );
}
