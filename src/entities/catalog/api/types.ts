export interface IFilterDto {
    id: number;
    category: string;
    characteristics: string;
    lists?: string[];
    start?: number;
    end?: number;
}

export interface ICatalogParams {
    type?: string;
    characteristics?: string;
    price?: string;
    tags?: string;
    brand?: string;
    sortBy?: string;
    sortOrder?: string;
    profitable?: boolean;
    powerful?: boolean;
    customFilters?: string;
    page?: string | number;
}
