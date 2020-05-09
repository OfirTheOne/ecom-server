import { Class } from 'utility-types';

export function injectObjectToClass<T>(trargetClass: Class<T>, obj: any): T {
    try {
        return Object.assign(new trargetClass(), obj)
    } catch (error) {
        throw error;
    }

}
