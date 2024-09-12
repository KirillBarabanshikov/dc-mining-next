import { mapCategory } from '@/entities/category';
import { BASE_URL } from '@/shared/consts';
import { createSlug } from '@/shared/lib';

import { IProductDto } from '../api';
import { IProduct, IProductImage } from '../model';

export function mapProduct(product: IProductDto): IProduct {
    return {
        ...product,
        images: product.images.map(mapImage),
        slug: createSlug(product.title),
        category: product.category ? mapCategory(product.category) : undefined,
    };
}

function mapImage(image: IProductImage): IProductImage {
    return {
        id: image.id,
        image: BASE_URL + image.image,
    };
}
