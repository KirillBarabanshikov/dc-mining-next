import clsx from 'clsx';
import { FC, useState } from 'react';

import { IDataCenterPhotos } from '@/entities/pageInfo/model';
import { LivePhotos } from '@/widgets';

import styles from './Photos.module.scss';

interface IPhotosProps {
  photos: IDataCenterPhotos[];
  className?: string;
}

export const Photos: FC<IPhotosProps> = ({ photos, className }) => {
  const [activeTab, setActiveTab] = useState(0);

  if (!photos.length) return <></>;

  const media = photos[activeTab].images.map((image) => image.image);

  return (
    <div className={clsx(styles.livePhotos, className)}>
      <div className={'container'}>
        <div className={styles.livePhotosTabs}>
          {photos.map((slider, index) => {
            return (
              <div
                key={slider.id}
                className={clsx(
                  styles.livePhotosTab,
                  activeTab === index && styles.active,
                )}
                onClick={() => setActiveTab(index)}
              >
                {slider.title}
              </div>
            );
          })}
        </div>
      </div>
      <LivePhotos media={media} />
    </div>
  );
};
