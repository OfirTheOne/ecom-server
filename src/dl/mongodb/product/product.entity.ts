import { Category } from '../category';
import { SubCategory } from '../sub-category';
import { SortableFields } from '../../core/sortable-fields'
import { Dictionary } from 'ts-essentials';

import { parse } from '../../../utils';

export interface ProductEntity {
    sku: string, 
    id_sku?: string,
    item_index: number,
    name: string, 
    description: string,
    note?: string,  
    price: number,
    currency?: string,
    color_options: Array<string>,
    color_price_factor: Array<number>,
    size_options: Array<string>,
    size_price_factor: Array<number>,
    category: Category|string, // populated at runtime
    sub_category: SubCategory|string, // populated at runtime
    images_url: Array<string>,
    active: boolean,
    meta: {[key: string]: any}
}



export class Product implements ProductEntity {
    sku: string;
    id_sku?: string;
    item_index: number;
    name: string;
    description: string;
    note?: string;
    price: number;
    currency?: string;
    color_options: string[];
    color_price_factor: number[];
    size_options: string[];
    size_price_factor: number[];
    category: Category|string;
    sub_category: SubCategory|string;
    images_url: string[];
    active: boolean;
    meta: { [key: string]: any; };


    static parseFromCsv(csvEncode: Dictionary<string, keyof ProductEntity>) {

        // const y = Object.keys(Object.create(Product.prototype))
        const parsedProduct = parse(
            csvEncode, 
            {
                sku: 'sku',
                id_sku: 'id_sku',
                item_index: (n => Number(n)),
                name: 'name',
                description: 'description',
                note: 'note',
                price: (n => Number(n)),
                currency: 'currency',
                color_options: (t) => t.split(' '),
                color_price_factor: (t) => t.split(' ').map(n => Number(n)),
                size_options: (t) => t.split(' '),
                size_price_factor: (t) => t.split(' ').map(n => Number(n)),
                category: 'category',
                sub_category: 'sub_category',
                images_url: (t) => t.split(' '),
                active: (b) => b?.toLowerCase()=='true',
                meta: (meta) => JSON.parse(meta)
            }, 
            { applyMapping: ((v) => v!= undefined && v!=null) }
        );
            return parsedProduct;
    }

    constructor(product: ProductEntity)  { 
        Object.assign(this, product)
    }
}

// toModel<Product, typeof Product>(Product, 'users');

export const ProductSortableFields: SortableFields<Product> = ['price', 'sku']; 