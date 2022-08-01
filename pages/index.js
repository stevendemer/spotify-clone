import { useSession, getSession } from "next-auth/react";
import { useRecoilValue } from "recoil";
import { userStateId } from "../atoms/user-atom";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Menu from "../components/menu";
import Sidebar from "../components/sidebar";
import Player from "../components/player";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const userId = useRecoilValue(userStateId);

  console.log(`The user id is ${userId}`);

  // the user is not logged in
  useEffect(() => {
    if (!session || status != "authenticated") {
      router.push("/login");
    }
  }, [status, session]);

  return (
    <div className="bg-black h-screen overflow-hidden">
      <main className="flex">
        <Sidebar />
        <Menu />
      </main>
      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
