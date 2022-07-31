import SpotifyWebApi from "spotify-web-api-node";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import SpotifyApi from "../lib/spotify";

export default function useSpotify() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      if (session.error === "RefreshTokenError") {
        signIn(); // if not refresh token then login again
      }
      SpotifyApi.setAccessToken(session.user.accessToken);
    }
  }, [session]);

  return SpotifyApi;
}
