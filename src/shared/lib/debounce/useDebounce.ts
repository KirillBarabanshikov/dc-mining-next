'use client';

import { useEffect, useRef, useState } from 'react';

type Timer = ReturnType<typeof setTimeout>;
type SomeFunction = (...args: any[]) => void;

interface UseDebounceResult<Func> {
    readonly debouncedFunction: Func;
    readonly loadingDebounce: boolean;
}

export const useDebounce = <Func extends SomeFunction>(func: Func, delay = 1200): UseDebounceResult<Func> => {
    const timer = useRef<Timer>();
    const [loadingDebounce, setLoadingDebounce] = useState(false);

    useEffect(() => {
        return () => {
            if (!timer.current) return;
            clearTimeout(timer.current);
        };
    }, []);

    const debouncedFunction = ((...args) => {
        setLoadingDebounce(true);
        const newTimer = setTimeout(() => {
            setLoadingDebounce(false);
            func(...args);
        }, delay);
        clearTimeout(timer.current);
        timer.current = newTimer;
    }) as Func;

    return { debouncedFunction, loadingDebounce };
};
