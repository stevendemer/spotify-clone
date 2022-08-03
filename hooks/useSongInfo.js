import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState } from "../atoms/song-atom";
import useSpotify from "./useSpotify";

export default function useSongInfo() {
  const spotifyApi = useSpotify();

  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [songInfo, setSongInfo] = useState(null);

  // works fine (for now)
  useEffect(() => {
    const fetchSong = async () => {
      if (currentTrackId) {
        const trackInfo = await fetch(
          `
          https://api.spotify.com/v1/me/player/currently-playing`,
          {
            headers: {
              Authorization: `Bearer ${process.env.SPOTIFY_AUTH_TOKEN}`,
            },
          }
        );
        const res = await trackInfo.json();
        setCurrentTrackId(res.id);
        setSongInfo(res);
      }
    };
    fetchSong();
  }, [currentTrackId, spotifyApi]);

  // useEffect(() => {
  //   const fetchSongInfo = async () => {
  //     if (currentTrackId) {
  //       const trackInfo = await fetch(
  //         `https://api.spotify.com/v1/tracks/${currentTrackId}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
  //           },
  //         }
  //       );
  //       const res = await trackInfo.json();
  //       setCurrentTrackId(res.id);
  //       setSongInfo(res);
  //     }
  //   };
  //   fetchSongInfo();
  // }, [currentTrackId, spotifyApi]);
  // return songInfo;
}
