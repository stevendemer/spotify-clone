import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";
import { useRecoilState, useRecoilValue } from "recoil";
import { shuffle } from "lodash";
import useSpotify from "../hooks/useSpotify";
import { playlistIdState, playlistState } from "../atoms/playlist-atom";
import Songs from "./songs";
import Link from "next/link";

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
  const [colorMode, setColorMode] = useState("");
  const playlistId = useRecoilValue(playlistIdState); // read only
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const [toggle, setToggle] = useState(false);
  const spotifyApi = useSpotify();

  useEffect(() => {
    setColorMode(shuffle(bgColors).pop());
  }, [playlistId]);

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

  // useEffect(() => {
  //   spotifyApi
  //     .getMyDevices()
  //     .then((data) => console.log(data.body.devices[0].name))
  //     .catch((err) => console.log("Something went wrong ", err));
  // }, []);

  return (
    <div className="h-screen relative w-full flex-grow overflow-y-scroll scrollbar scrollbar-hide text-white text-3xl mb-10 ">
      <header className="absolute top-0 left-0 right-0 overflow-hidden ">
        <div className="flex items-center justify-between gap-4 relative  py-6 h-[32px]  transition-colors duration-300 space-x-2 rounded-full">
          <div className="flex fixed items-center justify-start px-4 space-x-6  text-white ">
            <ChevronLeftIcon className="cursor-pointer w-6 h-6 rounded-full  " />
            <ChevronRightIcon className="cursor-pointer w-6 h-6 rounded-full " />
          </div>
          {/* User image and logout button */}
          <div
            onClick={signOut}
            className="cursor-pointer fixed right-4 top-4 flex items-center space-x-2 transition-all delay-100 hover:text-white text-zinc-300  bg-black rounded-full"
          >
            <img
              alt=""
              src={session?.user.image}
              className="rounded-full w-8 h-8  "
            />
            <div className="text-sm font-semibold mr-4">
              {session?.user.name}
            </div>
            <ChevronDownIcon className=" w-6 h-6  pr-2" />
          </div>
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
