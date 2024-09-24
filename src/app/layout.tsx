import '@/shared/styles/index.css';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

import type { Metadata } from 'next';
import React from 'react';

import { Layout } from '@/shared/ui';
import { Footer, Header } from '@/widgets';

import { QueryProvider } from './queryProvider';

export const metadata: Metadata = {
    title: 'dc mining',
    description: 'dc mining',
    icons: {
        apple: {
            url: '/apple-touch-icon.png',
            sizes: '180x180',
        },
        icon: [
            {
                url: '/favicon-32x32.png',
                sizes: '32x32',
                type: 'image/png',
            },
            {
                url: '/favicon-16x16.png',
                sizes: '16x16',
                type: 'image/png',
            },
            {
                rel: 'mask-icon',
                url: '/safari-pinned-tab.svg',
                color: '#5bbad5',
            },
        ],
    },
    manifest: '/site.webmanifest',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='ru'>
            <body>
                <QueryProvider>
                    <Layout headerSlot={<Header />} footerSlot={<Footer />}>
                        {children}
                    </Layout>
                </QueryProvider>
                <div id={'portal'} />
                <div id={'overlay'}></div>
            </body>
        </html>
    );
}
