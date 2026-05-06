import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

  if (!code) {
    return NextResponse.redirect(new URL('/login?error=no_code', request.url));
  }

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      throw new Error('API URL not configured');
    }

    const callbackUrl = `${apiUrl}/auth/google/callback?code=${code}&state=${state}`;

    const response = await fetch(callbackUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Authentication failed: ${response.status}`);
    }

    const authData = await response.json();

    const encodedData = Buffer.from(JSON.stringify(authData)).toString('base64');

    // Prefer the role from the API response; fall back to the state param (set before Google redirect)
    const rawRole = typeof authData.role === 'string'
      ? authData.role.split('|')[0].trim().toLowerCase()
      : (state ?? 'citizen');
    const role = rawRole === 'lawyer' ? 'lawyer' : 'citizen';
    const homePath = role === 'lawyer' ? '/advogado' : '/dashboard';

    const redirectUrl = new URL(homePath, request.url);
    redirectUrl.searchParams.set('authData', encodedData);

    const redirectResponse = NextResponse.redirect(redirectUrl.toString());

    redirectResponse.cookies.set('user_role', role, {
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    redirectResponse.cookies.set('google_auth_data', encodedData, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 300,
      path: '/',
    });

    return redirectResponse;
  } catch {
    return NextResponse.redirect(
      new URL('/login?error=authentication_failed', request.url)
    );
  }
}
