import Sidebar from "./sidebar";
import Player from "./player";

export default function Layout({ children }) {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <main className="flex">
        <Sidebar />
        {children}
      </main>
      <div className="w-full z-50 absolute bottom-0">
        <Player />
      </div>
    </div>
  );
}
