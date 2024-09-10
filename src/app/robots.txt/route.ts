import { NextResponse } from 'next/server';

import { BASE_URL } from '@/shared/consts';

interface IRobotsData {
    robots: string;
}

export async function GET() {
    try {
        const response = await fetch(BASE_URL + '/api/settings');
        const robotsData: IRobotsData = await response.json();

        return new NextResponse(robotsData.robots, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
            },
        });
    } catch (error) {
        return new NextResponse('Error robots.txt', { status: 500 });
    }
}
