import { useEffect, useMemo, useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { shuffle } from "lodash";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlist-atom";
import { millisToMinutes, millisToMinutesAndSeconds } from "../lib/time";

const bgColors = [
  "from-yellow-500",
  "from-red-500",
  "from-orange-500",
  "from-lime-500",
  "from-emerald-500",
  "from-sky-500",
  "from-rose-500",
];

export default function Banner() {
  const { data: session } = useSession();
  const [colorMode, setColorMode] = useState("");
  const router = useRouter();
  const playlist = useRecoilValue(playlistState);
  const playlistId = useRecoilValue(playlistIdState);

  console.log("Playlist", playlist);

  useEffect(() => {
    setColorMode(shuffle(bgColors).pop());
  }, []);

  const getMs = (playlist) => {
    let x = 0;
    const items = playlist?.tracks?.items;
    items?.map((it) => {
      x += it.track.duration_ms;
    });
    return x;
  };

  // returns all the ms of each track in the playlist
  const total_ms = useMemo(
    () => millisToMinutesAndSeconds(getMs(playlist)),
    [playlist]
  );

  return (
    <div className="w-full h-[30vh] min-h-[340px] max-h-[500px] relative flex pb-6">
      <div className="absolute top-0">
        <div className=" pl-4  whitespace-nowrap mt-4 space-x-8">
          <div className="sticky  top-0 z-30 ">
            <div className=" rounded-full relative  space-x-6 cursor-pointer  ">
              <div className="pl-10 flex items-center space-x-6  text-white font-semibold">
                <ChevronLeftIcon
                  onClick={() => router.back()}
                  className="w-6 h-6 text-white  rounded-full  bg-opacity-30  bg-black cursor-pointer"
                />
                <ChevronRightIcon
                  onClick={() => router.back()}
                  className="w-6 h-6 bg-opacity-30 bg-black rounded-full text-white cursor-pointer"
                />
                <div
                  onClick={() => signOut()}
                  className="bg-black relative px-2  right-0 flex items-center  rounded-full bg-opacity-60 hover:bg-opacity-40 transition-all delay-100"
                >
                  <img
                    src={session?.user.image}
                    alt=""
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="px-2">{session?.user.name}</div>
                  <ChevronDownIcon className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section
        className={`flex  items-end  mb-20 space-x-10 bg-gradient-to-b to-black ${colorMode} h-full w-full px-10 text-white`}
      >
        <img
          className="h-auto w-60 shadow-2xl rounded-lg pb-4 "
          src={`${
            router.pathname.includes("liked")
              ? "https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"
              : playlist?.images[0]?.url
          }`}
          alt="playlist covers"
        />
        <div className="py-4 flex flex-col flex-shrink">
          <p className="text-lg font-bold">Playlist</p>
          <div className="pb-10 font-bold text-xl md:text-3xl xl:text-8xl">
            {`${
              router.pathname.includes("liked") ? "Liked Songs" : playlist?.name
            }`}
          </div>
          <div className="flex items-center space-x-2">
            <img
              className="w-8 h-8 rounded-full"
              src={session?.user.image}
              alt=""
            />
            <div className="text-xs font-bold">{session?.user.name}</div>
            <div className="text-xs">50 songs</div>
            <div className=" text-gray-300 text-lg md:text-md">
              {total_ms} hours
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
