import {
  VolumeUpIcon as VolumeDownIcon,
  HeartIcon,
} from "@heroicons/react/outline";
import { VolumeUpIcon } from "@heroicons/react/solid";
import {
  RewindIcon,
  PauseIcon,
  PlayIcon,
  FastForwardIcon,
  ReplyIcon,
  SwitchHorizontalIcon,
} from "@heroicons/react/solid";
import { debounce } from "lodash";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/song-atom";
import useSongInfo from "../hooks/useSongInfo";
import useSpotify from "../hooks/useSpotify";

export default function Player() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(80);

  const songInfo = useSongInfo(currentTrackId);

  console.log(songInfo);

  const fetchCurrentSong = async () => {
    console.log("Fetching the current song...");
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        setCurrentTrackId(data.body?.item?.id);
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing);
        });
      });
    }
  };

  const goToNext = () => {
    spotifyApi
      .skipToNext()
      .then(() => console.log("Skipped to next song..."))
      .catch((err) => console.log("Error skipping to next song..."));
  };

  const goToPrev = () => {
    spotifyApi
      .skipToPrevious()
      .then(() => console.log("Skipped to previous song..."))
      .catch((err) => console.log("Error going to previous song..."));
  };

  // Spotify api returns an error ?
  const handleSpacePress = (e) => {
    if (e.key === " ") {
      console.log("Space clicked !");
      handlePlayPause();
    }
  };

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body?.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
        console.log(`Paused at ${millisToSeconds(data.body.progress_ms)}`);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(80);
    }
  }, [currentTrackId, spotifyApi]);

  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch((err) => {
        console.log("Error adjusting the volume", err);
      });
    }, 200),
    []
  );

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume);
    }
  }, [volume]);

  return (
    <>
      <div className="bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-between h-24 text-sm px-4 md:text-base py-0 md:px-8">
        <div className="flex basis-full justify-start items-center space-x-4">
          <img
            className="hidden md:inline h-12 w-12 cursor-pointer"
            src={songInfo.album.images?.[0].url}
            alt=""
          />
          <div>
            <h3 className="text-sm hover:underline cursor-pointer">
              {songInfo?.name}
            </h3>
            <p className="text-xs text-gray-500 cursor-pointer">
              {songInfo?.artists?.map((art) => (
                <p className="hover:text-white hover:underline">{art.name}</p>
              ))}
            </p>
          </div>
        </div>
        <div className="flex basis-full flex-grow items-center justify-start w-full space-x-8">
          <SwitchHorizontalIcon className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out" />
          <RewindIcon
            onClick={goToPrev}
            className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"
          />
          {isPlaying ? (
            <button onClick={handlePlayPause}>
              <PauseIcon className="w-10 h-10 cursor-pointer transition transform text-[#18D860]" />
            </button>
          ) : (
            <button onClick={handlePlayPause}>
              <PlayIcon className="w-10 h-10 cursor-pointer" />
            </button>
          )}
          <FastForwardIcon
            onClick={goToNext}
            className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"
          />

          <ReplyIcon className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out" />
          {/* playback bar  */}
        </div>
        <div className="flex items-center space-x-3 md:space-x-4 justify-end p-5">
          <VolumeDownIcon
            className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"
            onClick={() => volume > 0 && setVolume(volume - 30)}
          />
          <input
            type="range"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            min={0}
            max={100}
            className="w-14 md:w-36 "
          />
          <VolumeUpIcon
            className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"
            onClick={() => volume < 100 && setVolume(volume + 30)}
          />
        </div>
      </div>
    </>
  );
}
