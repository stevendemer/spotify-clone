import Sidebar from "./sidebar";
import Player from "./player";

export default function Layout({ children }) {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
