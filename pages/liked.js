import { useEffect, useState } from "react";
import Song from "../components/song";
import useSpotify from "../hooks/useSpotify";
import { ClockIcon } from "@heroicons/react/outline";
import { shuffle } from "lodash";
import { useSession } from "next-auth/react";

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
    <div className="relative  h-screen w-full flex-grow overflow-y-scroll scrollbar-none bg-black text-white ">
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${colorMode} h-80 px-10 py-20 text-white`}
      >
        <img
          className="h-48 w-48 shadow-2xl"
          src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"
          alt="playlist covers"
        />
        <div className="">
          <p className="text-lg font-bold">Playlist</p>
          <h2 className="pb-10 font-bold text-xl md:text-3xl xl:text-8xl">
            Liked Songs
          </h2>
          <div className="flex items-center space-x-2">
            <img
              className="w-8 h-8  rounded-full"
              src={session?.user.image}
              alt=""
            />
            <div className="text-xs font-bold">{session?.user.name}</div>
            <div className="text-xs">50 songs</div>
          </div>
        </div>
      </section>
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
