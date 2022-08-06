import { useEffect, useState } from "react";
import Song from "../components/song";
import useSpotify from "../hooks/useSpotify";
import { ClockIcon } from "@heroicons/react/outline";
import { shuffle } from "lodash";
import { useSession } from "next-auth/react";
import Banner from "../components/banner";

const bgColors = [
  "from-yellow-500",
  "from-red-500",
  "from-orange-500",
  "from-lime-500",
  "from-emerald-500",
  "from-sky-500",
  "from-rose-500",
];

export default function LikedPage() {
  const [tracks, setTracks] = useState([]);
  const spotifyApi = useSpotify();
  const [colorMode, setColorMode] = useState("");
  const { data: session } = useSession();

  useEffect(() => {
    setColorMode(shuffle(bgColors).pop());
  }, []);

  useEffect(() => {
    spotifyApi
      .getMySavedTracks({
        limit: 50,
        offset: 2,
      })
      .then((data) => {
        console.log(data.body.items);
        setTracks(data.body?.items);
      })
      .catch((err) => console.log(err));
  }, [spotifyApi]);

  return (
    <div className="w-full h-screen  overflow-y-scroll scrollbar-none ">
      <Banner title="Liked Songs" />
      <div className="text-gray-400 gap-x-10 space-x-60 grid grid-rows-2 grid-cols-4">
        <div className="text-sm pl-24"># TITLE</div>
        <div className="text-sm">ALBUM</div>
        <div className="text-sm">
          <ClockIcon className="w-4 h-4 text-white" />
        </div>
        <div className="text-sm ">DATE ADDED</div>
      </div>
      <hr className="border-t-[1px] w-11/12 ml-10 border-gray-700" />
      <div className="px-8 flex flex-col text-white pb-28">
        {tracks.map((track, idx) => (
          <Song key={track.track.id} track={track.track} order={idx} />
        ))}
      </div>
    </div>
  );
}
