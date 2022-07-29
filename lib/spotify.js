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
  "user-read-playback-state",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-follow-read",
].join(",");

const params = {
  scope: scopes,
  redirect_url: "http://localhost:3000/callback",
  client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
  response_type: "code",
};

const spotifyConfig = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

const queryParamString = new URLSearchParams(params);

console.log(queryParamString);

const LOGIN_URL = `https://accounts.spotify.com/authorize?=${queryParamString.toString()}`;

export { LOGIN_URL };

export default spotifyConfig;
