import { useEffect, useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "@heroicons/react/outline";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
export default function Banner() {
  return (
    <div className="relative top-0 left-0 right-0">
      <div className="flex gap-4 relative  items-center justify-between py-6 h-8 space-x-2 rounded-full">
        <div className="flex fixed items-center justify-start px-4 space-x-6  text-white ">
          <ChevronLeftIcon className="cursor-pointer w-6 h-6 rounded-full  " />
          <ChevronRightIcon className="cursor-pointer w-6 h-6 rounded-full " />
        </div>
        {/* User image and logout button */}
      </div>
    </div>
  );
}
