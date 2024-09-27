export interface IFilterDto {
    id: number;
    category: string;
    characteristics: string;
    lists?: string[];
    start?: number;
    end?: number;
}
