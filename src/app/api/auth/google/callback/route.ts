import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=no_code", request.url));
  }

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      throw new Error("API URL not configured");
    }

    const callbackUrl = `${apiUrl}/auth/google/callback?code=${code}&state=${encodeURIComponent(state ?? "")}`;

    const response = await fetch(callbackUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      redirect: "manual",
    });

    if (!response.ok && response.status !== 302) {
      throw new Error(`Authentication failed: ${response.status}`);
    }

    const securityToken =
      response.headers.get("x-security-token") ||
      response.headers.get("X-Security-Token") ||
      "";

    const authData = await response.json();

    const enrichedData = {
      ...authData,
      securityToken: securityToken || undefined,
    };

    const encodedData = Buffer.from(JSON.stringify(enrichedData)).toString(
      "base64",
    );

    const rawRole =
      authData.role?.toLowerCase?.() ?? state?.split("|")[0] ?? "citizen";
    const role = rawRole === "lawyer" ? "lawyer" : "citizen";

    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL ?? new URL(request.url).origin;

    const redirectUrl = new URL("/auth/callback", appUrl);
    redirectUrl.searchParams.set("authData", encodedData);

    const redirectResponse = NextResponse.redirect(redirectUrl.toString());

    redirectResponse.cookies.set("user_role", role, {
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    if (authData.registerCompleted && securityToken) {
      redirectResponse.cookies.set("access_token", securityToken, {
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
    }

    return redirectResponse;
  } catch {
    return NextResponse.redirect(
      new URL("/login?error=authentication_failed", request.url),
    );
  }
}
