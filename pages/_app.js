import "../styles/globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import { RecoilRoot } from "recoil";
import Head from "next/head";
import Layout from "../layouts/layout";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const { asPath } = useRouter();

  if (!asPath.includes("/login")) {
    return (
      <>
        <Head>
          <link rel="shortcut icon" href="/images/spotify_icon.png" />
          <title>Spotify 2.0</title>
        </Head>
        <RecoilRoot>
          <SessionProvider session={session}>
            <Layout hasSidebar>
              <Component {...pageProps} />
            </Layout>
          </SessionProvider>
        </RecoilRoot>
      </>
    );
  } else {
    return (
      <>
        <Head>
          <link rel="shortcut icon" href="/images/spotify_icon.png" />
          <title>Spotify 2.0</title>
        </Head>
        <RecoilRoot>
          <SessionProvider session={session}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SessionProvider>
        </RecoilRoot>
      </>
    );
  }
}

export default MyApp;
