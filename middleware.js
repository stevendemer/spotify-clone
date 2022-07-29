import { NextReponse, NextRequest } from "next/server";
import { useRecoilValue } from "recoil";
import { userStateId } from "./atoms/user-atom";

export default async function middleware(req) {
  const { pathname } = req.nextUrl;
  //   const userId = useRecoilValue(userStateId);

  //   if (pathname.startsWith("/")) {
  //     // check if the user is logged in
  //     if (!userId) {
  //       return NextReponse.redirect("/login");
  //     }
  //   }
}
