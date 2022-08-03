import Sidebar from "../components/sidebar";
import Player from "../components/player";

export default function Browse() {
  return (
    <div className="w-full h-screen bg-[#121212] text-white ">
      <div className="grid grid-cols-8 col-span-fr">
        <div className="flex items-center justify-between">
          <div className="grid grid-cols-8 gap-10 ">
            <div className="flex flex-col h-full  h-56 relative w-full border rounded-lg ">
              Rap
            </div>
            <div className="flex items-center justify-between col-span-2  h-56 relative w-full border rounded-lg ">
              Rock
            </div>
            <div className="flex items-center justify-between col-span-2  h-56 relative w-full border rounded-lg ">
              R&B
            </div>
            <div className="flex items-center justify-between col-span-2  h-56 relative w-full border rounded-lg ">
              Rap
            </div>
            <div className="flex items-center justify-between col-span-2  h-56 relative w-full border rounded-lg ">
              Rap
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
