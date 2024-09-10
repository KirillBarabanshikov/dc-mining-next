import { NextResponse } from 'next/server';

import { BASE_URL } from '@/shared/consts';

interface ISitemapData {
    sitemap: string;
}

export async function GET() {
    try {
        const response = await fetch(BASE_URL + '/api/settings');
        const robotsData: ISitemapData = await response.json();

        return new NextResponse(robotsData.sitemap, {
            headers: {
                'Content-Type': 'application/xml; charset=utf-8',
            },
        });
    } catch (error) {
        return new NextResponse('Error sitemap.xml', { status: 500 });
    }
}
