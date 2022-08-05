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
    <div className="relative h-screen w-full flex-grow overflow-y-scroll scrollbar-none bg-black text-white ">
      <section
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
        {playlist?.tracks?.items.map((track, idx) => (
          <Song key={track.track.id} track={track.track} order={idx} />
        ))}
      </div>
    </div>
  );

  // return (
  //   <div className="min-h-screen relative w-full flex-grow overflow-y-scroll scrollbar scrollbar-hide text-white bg-black text-3xl">
  //     <header className="absolute top-0 left-0 right-0 ">
  //       <div className="flex items-center justify-between gap-4 relative  py-6 h-[32px]  transition-colors duration-300 space-x-2 rounded-full">
  //         <div className="flex fixed items-center justify-start px-4 space-x-6  text-white ">
  //           <ChevronLeftIcon className="cursor-pointer w-6 h-6 rounded-full  " />
  //           <ChevronRightIcon className="cursor-pointer w-6 h-6 rounded-full " />
  //         </div>
  //         {/* User image and logout button */}
  //         <div
  //           onClick={signOut}
  //           className="cursor-pointer fixed right-4 top-4 flex items-center space-x-2 transition-all delay-100 hover:text-white text-zinc-300  bg-black rounded-full"
  //         >
  //           <img
  //             alt=""
  //             src={session?.user.image}
  //             className="rounded-full w-8 h-8  "
  //           />
  //           <div className="text-sm font-semibold mr-4">
  //             {session?.user.name}
  //           </div>
  //           <ChevronDownIcon className=" w-6 h-6  pr-2" />
  //         </div>
  //       </div>
  //     </header>
  //     <section
  //       className={`flex items-end space-x-7 bg-gradient-to-b to-black ${colorMode} h-80 text-white p-8`}
  //     >
  //       <img
  //         className="h-48 w-48 shadow-2xl"
  //         src={playlist?.images[0]?.url}
  //         alt="playlist covers"
  //       />
  //       <div>
  //         <p className="text-xs font-bold">Playlist</p>
  //         <h2 className=" font-bold text-xl md:text-3xl xl:text-8xl">
  //           {playlist?.name}
  //         </h2>
  //       </div>
  //     </section>
  //     {playlist?.tracks?.items.map((track, idx) => {
  //       return <Song key={track.track.id} track={track.track} order={idx} />;
  //     })}
  //   </div>
  // );
};

export default Menu;
