import TimeIcon from "@/icons/TimeIcon";
import { Song } from "@/lib/data";

export default function MusicsTable({ songs }: { songs: Song[] }) {
  return (
    <table className="min-w-full table-auto divide-y divide-gray-500/20 text-left">
      <thead>
        <tr className="text-sm text-zinc-400">
          <th className="px-4 py-2 font-light">#</th>
          <th className="px-4 py-2 font-light">Title</th>
          <th className="px-4 py-2 font-light">Album</th>
          <th className="px-4 py-2 font-light">
            <TimeIcon />
          </th>
        </tr>
      </thead>

      <tbody>
        <tr className="h-[16px]"></tr>
        {songs.map((song, index) => (
          <tr
            key={song.id}
            className="border-spacing-0 overflow-hidden text-sm font-light text-gray-300 transition duration-300 hover:bg-white/10"
          >
            <td className="w-5 rounded-bl-lg rounded-tl-lg px-4 py-2">
              {index + 1}
            </td>
            <td className="flex gap-3 px-4 py-2">
              <picture className="">
                <img src={song.image} alt={song.title} className="h-11 w-11" />
              </picture>
              <div className="flex flex-col">
                <h3 className="text-base font-normal text-white">
                  {song.title}
                </h3>
                <span>{song.artists.join(", ")}</span>
              </div>
            </td>
            <td className="px-4 py-2">{song.album}</td>
            <td className="rounded-br-lg rounded-tr-lg px-4 py-2">
              {song.duration}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
