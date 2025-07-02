'use server';

import { auth } from '@clerk/nextjs/server';

export async function GET() {
  const session = await auth();

  if (!session.userId) {
    return new Response('Unauthorized', { status: 401 });
  }

  return new Response(`Hello user: ${session.userId}`);
}
