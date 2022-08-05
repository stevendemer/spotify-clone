import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import SpotifyApi from "../lib/spotify";

export default function useSpotify() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      if (session.error === "RefreshTokenError") {
        signIn();
      }

      SpotifyApi.setAccessToken(session.user.accessToken);
    }
  }, [session]);

  return SpotifyApi;
}
