import { BASE_URL } from '@/shared/consts';
import { createSlug } from '@/shared/lib';

import { ICategoryDto } from '../api';
import { ICategory } from '../model';
import { getCategoryNameByTitle } from './getCategoryNameByTitle';

const links: Record<string, string> = {
    accommodationDataCentre: '/data-center',
    repairAndService: '/service',
    usefulLinks: '/links',
    leasing: '/leasing',
};

export function mapCategory(category: ICategoryDto): ICategory {
    const categoryName = getCategoryNameByTitle(category.title);

    return {
        id: category.id,
        title: category.title,
        image: BASE_URL + category.image,
        display: category.display,
        name: categoryName,
        slug: createSlug(categoryName),
        subCategory: category.subCategory,
        link: links[category.title],
        images: category.images,
    };
}
