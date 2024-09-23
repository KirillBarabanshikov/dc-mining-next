import { mapCategory } from '@/entities/category';
import { BASE_URL } from '@/shared/consts';
import { createSlug } from '@/shared/lib';

import { IProductDto } from '../api';
import { IProduct } from '../model';

export function mapProduct(product: IProductDto): IProduct {
    return {
        ...product,
        images: product.images.map((image) => ({ ...image, image: BASE_URL + image.image })),
        slug: createSlug(product.title),
        category: product.category ? mapCategory(product.category) : undefined,
    };
}
