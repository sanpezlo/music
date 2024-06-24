import Gradient from "@/components/Gradient";
import { playlists } from "@/lib/data";
import { notFound } from "next/navigation";

export default function PlaylistPage({ params }: { params: { id: string } }) {
  const playlist = playlists.find((playlist) => playlist.id === params.id);

  if (!playlist) {
    notFound();
  }

  return (
    <Gradient color={playlist.color.dark}>
      <h1 className="mb-6 text-4xl font-bold">{playlist.title}</h1>
    </Gradient>
  );
}
