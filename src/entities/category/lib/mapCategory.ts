import { BASE_URL } from '@/shared/consts';

import { ICategoryDto } from '../api';
import { ICategory } from '../model';
import { getCategorySeoName } from './getCategorySeoName';

const links: Record<string, string> = {
  ['Размещение в дата центре']: '/data-center',
  ['Ремонт и сервис']: '/service',
  ['Лизинг']: '/leasing',
};

export function mapCategory(category: ICategoryDto): ICategory {
  return {
    ...category,
    image: BASE_URL + category.image,
    link: links[category.title],
    subCategory: category.subCategory?.sort((a, b) =>
      a.title.localeCompare(b.title),
    ),
    seoName: getCategorySeoName(category.title),
  };
}
