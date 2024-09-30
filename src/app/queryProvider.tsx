'use client';

import { isServer, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, PropsWithChildren } from 'react';

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000,
            },
        },
    });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
    if (isServer) {
        return makeQueryClient();
    } else {
        if (!browserQueryClient) browserQueryClient = makeQueryClient();
        return browserQueryClient;
    }
}

export const QueryProvider: FC<PropsWithChildren> = ({ children }) => {
    const queryClient = getQueryClient();

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
