import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const role = req.nextauth.token?.role;
    const path = req.nextUrl.pathname;

    // Admin Dashboard: Only accessible to ADMIN
    if (path.startsWith("/admin")) {
      if (role !== "ADMIN") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    // Team Dashboard: Accessible to ADMIN and TEAM_MEMBER
    if (path.startsWith("/team")) {
      if (role !== "ADMIN" && role !== "TEAM_MEMBER") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // Return true allows the middleware function above to be executed
      // If the user is entirely unauthenticated, authorized returns false and automatically redirects to /login (because of NextAuth default behavior).
      authorized: ({ token }) => !!token,
    },
    secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
  }
);

export const config = {
  // Apply middleware only to /admin and /team routes (and their subpaths)
  matcher: ["/admin/:path*", "/team/:path*"],
};
