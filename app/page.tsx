import Gradient from "@/components/Gradient";
import PlaylistCard from "@/components/PlayListCard";
import { playlists } from "@/lib/data";

export default function Home() {
  const greeting =
    new Date().getHours() < 12
      ? "Good Morning"
      : new Date().getHours() < 18
        ? "Good Afternoon"
        : "Good Evening";

  return (
    <Gradient>
      <h1 className="mb-6 text-4xl font-bold">{greeting}</h1>

      <div className="grid-cols-fill-44 grid gap-4">
        {playlists.map((playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </Gradient>
  );
}
