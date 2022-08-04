import Sidebar from "../components/sidebar";
import Player from "../components/player";

export default function Layout({ hasSidebar, children, ...restProps }) {
  return (
    <div className="bg-black overflow-hidden h-screen">
      <main className="flex">
        {hasSidebar && <Sidebar />}
        {children}
      </main>
      <div className="w-full z-50 absolute bottom-0">
        {hasSidebar && <Player />}
      </div>
    </div>
  );
}
