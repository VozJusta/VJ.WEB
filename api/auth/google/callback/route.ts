import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

  if (!code) {
    redirect('/login?error=no_code');
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

    const dashboardUrl =
      authData.role === 'lawyer' ? '/dashboard/lawyer' : '/dashboard/citizen';

    redirect(
      `${dashboardUrl}?user=${authData.sub}&email=${authData.email}&name=${authData.full_name}`
    );
  } catch (error) {
    console.error('Google callback error:', error);
    redirect('/login?error=authentication_failed');
  }
}
