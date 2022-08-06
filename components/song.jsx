import { ClockIcon, HeartIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { useRecoilState } from "recoil";
import {
  currentTrackIdState,
  currentTrackState,
  isPlayingState,
} from "../atoms/song-atom";
import { millisToMinutes } from "../lib/time";
import { BiPlay } from "react-icons/bi";
import useSpotify from "../hooks/useSpotify";

/*
    TODO: Get the timestamp from the API when the song 
    TODO: was added to the playlist
*/
const Song = ({ track, order }) => {
  const [currentTrackid, setCurrentTrackid] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [isHovered, setIsHovered] = useState(false);
  const spotifyApi = useSpotify();

  // The api returns permision error
  const playSong = async () => {
    setCurrentTrackid(track.id);
    setIsPlaying(true);
    spotifyApi.play({
      uris: [track.uri],
    });
  };

  // if (track.name && track.album) {
  //   return (
  //     <div
  //       onClick={() => playSong()}
  //       classNameName="grid grid-cols-3 text-gray-400 py-2 px-5 hover:bg-gray-900 cursor-pointer rounded-lg"
  //       onMouseEnter={() => setIsHovered(true)}
  //       onMouseLeave={() => setIsHovered(false)}
  //     >
  //       <div classNameName="flex justify-self-start items-center space-x-4 py-4">
  //         {isHovered ? (
  //           <BiPlay classNameName="w-6 h-6 text-white" />
  //         ) : (
  //           <p classNameName="text-base">{order + 1}</p>
  //         )}
  //         <img
  //           classNameName="h-10 w-12 mr-[16px]"
  //           src={track.album.images[0]?.url}
  //           alt={track.album.name}
  //         />
  //         <div>
  //           <p classNameName="w-36 lg:w-64 text-base hover:underline truncate text-white">
  //             {track.name}
  //           </p>
  //           <p>{track.artist}</p>
  //         </div>
  //       </div>
  //       <div classNameName="flex items-center text-sm justify-between ml-auto md:ml-0">
  //         <p classNameName="w-55 hidden md:inline hover:underline hover:text-white">
  //           {track.album.name}
  //         </p>
  //         <p classNameName="ml-10 text-gray-400">
  //           {millisToMinutesAndSeconds(track.duration_ms)}
  //         </p>
  //       </div>
  //       <div classNameName="flex items-center text-white text-sm justify-between ml-auto">
  //         {track.album.release_date}
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <>
      <div className="mt-10">
        <div
          onClick={() => playSong()}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className=" flex h-28 px-10 items-center cursor-pointer space-x-4 transition-all duration-100 delay-100 border-b border-gray-800 hover:bg-gray-800"
        >
          <div className="flex-shrink-0 p-2">
            {isHovered ? (
              <BiPlay className="w-6 h-6 text-white" />
            ) : (
              <div className="text-base">{order + 1}</div>
            )}
          </div>
          <img
            className="w-10 h-10 flex-shrink-0"
            src={track.album?.images[0]?.url}
          />
          <div className="p-3 w-full">{track.name}</div>
          <div className="p-3 w-full">{track.artist}</div>
          <div className="p-3 w-full">{track.album?.name}</div>
          <div className="p-3 w-12 flex-shrink-0 text-right">
            {millisToMinutes(track.duration_ms)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Song;
