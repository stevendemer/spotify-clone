import Sidebar from "../components/sidebar";
import Player from "../components/player";

export default function Layout({ hasSidebar, children, ...restProps }) {
  return (
    <div className=" overflow-hidden bg-black h-screen">
      <main className="flex">
        {hasSidebar && <Sidebar />}
        {children}
      </main>
      <div className="absolute z-50 bottom-0">{hasSidebar && <Player />}</div>
    </div>
  );
}
