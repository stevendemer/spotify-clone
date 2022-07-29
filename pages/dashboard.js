import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect, useContext } from "react";
import Sidebar from "../components/sidebar";
import Menu from "../components/menu";
import { useSession, signIn, signOut } from "next-auth/react";
import { userStateId } from "../atoms/user-atom";
import useSpotify from "../hooks/useSpotify";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [userId, setUserId] = useRecoilState(userStateId);
  const spotifyApi = useSpotify();

  useEffect(() => {
    spotifyApi
      .getMe()
      .then((data) => {
        console.log(`User information is ${data.body.id}`);
        setUserId(data.body.id);
      })
      .catch((err) => console.log(err));
  }, [spotifyApi, userId]);

  return (
    <div className="flex bg-black h-screen">
      <Sidebar />
      <Menu />
    </div>
  );
}
