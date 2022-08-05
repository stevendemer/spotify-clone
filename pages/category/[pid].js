import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import useSpotify from "../../hooks/useSpotify";
import { random } from "lodash";
import Card from "../../components/card";

const Category = () => {
  const router = useRouter();
  const spotifyApi = useSpotify();
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    router.push(`/?genre=${router.query.pid}`, undefined, { shallow: true });
  }, []);

  useEffect(() => {
    if (router.isReady) {
      spotifyApi
        .getPlaylistsForCategory(router.query.pid, {
          country: "US",
          limit: 40,
        })
        .then((data) => {
          console.log("Fetched from the spotify api", data.body);
          setPlaylists(data.body?.playlists?.items);
        })
        .catch((err) => console.log(err));
    }
  }, [router.isReady, spotifyApi]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlists[5]?.id)
      .then((data) => {
        console.log(data.body?.items);
      })
      .catch((err) => console.log(err));
  }, [spotifyApi, playlists]);

  return (
    <div className="h-screen w-full overflow-y-scroll flex-grow relative ">
      <section className="space-x-7 text-white p-8 ">
        <div className="text-5xl py-2 mx-auto container capitalize font-bold">
          {router.query.pid}
        </div>
        <div className="grid grid-cols-7 gap-6 p-10 last:mb-36">
          {playlists.map((playlist) => (
            <Card isPlaylist category={playlist} key={playlist.id} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Category;
