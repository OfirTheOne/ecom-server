import { Controller, Provider } from '@o-galaxy/ether/core';
import { PaypalService } from '../../../../../services/paypal/paypal.service';



@Provider()
export class CartPaymentProvider {

    constructor(private  paypalService: PaypalService ) {}
    

    public async getClientToken() {
        return await this.paypalService.createClientToken();
    } 
}

