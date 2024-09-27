import { CATEGORIES_KEYS, CHARACTERISTICS } from '@/shared/consts';

import { IFilterDto } from '../api';
import { IFilter } from '../model';

export function mapFilter(filter: IFilterDto): IFilter {
    return {
        id: filter.id,
        category: {
            name: filter.category,
            value: CATEGORIES_KEYS[filter.category],
        },
        characteristics: {
            name: filter.characteristics,
            value: CHARACTERISTICS[filter.characteristics],
        },
        lists: filter.lists,
        start: filter.start,
        end: filter.end,
    };
}
