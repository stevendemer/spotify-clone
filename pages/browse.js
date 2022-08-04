import { useEffect, useState, useCallback, useMemo } from "react";
import Card from "../components/card";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";
import { useSession, signOut } from "next-auth/react";
import useSpotify from "../hooks/useSpotify";

export default function Browse() {
  const { data: session } = useSession();
  const [categories, setCategories] = useState([]);
  const spotifyApi = useSpotify();

  // get a list of categories
  useEffect(() => {
    spotifyApi
      .getCategories({
        country: "US",
        limit: 49,
      })
      .then((data) => {
        setCategories(data.body?.categories?.items);
      })
      .catch((err) => console.log("Error getting genres", err));
  }, []);

  return (
    <div className="w-full text-white h-screen overflow-scroll">
      {/* Header with search bar */}
      <div className="sticky z-30 top-0 h-16 w-full  bg-black">
        <div className="flex whitespace-nowrap mt-4 items-center space-x-8 ">
          <ChevronLeftIcon className="w-6 h-6 text-white cursor-pointer" />
          <ChevronRightIcon className="w-6 h-6 text-white cursor-pointer" />
          <form role="search">
            <div className="relative">
              <div className="flex top-2 absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-black text-xl"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                onChange={(e) => console.log(e.target.value)}
                type="text"
                className="w-[320px] px-10 py-2 mt-2 h-10  focus:outline-none text-black border rounded-full text-sm"
                placeholder="Artists, albums or podcasts"
              />
            </div>
          </form>
          <div
            onClick={signOut}
            className="cursor-pointer absolute right-0 flex items-center space-x-2 transition-all delay-100 hover:text-white text-zinc-300  bg-black rounded-full"
          >
            <img
              alt=""
              src={session?.user.image}
              className="rounded-full w-8 h-8 "
            />
            <div className="text-sm font-bold text-white mr-4">
              {session?.user.name}
            </div>
            <ChevronDownIcon className=" w-6 h-6  pr-2 text-white" />
          </div>
        </div>
      </div>

      <div className="font-bold m-4">Browse all</div>
      <div className="grid grid-cols-7 gap-6 last:mb-36 ">
        {categories?.map((ctg, idx) => (
          <Card title={ctg.name} key={ctg.id} bgImage={ctg.icons[0].url} />
        ))}
      </div>
    </div>
  );
}
