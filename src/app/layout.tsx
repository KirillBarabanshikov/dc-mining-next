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
            </body>
        </html>
    );
}
