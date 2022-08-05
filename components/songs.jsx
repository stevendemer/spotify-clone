import { ClockIcon } from "@heroicons/react/outline";
import Song from "./song";

const Songs = ({ playlist }) => {
  console.log("Playlist ", playlist);

  return (
    <>
      <div className="text-gray-400 gap-x-10 space-x-52 grid grid-rows-2 grid-cols-4">
        <div className="text-sm pl-24"># TITLE</div>
        <div className="text-sm">ALBUM</div>
        <div className="text-sm">
          <ClockIcon className="w-4 h-4 text-white" />
        </div>
        <div className="text-sm ">DATE ADDED</div>
      </div>
      <hr className="border-t-[1px] w-11/12 ml-10 border-gray-700" />
      <div className="px-8 flex flex-col text-white pb-28">
        {playlist?.tracks.items.map((track, idx) => (
          <Song key={track.track.id} track={track.track} order={idx} />
        ))}
      </div>
    </>
  );
};

export default Songs;
