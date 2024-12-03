'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { FC, PropsWithChildren, useEffect } from 'react';

import { useMangoStore } from '@/shared/lib';
// import { TURNSTILE_SITE_KEY } from '@/shared/consts';

export const LocationProvider: FC<PropsWithChildren> = ({ children }) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { setNumber } = useMangoStore();

    useEffect(() => {
        if (typeof window === 'undefined') return;

        if (window.ym) {
            window.ym(98130237, 'hit');
        }
    }, [pathname, searchParams, setNumber]);

    useEffect(() => {
        if (!sessionStorage.getItem('entryPoint')) {
            sessionStorage.setItem('entryPoint', document.referrer);
        }
    }, []);

    // useEffect(() => {
    //     const turnstileContainers = document.querySelectorAll('.cf-turnstile');
    //
    //     turnstileContainers.forEach((turnstileContainer) => {
    //         turnstileContainer.innerHTML = '';
    //         if (window && window.turnstile) {
    //             window.turnstile.render(turnstileContainer, {
    //                 sitekey: TURNSTILE_SITE_KEY,
    //                 callback: 'javascriptCallback',
    //             });
    //         }
    //     });
    // }, [pathname]);

    return <>{children}</>;
};
