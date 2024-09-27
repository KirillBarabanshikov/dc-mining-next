export interface IFilter {
    id: number;
    category: {
        name: string;
        value: string;
    };
    characteristics: {
        name: string;
        value: string;
    };
    lists?: string[];
    start?: number;
    end?: number;
}

export interface IOffer {
    id: number;
    category: string;
    productTags: {
        id: number;
        title: string;
        color: string;
    }[];
}

export interface IFilterParams {
    type: string;
    characteristics?: string;
    price?: string;
    tags?: string;
    brand?: string;
    sortBy?: string;
    sortOrder?: string;
    profitable?: boolean;
    powerful?: boolean;
    customFilters?: string;
}
