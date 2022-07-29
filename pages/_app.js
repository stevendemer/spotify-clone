import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import Head from "next/head";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/images/spotify_icon.png" />
        <title>Spotify 2.0</title>
      </Head>
      <RecoilRoot>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
