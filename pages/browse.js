import Sidebar from "../components/sidebar";
import Player from "../components/player";
import Menu from "../components/menu";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";
import { useSession, signOut } from "next-auth/react";

export default function Browse() {
  const { data: session } = useSession();

  return (
    <div className="w-full text-white bg-black h-screen">
      {/* Header with search bar */}
      <div className="sticky top-0 h-16 mx-8 mt-10">
        <div className="flex whitespace-nowrap items-center space-x-8 ">
          <ChevronLeftIcon className="w-6 h-6 text-white cursor-pointer" />
          <ChevronRightIcon className="w-6 h-6 text-white cursor-pointer" />
          <form role="search">
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 text-black text-xl"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                onChange={(e) => console.log(e.target.value)}
                type="text"
                className="w-[320px] px-10 py-2 h-10  focus:outline-none text-black border rounded-full text-sm dark:placeholder-gray-"
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
              className="rounded-full w-8 h-8  "
            />
            <div className="text-sm font-semibold mr-4">
              {session?.user.name}
            </div>
            <ChevronDownIcon className=" w-6 h-6  pr-2" />
          </div>
        </div>
      </div>

      <div className="font-bold">Your top genres</div>
    </div>
  );
}
