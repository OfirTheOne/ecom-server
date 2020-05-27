
export interface Category {
    name: string,
    description: string,
    position: number,
    sub_categories?: Array<any> // virtual, populated at run time
}


// toModel<Category, typeof Category>(Category, 'users');
