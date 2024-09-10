export const CHARACTERISTICS: Record<string, string> = {
    ['Бренд']: 'brand',
    ['Алгоритм']: 'algorithm',
    ['Добываемые монеты']: 'coin',
    ['Тип']: 'type',
    ['Доход в месяц']: 'income',
    ['Мощность']: 'power',
    ['Количество мест']: 'seats',
    ['Производитель']: 'manufacturer',
    ['Первоначальные вложения']: 'investments',
    ['Вычислительная мощность']: 'compPower',
} as const;

export const CHARACTERISTICS_KEYS: Record<string, string> = {
    brand: 'Бренд',
    algorithm: 'Алгоритм',
    coin: 'Добываемые монеты',
    type: 'Тип',
    income: 'Доход в месяц',
    power: 'Мощность',
    seats: 'Количество мест',
    manufacturer: 'Производитель',
    investments: 'Первоначальные вложения',
    compPower: 'Вычислительная мощность',
} as const;
