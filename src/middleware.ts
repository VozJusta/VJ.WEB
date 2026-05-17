import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_ROUTES = ["/dashboard", "/advogado"];
const AUTH_ROUTES = ["/login", "/onBoarding", "/esqueci-minha-senha", "/redefinir-senha", "/verificacao"];
// Routes that must never be blocked (OAuth callbacks, etc.)
const PUBLIC_ALWAYS = ["/auth/callback"];

function getDashboardForRole(role: string | undefined): string {
  return role === "lawyer" ? "/advogado" : "/dashboard";
}

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Never block public utility routes
  if (PUBLIC_ALWAYS.some((r) => pathname.startsWith(r))) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get("access_token")?.value;
  const userRole = request.cookies.get("user_role")?.value;
  const hasAccessToken = !!accessToken;

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  // Allow protected routes when authData is present (Google OAuth callback arriving at /dashboard)
  const hasAuthData = searchParams.has("authData");

  if (isProtectedRoute && !hasAccessToken && !hasAuthData) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && hasAccessToken) {
    const home = getDashboardForRole(userRole);
    return NextResponse.redirect(new URL(home, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/advogado/:path*",
    "/login",
    "/onBoarding/:path*",
    "/esqueci-minha-senha",
    "/redefinir-senha",
    "/verificacao/:path*",
    "/auth/callback",
  ],
};
