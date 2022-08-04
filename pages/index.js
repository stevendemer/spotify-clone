import { useSession, getSession } from "next-auth/react";
import { useRecoilValue } from "recoil";
import { userStateId } from "../atoms/user-atom";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Menu from "../components/menu";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const userId = useRecoilValue(userStateId);

  console.log(`The user id is ${userId}`);

  // the user is not logged in

  useEffect(() => {
    if (session) {
      router.push("/");
    } else {
      router.push("/login");
    }
  }, [session]);

  return (
    <>
      <Menu />
    </>
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
