export const CATEGORIES_NAMES = {
    asicMiners: 'ASIC майнеры',
    containersMining: 'Контейнеры для майнинга',
    firmware: 'Прошивки для оборудования',
    accessories: 'Комплектующие',
    repairAndService: 'Ремонт и сервис',
    accommodationDataCentre: 'Размещение в дата центре',
    usefulLinks: 'Полезные ссылки',
    readyBusiness: 'Готовый бизнес под ключ',
} as const;

export const CATEGORIES_KEYS: Record<string, string> = {
    ['ASIC майнеры']: 'asicMiners',
    ['Контейнеры для майнинга']: 'containersMining',
    ['Прошивки для оборудования']: 'firmware',
    ['Комплектующие']: 'accessories',
    ['Ремонт и сервис']: 'repairAndService',
    ['Размещение в дата центре']: 'accommodationDataCentre',
    ['Полезные ссылки']: 'usefulLinks',
    ['Готовый бизнес под ключ']: 'readyBusiness',
} as const;
