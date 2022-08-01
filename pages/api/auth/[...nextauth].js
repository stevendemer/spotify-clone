import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import SpotifyApi, { LOGIN_URL } from "../../../lib/spotify";

async function refreshAccessToken(token) {
  try {
    SpotifyApi.setAccessToken(token.accessToken);
    SpotifyApi.setRefreshToken(token.refreshToken);

    const { body: refreshedToken } = await SpotifyApi.refreshAccessToken();

    console.log("Refreshed token is " + refreshedToken);

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.log("Error in Next Auth", error);
    return {
      ...token,
      error: "RefreshTokenError",
    };
  }
}

export default NextAuth({
  secret: process.env.SECRET_KEY,
  // can configure more than one
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000,
        };
      }
      // the access token is still valid
      // return the previous token if the access token
      // has not expires yet
      if (Date.now() < token.accessTokenExpires) {
        console.log("Token is still valid...");
        return token;
      }

      // access token has expired
      console.log("Token expired, refreshing...");
      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;
      return session;
    },
  },
});
