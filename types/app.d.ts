declare global {
    declare module 'react-google-recaptcha';

    interface Window {
        phone: string | undefined;
        ym: (id: number, method: string, ...args: any[]) => void;
        turnstile: any;
        // mgo: any;
    }

    const ymaps: any;
}

export {};
