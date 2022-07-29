import Head from "next/head";
import Image from "next/image";
import Layout from "../components/layout";
import Dashboard from "./dashboard";
import { useSession, getSession } from "next-auth/react";
import { useRecoilValue } from "recoil";
import { userStateId } from "../atoms/user-atom";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const userId = useRecoilValue(userStateId);

  console.log(`The user id is ${userId}`);

  useEffect(() => {
    if (!session && status != "authenticated") {
      router.push("/login");
    }
  }, [session]);

  return (
    <>
      <Layout>
        <Dashboard />
      </Layout>
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
