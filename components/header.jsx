

export default function Header() {


    return (
        <>
      <header>
      <div
            onClick={signOut}
            className="cursor-pointer fixed right-4 top-4 flex items-center space-x-2 transition-all delay-100 hover:text-white text-zinc-300  bg-black rounded-full"
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
        </header>
        </>
    )
}