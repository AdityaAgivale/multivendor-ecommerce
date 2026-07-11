import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const userRole = (req.auth?.user as any)?.role;
  const isSellerRoute = req.nextUrl.pathname.startsWith("/seller");

  if (isSellerRoute && (!isLoggedIn || userRole !== "seller")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
});

export const config = {
  matcher: ["/seller/:path*"],
};