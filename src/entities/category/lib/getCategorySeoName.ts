const names: Record<string, string> = {
    asicMiners: 'Асик майнеры',
    containersMining: 'Контейнеры для майнинга',
    firmware: 'Прошивки для оборудования',
    accessories: 'Комплектующие',
    readyBusiness: 'Готовый бизнес для майнинга криптовалют',
};

export function getCategorySeoName(categoryTitle: string): string {
    return names[categoryTitle] ?? '';
}
