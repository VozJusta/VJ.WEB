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

    const redirectUrl = new URL('/dashboard', request.url);
    redirectUrl.searchParams.set('authData', encodedData);

    const response2 = NextResponse.redirect(redirectUrl.toString());

    response2.cookies.set('google_auth_data', encodedData, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 300,
      path: '/',
    });

    return response2;
  } catch (error) {
    console.error('Google callback error:', error);
    return NextResponse.redirect(
      new URL('/login?error=authentication_failed', request.url)
    );
  }
}
