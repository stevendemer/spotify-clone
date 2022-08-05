import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import Banner from "../../components/banner";
import useSpotify from "../../hooks/useSpotify";

const Category = () => {
  const router = useRouter();
  const [name, setName] = useState("");
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
          limit: 21,
        })
        .then((data) => {
          console.log("Fetched from the spotify api", data.body);
          setPlaylists(data.body?.playlists.items);
        })
        .catch((err) => console.log(err));
    }
  }, [router.isReady, spotifyApi]);

  return (
    <>
      <div className="text-3xl container  mx-auto text-white">
        <div className="flex flex-col items-center">
          {playlists.map((playlist) => (
            <div className="" key={playlist.id}>
              {playlist.name}
            </div>
          ))}
        </div>
        <div className="flex container items-center mx-auto">
          <ArrowLeftIcon
            onClick={() => router.push("/browse")}
            className="w-6 h-6 text-white"
          />
        </div>
      </div>
    </>
  );
};

export default Category;
