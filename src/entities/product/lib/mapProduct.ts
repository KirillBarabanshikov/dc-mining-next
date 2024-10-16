import { mapCategory } from '@/entities/category';
import { BASE_URL } from '@/shared/consts';

import { IProductDto } from '../api';
import { IProduct } from '../model';

export function mapProduct(product: IProductDto): IProduct {
    return {
        ...product,
        images: product.images.map((image) => ({ ...image, image: BASE_URL + image.image })),
        category: product.category ? mapCategory(product.category) : undefined,
    };
}
