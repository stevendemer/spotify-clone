import SpotifyWebApi from "spotify-web-api-node";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";

const spotifyAPI = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
  redirectUri: "http://localhost:3000/callback",
});

export default function useSpotify() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      if (session.error === "RefreshTokenError") {
        signIn(); // if not refresh token then login again
      }
      spotifyAPI.setAccessToken(session.user.accessToken);
    }
  }, [session]);

  return spotifyAPI;
}
