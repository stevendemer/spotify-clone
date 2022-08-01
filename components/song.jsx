import { ClockIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { useRecoilState } from "recoil";
import {
  currentTrackIdState,
  currentTrackState,
  isPlayingState,
} from "../atoms/song-atom";
import millisToMinutesAndSeconds from "../lib/time";
import { BiPlay } from "react-icons/bi";
import SpotifyApi from "../lib/spotify";
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
    // console.log(SpotifyApi.getAccessToken());
    setCurrentTrackid(track.id);
    setIsPlaying(true);
    spotifyApi.play({
      uris: [track.uri],
    });
  };

  //   console.log("Current track is called ", track.name);

  if (track.name && track.album) {
    return (
      <div
        onClick={playSong}
        className="grid grid-cols-3 text-gray-400 py-2 px-5 hover:bg-gray-900 cursor-pointer rounded-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex justify-self-start items-center space-x-4 py-4">
          {isHovered ? (
            <BiPlay className="w-6 h-6 text-white" />
          ) : (
            <p className="text-base">{order + 1}</p>
          )}
          <img
            className="h-10 w-12 mr-[16px]"
            src={track.album.images[0]?.url}
            alt={track.album.name}
          />
          <div>
            <p className="w-36 lg:w-64 text-base hover:underline truncate text-white">
              {track.name}
            </p>
            <p>{track.artist}</p>
          </div>
        </div>
        <div className="flex items-center text-sm justify-between ml-auto md:ml-0">
          <p className="w-55 hidden md:inline hover:underline hover:text-white">
            {track.album.name}
          </p>
          <p className="ml-10 text-gray-400">
            {millisToMinutesAndSeconds(track.duration_ms)}
          </p>
        </div>
        <div className="flex items-center text-white text-sm justify-between ml-auto">
          {track.album.release_date}
        </div>
      </div>
    );
  }
};

export default Song;
