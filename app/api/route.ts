export const dynamic = "force-dynamic";

import { allPlaylists, songs as allSongs } from "@/lib/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) return new Response("Missing ID", { status: 400 });

  const playlist = allPlaylists.find((playlist) => playlist.id === id);

  if (!playlist) return new Response("Playlist not found", { status: 404 });

  const songs = allSongs.filter((song) => song.albumId === playlist.albumId);

  return new Response(JSON.stringify({ playlist, songs }), {
    headers: { "Content-Type": "application/json" },
  });
}
