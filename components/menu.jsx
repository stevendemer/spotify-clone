import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import {
  ChevronDownIcon,
  ClockIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";
import { useRecoilState, useRecoilValue } from "recoil";
import { shuffle } from "lodash";
import useSpotify from "../hooks/useSpotify";
import { playlistIdState, playlistState } from "../atoms/playlist-atom";
import Song from "../components/song";
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

const Menu = () => {
  const { data: session } = useSession();
  const [colorMode, setColorMode] = useState("");
  const playlistId = useRecoilValue(playlistIdState); // read only
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const spotifyApi = useSpotify();

  useEffect(() => {
    setColorMode(shuffle(bgColors).pop());
  }, [playlistId]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
        console.log("The playlist is ", data.body);
      })
      .catch((error) => {
        console.log(`Error getting the playlist ${error}`);
      });
  }, [spotifyApi, playlistId]);

  return (
    <div className="relative h-screen w-full flex-grow overflow-y-scroll scrollbar-thumb-white bg-black text-white ">
      <Banner />
      {/* <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${colorMode} h-80 px-10 py-20 text-white`}
      >
        <img
          className="h-48 w-48 shadow-2xl"
          src={playlist?.images[0].url}
          alt="playlist covers"
        />
        <div className="">
          <p className="text-xl font-bold">Playlist</p>
          <h2 className="pb-10 font-bold text-xl md:text-2xl xl:text-5xl">
            {playlist?.name}
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
      </section> */}
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
        {playlist?.tracks?.items.map((track, idx) => (
          <Song key={track.track.id} track={track.track} order={idx} />
        ))}
      </div>
    </div>
  );
};

export default Menu;
