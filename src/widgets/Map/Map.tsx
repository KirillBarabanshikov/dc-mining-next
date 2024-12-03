'use client';
import { FC, useEffect, useId } from 'react';

import styles from './Map.module.scss';

interface IMapProps {
    coordinates: number[];
}

export const Map: FC<IMapProps> = ({ coordinates }) => {
    const id = useId();

    useEffect(() => {
        ymaps.ready(init);
        function init() {
            const map = new ymaps.Map(id, {
                center: coordinates,
                zoom: 15,
                controls: [],
            });
            const placemark = new ymaps.Placemark(
                map.getCenter(),
                {},
                {
                    iconLayout: 'default#image',
                    iconImageHref: 'placemark.svg',
                    iconImageSize: [68, 74],
                    iconImageOffset: [-34, -74],
                },
            );
            map.geoObjects.add(placemark);
        }
    }, [coordinates, id]);

    return <div id={id} className={styles.map} />;
};
