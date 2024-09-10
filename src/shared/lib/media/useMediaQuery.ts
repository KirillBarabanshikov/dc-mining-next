'use client';

import { useEffect, useState } from 'react';

export const useMediaQuery = (query: string): boolean => {
    const [matches, setMatches] = useState<boolean>(false);

    useEffect(() => {
        const matchMedia = window.matchMedia(query);

        const handleChange = () => {
            setMatches(matchMedia.matches);
        };

        handleChange();

        if (matchMedia.addListener) {
            matchMedia.addListener(handleChange);
        } else {
            matchMedia.addEventListener('change', handleChange);
        }

        return () => {
            if (matchMedia.removeListener) {
                matchMedia.removeListener(handleChange);
            } else {
                matchMedia.removeEventListener('change', handleChange);
            }
        };
    }, [query]);

    return matches;
};
