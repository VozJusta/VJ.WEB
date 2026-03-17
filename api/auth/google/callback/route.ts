import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

  if (!code) {
    return new Response('Missing authorization code', { status: 400 });
  }

  try {
    const authResponse = await fetch(
      `https://vj-api-yx3g.onrender.com/auth/google/callback?code=${code}&state=${state}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!authResponse.ok) {
      throw new Error(`Authentication failed: ${authResponse.status}`);
    }

    const authData = await authResponse.json();

    const dashboardRedirect =
      authData.role === 'lawyer' ? '/dashboard/lawyer' : '/dashboard/citizen';

    redirect(dashboardRedirect + `?user=${authData.sub}`);
  } catch (error) {
    console.error('Google auth callback error:', error);
    redirect('/auth?error=authentication_failed');
  }
}
