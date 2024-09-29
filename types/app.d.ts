declare global {
    declare module 'react-google-recaptcha';

    interface Window {
        phone: string | undefined;
        ym: (id: number, method: string, ...args: any[]) => void;
    }

    declare const ym: any;
}

export {};
