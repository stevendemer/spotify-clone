import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { useRecoilState, useRecoilValue } from "recoil";
import { shuffle } from "lodash";
import useSpotify from "../hooks/useSpotify";
import { playlistIdState, playlistState } from "../atoms/playlist-atom";
import Songs from "./songs";

const bgColors = [
  "from-yellow-500",
  "from-red-500",
  "from-orange-500",
  "from-lime-500",
  "from-emerald-500",
  "from-sky-500",
  "from-rose-500",
];

export default function Menu() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [colorMode, setColorMode] = useState("");
  const playlistId = useRecoilValue(playlistIdState); // read only
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  useEffect(() => {
    setColorMode(shuffle(bgColors).pop());
  }, [playlistId]);

  console.log(
    `The playlist id is ${playlistId} and the playlist is ${playlist}`
  );

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((error) => {
        console.log(`Error getting the playlist ${error}`);
      });
  }, [spotifyApi, playlistId]);

  return (
    <div className="h-screen flex-grow overflow-y-scroll scrollbar scrollbar-hide text-white text-3xl w-full">
      <header className="absolute top-5 right-8">
        <div
          onClick={signOut}
          className="flex items-center justify-center relative py-4 h-[32px] hover:bg-opacity-50 transition-colors duration-300 space-x-2 cursor-pointer bg-black rounded-full"
        >
          {/* User image and logout button */}
          <img
            alt=""
            src={session?.user.image}
            className="rounded-full w-8 h-8"
          />
          <div className="text-sm font-semibold mr-4">{session?.user.name}</div>
          <ChevronDownIcon className="text-zinc-200 w-6 h-6  pr-2" />
        </div>
      </header>
      {/* background color and playlist cards */}
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${colorMode} h-80 text-white p-8`}
      >
        <img
          className="h-48 w-48 shadow-2xl"
          src={playlist?.images[0]?.url}
          alt="playlist covers"
        />
        <div>
          <p className="text-xs font-bold">Playlist</p>
          <h2 className=" font-bold text-xl md:text-3xl xl:text-8xl">
            {playlist?.name}
          </h2>
        </div>
      </section>
      <Songs />
    </div>
  );
}
