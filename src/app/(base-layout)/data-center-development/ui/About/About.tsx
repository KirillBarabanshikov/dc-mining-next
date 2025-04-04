import './About.scss';

import Image from 'next/image';

export const About = () => {
  return (
    <section className={'about'}>
      <div className={'about__inner _container'}>
        <Image
          src={
            'https://s3-alpha-sig.figma.com/img/491c/4da3/fc8f1c35e89dcfe8923eb7d4fd14bf5b?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=EUlsL-bel51AGpJj5bQUqUXoyptUtBUdBTk~tbNZYorMS2GvQXKv9Zh36DLhNeuSuOCp~HOKJWnAodeSRnXZ~OsZoSpS2y5v2kOmjEyCxlzW0-Uzs5ehxUglygtuKOne90tkNKgFx0c7Z9ZAqrpexd4JH5GKgwV7V4z8nGV-MZ5YFHsUk8UxeJ5sTbY76O~0~MFtvRzVk08PfhwrmhK-cXBqszpi8H6XSKhrZuHYDxok1vrXCh6iZQvF~NJIWpyaouDti4oU-n12NxU0aYYdtu3CTSMt0RuC8M1wX1mM63cx-6jtQnFgAR5TE8scEchGbQUhcY5kaXRv3jVWBfmjqw__'
          }
          alt={''}
          width={436}
          height={436}
          className={'about__image'}
        />
        <div className={'about__body'}>
          <h3 className={'about__title h2'}>О компании</h3>
          <div className={'about__subtitle'}>
            DC Mining — эксперт в строительстве и эксплуатации дата-центров.
            Наши специалисты реализовали десятки успешных проектов и
            обеспечивают надежную инфраструктуру для майнинга криптовалют
          </div>
          <div className={'about__list'}>
            <div className={'about__item'}>
              <Image
                src={
                  'https://s3-alpha-sig.figma.com/img/4405/4c2e/e617bd299544c80da57749bc255f3ece?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=TnqkPrzOmZfUt4iiNpqnS9amTI3-rAZGtuTp7xPiAmV0yiUnfg6dQvF12WIi303OwcjN-qzBjEbOMFHS81OOjCwGkPIEwZ8XaRTHVQiSyly8arzSDNEtGl73Gb3RdAd-DaAXLjfObAT-gVm3Kgj2-LQBlIa2qpQRioqAw~7h42T1yM~BPtqYFJB~-M7EtBkQB9immvScNcetkhoxvnRoBVhzhs6KU-K4UFvmJWGttQGitgNGrVS0q7b6JnAT8qIg0m02A6NGJDFkHZuJ2vuYCM5gig4MX12YMmAde-tBoJN0BEnRMAMtXLEC~YMW12U0RHz2VYhtOrAyPpZ8wHQJeg__'
                }
                alt={''}
                width={106}
                height={106}
                className={'about__item-image'}
              />
              <div className={'about__item-title'}>
                Опыт работы с крупными и средними инвесторами
              </div>
            </div>
            <div className={'about__item'}>
              <Image
                src={
                  'https://s3-alpha-sig.figma.com/img/4405/4c2e/e617bd299544c80da57749bc255f3ece?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=TnqkPrzOmZfUt4iiNpqnS9amTI3-rAZGtuTp7xPiAmV0yiUnfg6dQvF12WIi303OwcjN-qzBjEbOMFHS81OOjCwGkPIEwZ8XaRTHVQiSyly8arzSDNEtGl73Gb3RdAd-DaAXLjfObAT-gVm3Kgj2-LQBlIa2qpQRioqAw~7h42T1yM~BPtqYFJB~-M7EtBkQB9immvScNcetkhoxvnRoBVhzhs6KU-K4UFvmJWGttQGitgNGrVS0q7b6JnAT8qIg0m02A6NGJDFkHZuJ2vuYCM5gig4MX12YMmAde-tBoJN0BEnRMAMtXLEC~YMW12U0RHz2VYhtOrAyPpZ8wHQJeg__'
                }
                alt={''}
                width={106}
                height={106}
                className={'about__item-image'}
              />
              <div className={'about__item-title'}>
                Опыт работы с крупными и средними инвесторами
              </div>
            </div>
            <div className={'about__item'}>
              <Image
                src={
                  'https://s3-alpha-sig.figma.com/img/4405/4c2e/e617bd299544c80da57749bc255f3ece?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=TnqkPrzOmZfUt4iiNpqnS9amTI3-rAZGtuTp7xPiAmV0yiUnfg6dQvF12WIi303OwcjN-qzBjEbOMFHS81OOjCwGkPIEwZ8XaRTHVQiSyly8arzSDNEtGl73Gb3RdAd-DaAXLjfObAT-gVm3Kgj2-LQBlIa2qpQRioqAw~7h42T1yM~BPtqYFJB~-M7EtBkQB9immvScNcetkhoxvnRoBVhzhs6KU-K4UFvmJWGttQGitgNGrVS0q7b6JnAT8qIg0m02A6NGJDFkHZuJ2vuYCM5gig4MX12YMmAde-tBoJN0BEnRMAMtXLEC~YMW12U0RHz2VYhtOrAyPpZ8wHQJeg__'
                }
                alt={''}
                width={106}
                height={106}
                className={'about__item-image'}
              />
              <div className={'about__item-title'}>
                Опыт работы с крупными и средними инвесторами
              </div>
            </div>
            <div className={'about__item'}>
              <Image
                src={
                  'https://s3-alpha-sig.figma.com/img/4405/4c2e/e617bd299544c80da57749bc255f3ece?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=TnqkPrzOmZfUt4iiNpqnS9amTI3-rAZGtuTp7xPiAmV0yiUnfg6dQvF12WIi303OwcjN-qzBjEbOMFHS81OOjCwGkPIEwZ8XaRTHVQiSyly8arzSDNEtGl73Gb3RdAd-DaAXLjfObAT-gVm3Kgj2-LQBlIa2qpQRioqAw~7h42T1yM~BPtqYFJB~-M7EtBkQB9immvScNcetkhoxvnRoBVhzhs6KU-K4UFvmJWGttQGitgNGrVS0q7b6JnAT8qIg0m02A6NGJDFkHZuJ2vuYCM5gig4MX12YMmAde-tBoJN0BEnRMAMtXLEC~YMW12U0RHz2VYhtOrAyPpZ8wHQJeg__'
                }
                alt={''}
                width={106}
                height={106}
                className={'about__item-image'}
              />
              <div className={'about__item-title'}>
                Опыт работы с крупными и средними инвесторами
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
