import * as _ from 'lodash';
import { ProductModel, ProductDocument } from './product.model'
import { EntityRepository } from '../../core/entity-repository';
import { ObjectID, ObjectId } from 'mongodb';
import { Product, ProductSortableFields, ProductRuntime } from './product.entity';
import { Provider } from '@o-galaxy/ether/core';
import { ArrayType } from 'general-types'
import { parse } from '../../../utils/parse'
import { PaginationQueryResult } from '../../core/pagination-query-result';
import { CategoryRepository, CategoryModel } from '../category';
import { SubCategoryRepository, SubCategoryModel } from '../sub-category';
import { DiscountModel } from '../system/discount';
import { PutUpdateProductParams } from '../../../models/update-product-params';
import { LabelEntryModel } from '../system/label-entry/label-entry.model';
import { LabelEnumModel } from '../system/label-enum';




export interface  FilterProductQueryOptions {
        active: boolean, 
        name: string, 
        sku: string, 
        category: string, 
        sub_category: string,
        min_price: number,
        max_price: number,
        sort: { field: ArrayType<typeof ProductSortableFields>, order:-1|1 }
        labels: Array<{key: string, value: string}>
}

@Provider()
export class ProductRepository extends EntityRepository<Product, ProductDocument> {
    
   
    constructor() {
        super(ProductModel)
    }

    public async updateProduct(id: string, params: Partial<PutUpdateProductParams>, isAdmin: boolean = false): Promise<ProductDocument> {
        if(!isAdmin) { return; }

        try {
            const cleanParams = parse(
                params, 
                {
                    category: (c) => new ObjectID(c),
                    sub_category: (c) => new ObjectID(c),
                    price: (p) => Number(p),
                    active: (a) => `${a}` == 'true',
                    name: 'name', 
                    description: 'description',
                    sku: 'sku',
                    size_options: 'size_options',
                    color_options: 'color_options',
                    images_url: 'images_url',
                }, 
                {
                    applyMapping: ((v) => v != undefined && v != null && v != "")
                }
            );
            return await this.entityModel.updateOne(
                {_id: new ObjectID(id)}, 
                {
                    $set: {
                        ...cleanParams
                    }
                }
            );     
            
        } catch (error) {
            throw error;
        }
    }
    
    public async filterProducts(options: Partial<FilterProductQueryOptions>, 
        skip: number, limit: number, flat: boolean = false, isAdmin: boolean = false
    ) : Promise<PaginationQueryResult<ProductRuntime>> {

        let pipelines: Array<any> = [
            
            { $match: { active: options.active != undefined ? options.active : true } },
            options.name ?          { $match: { name: { $regexp: RegExp(`${options.name.trim()}`) } } }     : undefined,
            options.sku ?           { $match: { sku: options.sku } }                                        : undefined,
            options.category ?      { $match: { category: new ObjectID(options.category) } }                : undefined,
            options.sub_category ?  { $match: { sub_category: new ObjectID(options.sub_category) } }        : undefined,
            options.min_price ?     { $match: { price: { $gte: options.min_price } } }                      : undefined,
            options.max_price ?     { $match: { price: { $lte: options.max_price } } }                      : undefined,

        ];
        
        if(options.labels?.length) {

        }

        if(!flat) {
            pipelines.push(
                ...this.populateProductPipelines()
            )
        }

        pipelines.push({
            $facet: {
                total_count: [
                    { $count: 'count' }
                ],
                items: [
                    { $skip: skip },
                    { $limit: limit },
                ]
            },
        })

        // pipelines.push(
        //     { $skip: skip },
        //     { $limit: limit },
        // );

        pipelines = pipelines.filter( pipe => pipe != undefined);
        const queryResult = await this.entityModel.aggregate(pipelines);
        if(!(queryResult?.length > 0)) {
            // throw Error
        } else {
            let { total_count, items } = queryResult[0]
            total_count = total_count[0]?.count;
            
            const projectedProducts = this.projectProducts(items)

            return {
                items: projectedProducts,
                total_count, skip, limit
            }
        }        

    }
    
    public async findProductsById(id: string, flat: boolean = false, isAdmin: boolean = false) : Promise<Partial<ProductRuntime>> {


        let pipelines: Array<any> = [
            
            !isAdmin ? { $match: { active: true } } : undefined,
            { $match: { _id:  new ObjectID(id) } }     
        ];

        if(!flat) {
            pipelines.push(
                ...this.populateProductPipelines()
            )
        }


        // pipelines.push(
        //     { $skip: skip },
        //     { $limit: limit },
        // );

        pipelines = pipelines.filter( pipe => pipe != undefined);
        const queryResult = await this.entityModel.aggregate(pipelines);
        if(!(queryResult?.length > 0)) {
            // throw Error
        } else {

            const projectedProducts = this.projectProducts(queryResult)
            return projectedProducts[0];
        }        

    }
    
    private projectProducts(queryResults: Array<any>): Array<ProductRuntime> {
        return queryResults.map(res => {
            const projectedProduct  = this.projectSafeEntity(res) as ProductRuntime
            projectedProduct.labels = this.handleProjectedLabelOnProduct(projectedProduct)
            return projectedProduct;
        })
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
            'discount',
            'labels'
        ])
    }


    private populateProductPipelines() {
        return [
            {
                $lookup: {
                    from: CategoryModel.collection.collectionName,
                    localField: 'category',
                    foreignField: '_id',
                    as: 'category'
                }
            },
            { $unwind: { path: '$category' } },
            {
                $lookup: {
                    from: SubCategoryModel.collection.collectionName,
                    localField: 'sub_category',
                    foreignField: '_id',
                    as: 'sub_category'
                }
            },
            { $unwind: { path: '$sub_category' } },
            {
                $lookup: {
                    from: DiscountModel.collection.collectionName,
                    let: { product_id: "$_id" },
                    pipeline: [
                        { $match:  {  $expr:  { $eq: [ "$item_id",  "$$product_id" ] } } },
                        { $sort: { expiry_date: -1 } }
                     ],
                    as: 'discount'
                }
            },
            {
                $lookup: {
                    from: LabelEntryModel.collection.collectionName,
                    let: { product_id: "$_id" },
                    pipeline: [
                        { $match:  {  $expr:  { $eq: [ "$item_id",  "$$product_id" ] } } },
                        { 
                            $lookup: {
                                from: LabelEnumModel.collection.collectionName,
                                let: { label_key_id: "$label_key" },
                                pipeline: [
                                    { $match:  {  $expr:  { $eq: [ "$_id",  "$$label_key_id" ] } } },
                                    // { $sort: { expiry_date: -1 } }
                                 ],
                                as: 'label_key'
                            }
                        },
                        { $unwind: { path: '$label_key' } },
                        // { $sort: { expiry_date: -1 } }
                     ],
                    as: 'labels'
                }
            }
        ]
    }

    private handleProjectedLabelOnProduct(productRuntime: ProductRuntime) {
        for(let label of productRuntime.labels||[]) {
            const value_id = label.label_value;
            const label_value = (label.label_key.label_values as Array<any>).find(({_id}) => value_id.toHexString() == _id.toHexString())
            label['label_key_name'] = label.label_key?.label_key;
            label['label_value_name'] = label_value?.name;
        }
        return productRuntime.labels||[];
    }
}