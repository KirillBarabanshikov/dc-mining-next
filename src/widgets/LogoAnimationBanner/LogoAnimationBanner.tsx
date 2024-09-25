import styles from './LogoAnimationBanner.module.scss';

export const LogoAnimationBanner = () => {
    return (
        <>
            <div className={styles.bannerWrapper}>
                <video autoPlay loop muted playsInline>
                    <source src={'/animations/logo-animation-pc.webm'} media={'(min-width: 769px)'} />
                    <source src={'/animations/logo-animation-mobile.webm'} media='(max-width: 768px)' />
                    Ваш браузер не поддерживает тег video.
                </video>
            </div>
            <div className={styles.cover}></div>
        </>
    );
};
