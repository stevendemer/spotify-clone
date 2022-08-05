import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  BookmarkIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useState, useEffect } from "react";
import { userStateId } from "../atoms/user-atom";
import { playlistIdState } from "../atoms/playlist-atom";
import Link from "next/link";
import useSpotify from "../hooks/useSpotify";
import { useRouter } from "next/router";

const Sidebar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  const [userId, setUserId] = useRecoilState(userStateId);
  const spotifyApi = useSpotify();

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      // user is still registered
      spotifyApi
        .getUserPlaylists()
        .then((data) => {
          setPlaylists(data.body?.items);
        })
        .catch((err) => console.log("Error getting the playlists ", err));
    }
  }, [spotifyApi]);

  return (
    <div className="text-xs pb-28 overflow-y-scroll scrollbar-track-black scrollbar-thumb-zinc-600 scrollbar-thin bg-black outline-none  h-screen w-72 md:text-[0.875rem] lg:text-lg text-gray-500">
      <div className="space-y-4">
        {/* Logo  */}
        <div className="flex items-center pb-3 justify-start  cursor-pointer">
          <img
            className="w-22 mt-4 h-[40px]"
            src="/images/spo_logo.png"
            alt="spotify logo"
          />
          <div className="text-2xl tracking-wider text-white pt-3 font-bold">
            <h2>Spotify</h2>
          </div>
        </div>
        {/* Links */}
        <div className="space-y-4 ml-2 text-sm md:text-xl focus:outline-none focus:ring-none">
          <button
            onClick={() => router.push("/")}
            className="flex  items-center hover:text-white focus:text-white space-x-2"
          >
            <HomeIcon className="h-[24px] w-[24px]" />
            <p>Home</p>
          </button>
          <button
            onClick={() => router.push("/browse")}
            className="flex items-center hover:text-white focus:text-white space-x-2"
          >
            <SearchIcon className="h-[24px] w-[24px]" />
            <p>Search</p>
          </button>
          <button
            onClick={() => router.push("/library")}
            className="flex items-center hover:text-white focus:text-white space-x-2"
          >
            <LibraryIcon className="h-[24px] w-[24px]" />
            <p>Library</p>
          </button>
        </div>
        {/* Second links */}
        <div className="pt-8 space-y-4 ml-2 text-sm font-semibold ">
          <button className="flex items-center space-x-2 hover:text-white focus:text-white ">
            <PlusCircleIcon className="h-[24px] w-[24px]" />
            <p>Create a playlist</p>
          </button>
          <button
            onClick={() => router.push("/liked")}
            className="flex items-center space-x-2 hover:text-white focus:text-white"
          >
            <HeartIcon className="h-[24px] w-[24px]" />
            <p>Liked songs</p>
          </button>
          <button className="flex items-center space-x-2 hover:text-white focus:text-white">
            <BookmarkIcon className="h-[24px] w-[24px]" />
            <p>Your episodes</p>
          </button>
        </div>
        <hr className="border-t-[1px] border-gray-600" />
        {/* Playlists names */}
        <div className="space-y-4 text-sm md:text-base ">
          {playlists?.map((playlist, idx) => (
            <p
              key={playlist.id}
              onClick={() => {
                setPlaylistId(playlist.id);
                router.push("/", undefined, { shallow: true });
              }}
              className="cursor-pointer hover:text-white px-[8px]"
            >
              {playlist.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
