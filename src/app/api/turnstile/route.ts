import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { TURNSTILE_SECRET_KEY } from '@/shared/consts';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { token } = body;

        if (!token) {
            return NextResponse.json({ message: 'Токен отсутствует' }, { status: 400 });
        }
        const ip = headers().get('x-real-ip');
        const verifyFormData = new FormData();
        verifyFormData.append('secret', TURNSTILE_SECRET_KEY);
        verifyFormData.append('response', String(token));
        verifyFormData.append('remoteip', String(ip));
        const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

        const result = await fetch(url, {
            body: verifyFormData,
            method: 'POST',
        });

        const outcome = await result.json();

        if (!outcome.success) {
            return NextResponse.json({ message: outcome }, { status: 400 });
        }

        return NextResponse.json({ message: outcome });
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ message: 'Ошибка обработки запроса' }, { status: 500 });
    }
}
