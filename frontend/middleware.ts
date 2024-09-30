import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = "/dashboard";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const sessionCookie = cookies().get("session")?.value;

  const isProtectedRoute = pathname.startsWith(protectedRoutes);

  if (isProtectedRoute && !sessionCookie?.length) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
