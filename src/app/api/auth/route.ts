import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { BASE_URL } from '@/shared/consts';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const res = await fetch(`${BASE_URL}/api/employees`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    return NextResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 },
    );
  }

  const manager = await res.json();

  const cookieStore = cookies();
  cookieStore.set('manager', manager.id, {
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 30 * 24 * 60 * 60,
  });

  return NextResponse.json(manager);
}
