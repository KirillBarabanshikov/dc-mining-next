import { BASE_URL } from '@/shared/consts';

import { ICategoryDto } from '../api';
import { ICategory } from '../model';
import { getCategoryNameByTitle } from './getCategoryNameByTitle';
import { getCategorySeoName } from './getCategorySeoName';

const links: Record<string, string> = {
    accommodationDataCentre: '/data-center',
    repairAndService: '/service',
    usefulLinks: '/links',
    leasing: '/leasing',
};

export function mapCategory(category: ICategoryDto): ICategory {
    const name = getCategoryNameByTitle(category.title);

    return {
        ...category,
        image: BASE_URL + category.image,
        name,
        link: links[category.title],
        subCategory: category.subCategory?.sort((a, b) => a.title.localeCompare(b.title)),
        seoName: getCategorySeoName(category.title),
    };
}
