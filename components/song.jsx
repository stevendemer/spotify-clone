import { ClockIcon } from "@heroicons/react/solid";
import { useRecoilState } from "recoil";
import {
  currentTrackIdState,
  currentTrackState,
  isPlayingState,
} from "../atoms/song-atom";
import useSpotify from "../hooks/useSpotify";
import millisToMinutesAndSeconds from "../lib/time";

/*
    TODO: Get the timestamp from the API when the song 
    TODO: was added to the playlist
*/
const Song = ({ track, order }) => {
  const spotifyApi = useSpotify();
  const [currentTrackid, setCurrentTrackid] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  // The api returns permision error
  const playSong = () => {
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
      >
        <div className="flex justify-self-start items-center space-x-4 py-4">
          <p className="text-base">{order + 1}</p>
          <img
            className="h-10 w-12 mr-[16px]"
            src={track.album.images[0]?.url}
            alt=""
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
