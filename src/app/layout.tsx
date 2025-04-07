import '@/shared/styles/index.css';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import '@/shared/styles/main.scss';

import type { Metadata } from 'next';
import Script from 'next/script';
import React from 'react';

import { LocationProvider } from './locationProvider';
import { QueryProvider } from './queryProvider';

export const revalidate = 0;

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
  other: {
    'yandex-verification': 'a930c94ae40ba145',
    'google-site-verification': '4Lq2UOlHmWA-VvtRjoszSPO46tQZksDQpljLY2r-vEU',
    'mailru-domain': 'mSupiPZza7ZVWW82',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const response = await fetch(BASE_URL + '/api/settings');
  // const data = await response.json();

  return (
    <html lang='ru'>
      {/*<head dangerouslySetInnerHTML={{ __html: data.yandex }} />*/}
      <body>
        <Script
          id='pixel'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `(function (d, w) {
              var n = d.getElementsByTagName("script")[0],
                  s = d.createElement("script");
              s.type = "text/javascript";
              s.async = true;
              s.src = "https://victorycorp.ru/index.php?ref="+d.referrer+"&page=" + encodeURIComponent(w.location.href);
              n.parentNode.insertBefore(s, n);
          })(document, window);`,
          }}
        />

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
          id='calltouch'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,n,c){w.CalltouchDataObject=n;w[n]=function(){w[n]["callbacks"].push(arguments)};if(!w[n]["callbacks"]){w[n]["callbacks"]=[]}w[n]["loaded"]=false;if(typeof c!=="object"){c=[c]}w[n]["counters"]=c;for(var i=0;i<c.length;i+=1){p(c[i])}function p(cId){var a=d.getElementsByTagName("script")[0],s=d.createElement("script"),i=function(){a.parentNode.insertBefore(s,a)},m=typeof Array.prototype.find === 'function',n=m?"init-min.js":"init.js";s.async=true;s.src="https://mod.calltouch.ru/"+n+"?id="+cId;if(w.opera=="[object Opera]"){d.addEventListener("DOMContentLoaded",i,false)}else{i()}}})(window,document,"ct","a3jdr6dx");`,
          }}
        />

        <Script
          src={
            'https://api-maps.yandex.ru/2.1/?apikey=3264ca32-f578-44c1-b743-f030dca1ba3a&lang=ru_RU'
          }
          strategy={'beforeInteractive'}
        />

        <Script
          id='metrika-id'
          strategy='beforeInteractive'
          dangerouslySetInnerHTML={{
            __html: `window.METRIKA_ID = 98130237;`,
          }}
        />

        {/*<Script*/}
        {/*  src='https://pub.make.st/digital/antifraud.js'*/}
        {/*  strategy='lazyOnload'*/}
        {/*/>*/}
        <noscript>
          <div>
            <img
              src='https://mc.yandex.ru/watch/98130237'
              style={{ position: 'absolute', left: '-9999px' }}
              alt=''
              loading='lazy'
            />
          </div>
        </noscript>
        <QueryProvider>
          <LocationProvider>{children}</LocationProvider>
        </QueryProvider>
        <div id={'portal'} />
        <div id={'overlay'} />
      </body>
    </html>
  );
}
