import { IProductsByCategoryDto } from '../api';
import { IProductsByCategory } from '../model';
import { mapProduct } from './mapProduct';

export function mapProductsByCategory(products: IProductsByCategoryDto): IProductsByCategory {
    return {
        countProducts: products.category.product_count,
        products: products.category.products.map(mapProduct),
    };
}
