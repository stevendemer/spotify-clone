import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
  "user-read-email",
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-read-email",
  "streaming",
  "user-read-private",
  "user-library-read",
  "user-top-read",
  // "user-library-modify",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-follow-read",
].join(",");

let params;

if (process.env.NODE_ENV === "production") {
  params = {
    scope: scopes,
    redirect_uri: "https://spotify-clone-eight-sable.vercel.app/callback",
    client_id: process.env.SPOTIFY_CLIENT_ID,
    response_type: "code",
  };
} else {
  params = {
    scope: scopes,
    redirect_uri: "http://localhost:3000/api/auth/callback/spotify",
    client_id: process.env.SPOTIFY_CLIENT_ID,
    response_type: "code",
  };
}

const SpotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

const queryParamString = new URLSearchParams(params);

console.log("Params : ", queryParamString.toString());

const LOGIN_URL =
  "https://accounts.spotify.com/authorize?" + queryParamString.toString();

export default SpotifyApi;

export { LOGIN_URL };
