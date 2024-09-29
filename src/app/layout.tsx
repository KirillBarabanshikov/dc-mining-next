import '@/shared/styles/index.css';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

import type { Metadata } from 'next';
import Script from 'next/script';
import React from 'react';

import { LocationProvider } from './locationProvider';
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
                <Script
                    id='yandex-metrika'
                    strategy='afterInteractive'
                    dangerouslySetInnerHTML={{
                        __html: `(function (m, e, t, r, i, k, a) {
                  m[i] = m[i] || function () {
                    (m[i].a = m[i].a || []).push(arguments);
                  };
                  m[i].l = 1 * new Date();
                  for (var j = 0; j < document.scripts.length; j++) {
                    if (document.scripts[j].src === r) {
                      return;
                    }
                  }
                  (k = e.createElement(t)),
                    (a = e.getElementsByTagName(t)[0]),
                    (k.async = 1),
                    (k.src = r),
                    a.parentNode.insertBefore(k, a);
                })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');
                
                ym(98130237, 'init', {
                  defer: true,
                  clickmap: true,
                  trackLinks: true,
                  accurateTrackBounce: true,
                  webvisor: true,
                });`,
                    }}
                />

                <Script
                    id='mango-widget'
                    strategy='afterInteractive'
                    dangerouslySetInnerHTML={{
                        __html: `(function (w, d, u, i, o, s, p) {
                  if (d.getElementById(i)) { return; }
                  w['MangoObject'] = o;
                  w[o] = w[o] || function () {
                    (w[o].q = w[o].q || []).push(arguments);
                  };
                  w[o].u = u;
                  w[o].t = 1 * new Date();
                  s = d.createElement('script');
                  s.async = 1;
                  s.id = i;
                  s.src = u;
                  p = d.getElementsByTagName('script')[0];
                  p.parentNode.insertBefore(s, p);
              })(window, document, '//widgets.mango-office.ru/widgets/mango.js', 'mango-js', 'mgo');
              
              mgo({ calltracking: { id: 33382 } });`,
                    }}
                />
                <noscript>
                    <div>
                        <img
                            src='https://mc.yandex.ru/watch/98130237'
                            style={{ position: 'absolute', left: '-9999px' }}
                            alt=''
                        />
                    </div>
                </noscript>
                <QueryProvider>
                    <LocationProvider>{children}</LocationProvider>
                </QueryProvider>
                <div id={'portal'} />
                <div id={'overlay'}></div>
            </body>
        </html>
    );
}
