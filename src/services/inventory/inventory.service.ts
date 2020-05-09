import { Provider } from '@o-galaxy/ether/core';
import { sleep } from '../utils/sleep';

@Provider()
export class InventoryService {

    public async findStock(skuList: Array<string>): Promise<Array<number>> {
        await sleep(300);
        return skuList.map( () => Math.round(Math.random() * 30) );

    }
}