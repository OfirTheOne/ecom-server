
export interface PutUpdateProductParams {
    sku: string,
    name: string,
    description: string,
    price: number,

    category: string,
    sub_category: string,

    discount_id: number,
    percentage_reduction: number,
    expiry_time: string,

    size_options: Array<string>,
    color_options: Array<string>,
    images_url: Array<string>,
    active: boolean,

}