import { Category } from '../category';

export interface SubCategory {
    category: Category, // populated at runtime
    name: string,
    description: string,
    position: number,
}


// toModel<SubCategory, typeof SubCategory>(SubCategory, 'users');
