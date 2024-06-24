import Gradient from "@/components/Gradient";
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
    <Gradient color={playlist.color.dark} className="flex flex-col">
      <header className="mt-12 flex flex-row gap-8 px-6">
        <picture className="aspect-square h-52 w-52 flex-none">
          <img
            src={playlist.cover}
            alt={`Cover of ${playlist.title} by ${artists}`}
            className="h-full w-full rounded-md object-cover shadow-lg"
          />
        </picture>

        <div className="flex flex-col justify-between gap-2">
          <h2 className="flex flex-1 items-end">Playlist</h2>

          <h1 className="block text-5xl font-bold text-white">
            {playlist.title}
          </h1>

          <div className="flex flex-1 flex-col justify-end text-sm font-normal text-gray-300">
            <span>{playlist?.artists.join(", ")}</span>

            <p className="mt-1">
              <span className="text-white">
                {playlistSongs.length} canciones
              </span>
              , 3 h aproximadamente
            </p>
          </div>
        </div>
      </header>

      <div></div>
    </Gradient>
  );
}
