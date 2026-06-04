import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { createAuth } from '@/lib/auth';
import { getCloudflareContext } from '@opennextjs/cloudflare';

export const dynamic = 'force-dynamic';

const HomePage = async () => {
  const { env } = getCloudflareContext();
  const authInstance = createAuth(env);
  const session = await authInstance.api.getSession({
    headers: await headers()
  });
  if (session?.user) {
    redirect('/dashboard');
  } else {
    redirect('/auth/login');
  }

  return null;
}

export default HomePage;