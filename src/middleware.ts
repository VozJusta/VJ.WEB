import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_ROUTES = ["/dashboard", "/advogado"];
const AUTH_ROUTES = ["/login", "/onBoarding", "/esqueci-minha-senha", "/redefinir-senha", "/verificacao"];

function getDashboardForRole(role: string | undefined): string {
  return role === "lawyer" ? "/advogado" : "/dashboard";
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("access_token")?.value;
  const userRole = request.cookies.get("user_role")?.value;
  const hasAccessToken = !!accessToken;

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  if (isProtectedRoute && !hasAccessToken) {
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
  ],
};
