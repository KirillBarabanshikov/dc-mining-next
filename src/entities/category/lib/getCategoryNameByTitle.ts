const names: Record<string, string> = {
    asicMiners: 'ASIC майнеры',
    containersMining: 'Контейнеры для майнинга',
    firmware: 'Прошивки для оборудования',
    accessories: 'Комплектующие',
    accommodationDataCentre: 'Размещение в дата центре',
    repairAndService: 'Ремонт и сервис',
    usefulLinks: 'Полезные ссылки',
    readyBusiness: 'Готовый бизнес для майнинга криптовалют',
    leasing: 'Лизинг',
};

export function getCategoryNameByTitle(categoryTitle: string): string {
    return names[categoryTitle] ?? '';
}
