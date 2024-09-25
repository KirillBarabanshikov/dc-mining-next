declare global {
    declare module 'react-google-recaptcha';

    interface Window {
        phone: string | undefined;
    }

    declare const ym: any;
}

export {};
