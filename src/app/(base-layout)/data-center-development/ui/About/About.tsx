import './About.scss';

import Image from 'next/image';
import { FC } from 'react';

import { IDataCenterDevelopmentInfo } from '@/entities/pageInfo';
import { BASE_URL } from '@/shared/consts';

interface IAboutProps {
  info: IDataCenterDevelopmentInfo;
}

export const About: FC<IAboutProps> = ({ info }) => {
  return (
    <section className={'about'}>
      <div className={'about__inner _container'}>
        <Image
          src={BASE_URL + info.image}
          alt={''}
          width={436}
          height={436}
          className={'about__image'}
        />
        <div className={'about__body'}>
          <h2 className={'about__title h2'}>{info.aboutTitle}</h2>
          <div
            className={'about__subtitle'}
            dangerouslySetInnerHTML={{ __html: info.aboutDescription }}
          />
          <div className={'about__list'}>
            {info.abouts.map((item) => {
              return (
                <div key={item.id} className={'about__item'}>
                  <Image
                    src={BASE_URL + item.image}
                    alt={''}
                    width={106}
                    height={106}
                    className={'about__item-image'}
                  />
                  <div className={'about__item-title'}>{item.title}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
