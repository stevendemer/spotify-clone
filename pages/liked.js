import { useEffect, useState } from "react";
import Song from "../components/song";
import useSpotify from "../hooks/useSpotify";

export default function LikedPage() {
  const [tracks, setTracks] = useState([]);
  const spotifyApi = useSpotify();

  useEffect(() => {
    spotifyApi
      .getMySavedTracks({
        limit: 50,
        offset: 2,
      })
      .then((data) => {
        console.log(data.body.items);
        setTracks(data.body?.items);
      })
      .catch((err) => console.log(err));
  }, [spotifyApi]);

  return (
    <div className="relative h-screen w-full flex-grow overflow-y-scroll scrollbar-none bg-black text-white ">
      <div className="px-8 flex flex-col text-white pb-28">
        {tracks.map((track, idx) => (
          <Song key={track.track.id} track={track.track} order={idx} />
        ))}
      </div>
    </div>
  );
}
