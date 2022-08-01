import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import SpotifyApi from "../lib/spotify";

export default function useSpotify() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      if (session.error === "RefreshTokenError") {
        signIn(); // if not refresh token then login again
      }
      SpotifyApi.setAccessToken(session.user.accessToken);
    }
  }, [session]);

  return SpotifyApi;
}
