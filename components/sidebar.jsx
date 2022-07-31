import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  BookmarkIcon,
} from "@heroicons/react/outline";
import { BiPlay } from "react-icons/bi";
import { useSession } from "next-auth/react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useState, useEffect } from "react";
import { userStateId } from "../atoms/user-atom";
import useSpotify from "../hooks/useSpotify";
import { playlistIdState } from "../atoms/playlist-atom";

const Sidebar = () => {
  const { data: session, status } = useSession();

  const [playlists, setPlaylists] = useState([]);
  const spotifyApi = useSpotify();
  const userId = useRecoilValue(userStateId);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  // console.log("Session", session);
  // console.log("Playlist id", playlistId);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      // user is still registered
      spotifyApi
        .getUserPlaylists()
        .then((data) => {
          setPlaylists(data.body.items);
        })
        .catch((err) => console.log("Error getting the playlists ", err));
    }
  }, [session, spotifyApi]);

  return (
    <div className="md:inline-flex text-xs bg-black overflow-y-hidden flex-grow h-screen w-[232px] md:text-[0.875rem] lg:text-lg text-gray-500">
      <div className="flex flex-col space-y-4">
        {/* Logo  */}
        <div className="flex items-center pb-3 justify-start cursor-pointer">
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
        <div className="space-y-4 ml-2 text-sm md:text-xl">
          <button className="flex items-center hover:text-white space-x-2">
            <HomeIcon className="h-[24px] w-[24px]" />
            <p>Home</p>
          </button>
          <button className="flex items-center hover:text-white space-x-2">
            <SearchIcon className="h-[24px] w-[24px]" />
            <p>Search</p>
          </button>
          <button className="flex items-center hover:text-white space-x-2">
            <LibraryIcon className="h-[24px] w-[24px]" />
            <p>Library</p>
          </button>
        </div>
        {/* Second links */}
        <div className="pt-8 space-y-4 ml-2 text-sm font-semibold ">
          <button className="flex items-center space-x-2 hover:text-white ">
            <PlusCircleIcon className="h-[24px] w-[24px]" />
            <p>Create a playlist</p>
          </button>
          <button className="flex items-center space-x-2 hover:text-white ">
            <HeartIcon className="h-[24px] w-[24px]" />
            <p>Liked songs</p>
          </button>
          <button className="flex items-center space-x-2 hover:text-white ">
            <BookmarkIcon className="h-[24px] w-[24px]" />
            <p>Your episodes</p>
          </button>
        </div>
        <hr className="border-t-[1px] border-gray-600" />
        {/* Playlists names */}
        <div className="space-y-4 text-sm md:text-base  overflow-y-scroll scrollbar ">
          {playlists?.map((playlist) => (
            <p
              key={playlist.id}
              onClick={() => setPlaylistId(playlist.id)}
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
