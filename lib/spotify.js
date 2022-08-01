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

const params = {
  scope: scopes,
  redirect_url: "https://localhost:3000/callback",
  client_id: process.env.SPOTIFY_CLIENT_ID,
  response_type: "code",
};

const SpotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

// const getAccessToken = async () => {
//   const refresh_token = process.env.

// }

const queryParamString = new URLSearchParams(params);

console.log("Query param string", queryParamString.toString());

const LOGIN_URL =
  "https://accounts.spotify.com/authorize?" + queryParamString.toString();

export default SpotifyApi;

export { LOGIN_URL };
