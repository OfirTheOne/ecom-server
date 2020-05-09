import * as _ from 'lodash';
import { ProductModel, ProductDocument } from './product.model'
import { EntityRepository } from '../../core/entity-repository';
import { ObjectID, ObjectId } from 'mongodb';
import { Product, ProductSortableFields } from './product.entity';
import { Provider } from '@o-galaxy/ether/core';
import { ArrayType } from 'general-types'
import { parse } from '../../../utils/parse'


const productSortableFields = [
    'price', 
    'sku',
    'rank',
]

@Provider()
export class ProductRepository extends EntityRepository<Product, ProductDocument> {
    
   
    constructor() {
        super(ProductModel)
    }

    public async filterProducts(options: { 
        active: boolean, 
        name: string, 
        category: string, 
        sub_category: string,
        price_range: [number, number],
        sort?: { field: ArrayType<typeof ProductSortableFields>, order:-1|1 }
        labels?: Array<{key: string, value: string}>

    }, skip: number, limit: number) {

        let pipelines: Array<any> = [
            
            { $match: { active: options.active != undefined ? options.active : true } },
            options.name ?          { $match: { name: { $regexp: RegExp(`${options.name.trim()}`) } } }                     : undefined,
            options.category ?      { $match: { category: new ObjectID(options.category) } }                                : undefined,
            options.sub_category ?  { $match: { sub_category: new ObjectID(options.sub_category) } }                        : undefined,
            options.price_range ?   { $match: { price: { $gte: options.price_range[0], $lte: options.price_range[1] } } }   : undefined,

        ];
        
        if(options.labels?.length) {

        }

        pipelines.push(
            { $skip: skip },
            { $limit: limit },
        );

        pipelines = pipelines.filter( pipe => pipe != undefined);
        const results: Array<ProductDocument> = await this.entityModel.aggregate(pipelines);
        const cleanResults = results.map(p => this.projectSafeEntity(p))
        return cleanResults;        

    }
    
    public ingestSafeEntity(data: any) {
        return parse(
                data, 
                {
                    'sku': 'sku',
                    'name' : 'name',
                    'description' : 'description',
                    'note' : 'note',
                    'price' : (price) => Number(price),
                    'currency': 'currency',
                    'color_options': 'color_options',
                    'color_price_factor': 'color_price_factor',
                    'size_options': 'size_options',
                    'size_price_factor': 'size_price_factor',
                    'category': (category) => new ObjectId(category),
                    'sub_category': (category) => new ObjectId(category),
                    'images_url' : 'images_url',
                    'active': (active) => active==true || active=='true',
                    'meta': 'meta',
                },
                { applyMapping: (v) => v!= undefined && v!=null }
        )
    }
    // public async createProduct(product: Partial<Product>) {

    //     try {
    //         return await this.entityModel.create({...product, _id: undefined})
            
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    public projectSafeEntity(entity: ProductDocument): Partial<ProductDocument> {
        return _.pick(entity, [
            '_id',
            'sku',
            'name',
            'description',
            'note',
            'price',
            'currency',
            'color_options',
            'color_price_factor',
            'size_options',
            'size_price_factor',
            'category',
            'sub_category',
            'images_url',
            'active',
            'meta',
        ])
    }

}