import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.SECRET_KEY });
  const { pathname, origin } = req.nextUrl;

  // user is registered
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }
}
