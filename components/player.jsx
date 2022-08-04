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
import millisToMinutesAndSeconds from "../lib/time";

export default function Player() {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(80);
  const songInfo = useSongInfo(currentTrackId);

  const fetchCurrentSong = async () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlaybackState().then((data) => {
        setCurrentTrackId(data.body?.item?.id);
        setIsPlaying(data.body?.is_playing);
      });
    }
  };

  // works
  const changeSong = (e) => {
    let id = e.currentTarget.id;
    console.log(id);
    if (id === "prev") {
      spotifyApi
        .skipToPrevious()
        .then(() => console.log("Skipped to previous song"));
    } else if (id === "next") {
      spotifyApi.skipToNext().then(() => console.log("Skipped to next song"));
    }
  };

  // when user clicks the space bar get triggered
  useEffect(() => {
    window.addEventListener("keydown", handleSpacePress);

    return () => {
      window.removeEventListener("keydown", handleSpacePress);
    };
  }, [isPlaying]);

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
        console.log(
          `Paused at ${millisToMinutesAndSeconds(data.body.progress_ms)}`
        );
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };

  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch((err) => {
        console.log("Error adjusting the volume", err);
      });
    }, 200),
    []
  );

  // useEffect(() => {
  //   spotifyApi
  //     .getMyDevices()
  //     .then((data) => {
  //       let device = data.body?.devices[0];
  //       device.is_active = true;
  //       setActiveDevice(device.id);
  //     })
  //     .catch((err) => console.log("Error getting device id", err));
  // }, [spotifyApi]);

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume);
    }
  }, [volume]);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      fetchCurrentSong();
      setVolume(70);
    }
  }, [spotifyApi]);

  return (
    <div>
      <div className="bg-gradient-to-b relative from-gray-900 to-black text-white flex items-center justify-between h-24 text-sm px-4 md:text-base py-0 md:px-8">
        <div className="flex basis-full justify-start items-center space-x-4">
          <img
            className="hidden md:inline h-12 w-12 cursor-pointer"
            src={songInfo?.album.images?.[0].url}
            alt=""
          />
          <div className="items-center grid grid-cols-2 my-0 mx-4">
            <div className="justify-self-start w-full text-sm hover:underline cursor-pointer">
              <div className="relative flex whitespace-nowrap">
                {songInfo?.name}
              </div>
            </div>
            <div className="w-full space-x-1 flex items-center min-w-0 col-start-1 text-xs text-gray-400 cursor-pointer ">
              {songInfo?.artists?.map((art, idx) => (
                <div
                  key={idx}
                  className=" whitespace-nowrap translate-x-0 w-fit hover:text-white hover:underline"
                >
                  {`${art.name}`}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex basis-full items-center justify-evenly w-full space-x-2 ">
          <SwitchHorizontalIcon className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out" />
          <RewindIcon
            id="prev"
            onClick={(e) => changeSong(e)}
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
            id="next"
            onClick={(e) => changeSong(e)}
            className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"
          />

          <ReplyIcon className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out" />
          {/* playback bar  */}
        </div>
        <div className="flex  space-x-2 w-full justify-end p-5">
          <VolumeDownIcon
            className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"
            onClick={() => volume > 0 && setVolume(1)}
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
            onClick={() => volume <= 100 && setVolume(99)}
          />
        </div>
      </div>
    </div>
  );
}
