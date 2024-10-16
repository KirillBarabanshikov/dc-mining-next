import { NextResponse } from 'next/server';

import { BASE_URL } from '@/shared/consts';

interface IRobotsData {
    robots: string;
}

export async function GET() {
    try {
        const response = await fetch(BASE_URL + '/api/settings', {
            cache: 'no-store',
        });
        const robotsData: IRobotsData = await response.json();

        return new NextResponse(robotsData.robots);
    } catch (error) {
        return new NextResponse('Error robots.txt', { status: 500 });
    }
}
