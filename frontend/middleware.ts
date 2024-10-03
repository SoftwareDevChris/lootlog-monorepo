import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "./lib/auth/actions";

export async function middleware(req: NextRequest) {
  let res = NextResponse.next();
  let redirect = NextResponse.redirect(new URL("/login", req.url));

  const sessionCookie = req.cookies.get("session")?.value;

  res.headers.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );

  console.log("Middleware just ran");
  console.log("Middleware session cookie:", sessionCookie);

  if (sessionCookie) {
    try {
      const isAuthenticated = await verifySessionToken(sessionCookie);
      console.log("Token verified:", isAuthenticated);

      if (isAuthenticated) {
        return res;
      } else {
        return redirect;
      }
    } catch (err) {
      console.error("Error verifying token:", err);
      return redirect;
    }
  } else {
    return redirect;
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
