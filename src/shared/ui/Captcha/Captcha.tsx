'use client';

import clsx from 'clsx';
import React, { forwardRef, useEffect, useState } from 'react';
import ReCAPTCHA, { ReCAPTCHAProps } from 'react-google-recaptcha';

interface ICaptchaProps {
    onCaptchaVerify: (verify: boolean) => void;
    onExpired: () => void;
    className?: string;
}

type ReCAPTCHAWithRef = React.ComponentType<ReCAPTCHAProps & React.RefAttributes<ReCAPTCHA>>;

export const Captcha = forwardRef<ReCAPTCHA, ICaptchaProps>(({ onCaptchaVerify, onExpired, className }, ref) => {
    const [RecaptchaComponent, setRecaptchaComponent] = useState<ReCAPTCHAWithRef | null>(null);

    useEffect(() => {
        import('react-google-recaptcha').then((module) => {
            setRecaptchaComponent(() => module.default);
        });
    }, []);

    if (!RecaptchaComponent) return null;

    const handleCaptchaVerify = (token: any) => {
        if (token) {
            onCaptchaVerify(true);
        } else {
            onCaptchaVerify(false);
        }
    };

    return (
        <div style={{ transformOrigin: '0 0' }} className={clsx(className)}>
            <RecaptchaComponent ref={ref} sitekey={''} onChange={handleCaptchaVerify} onExpired={onExpired} />
        </div>
    );
});

Captcha.displayName = 'Captcha';
