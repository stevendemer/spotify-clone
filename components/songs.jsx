import { ClockIcon } from "@heroicons/react/outline";
import { playlistState } from "../atoms/playlist-atom";
import { useRecoilValue } from "recoil";
import Song from "./song";

const Songs = () => {
  const playlist = useRecoilValue(playlistState);

  console.log("Playlist ", playlist);

  return (
    <div>
      <div className="text-gray-400 flex items-center">
        <div className="text-sm  ml-[110px] "># TITLE</div>
        <div className="text-sm ml-[450px]">ALBUM</div>
        <div className="text-sm ml-[450px]">
          <ClockIcon className="w-4 h-4 text-white" />
        </div>
        <div className="text-sm ml-[450px]">DATE ADDED</div>
      </div>
      <div className="px-8 flex flex-col text-white pb-28">
        {playlist?.tracks.items.map((track, idx) => (
          <Song key={track.track.id} track={track.track} order={idx} />
        ))}
      </div>
    </div>
  );
};

export default Songs;
