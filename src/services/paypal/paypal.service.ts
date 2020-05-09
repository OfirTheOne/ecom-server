import { Provider } from '@o-galaxy/ether/core';
import * as BrainTree from 'braintree';
import * as paypal from '@paypal/checkout-server-sdk'

// import { CreateOrderRequestBody, CreateOrderResponseBody } from './types';




@Provider()
export class PaypalService {

    static gateway = BrainTree.connect({
        accessToken: process.env.PAYPAL_ACCESS_TOKEN
    });

    constructor() { }


    private _createPaypalSandboxClient() {
        const clientId = process.env.PAYPAL_CLIENT_ID;
        const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
        const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
        const client = new paypal.core.PayPalHttpClient(environment);
        return client;

    }

    public async getOrder(orderId: string) {
        let client = this._createPaypalSandboxClient();
        let request = new paypal.orders.OrdersGetRequest(orderId)

        let response: paypal.OrdersGetResponse  = await client.execute(request);

        if(response?.result) {
            return response.result;
        } else {
            throw (response || new Error('paypal get order request failed'))
        }

    }

    public async createOrderIntent(requestBody: paypal.OrdersCreateRequestBody) {

        let client = this._createPaypalSandboxClient();
        // Construct a request object and set desired parameters
        // Here, OrdersCreateRequest() creates a POST request to /v2/checkout/orders
        let request = new paypal.orders.OrdersCreateRequest();

        request.requestBody(requestBody);

        let response: paypal.OrdersCreateResponse = await client.execute(request);

        if(response?.result) {
            return response.result;
        } else {
            throw (response || new Error('paypal create order request failed'))
        }
    }

    public async createClientToken() {
        const clientTokenResponse = await PaypalService.gateway.clientToken.generate({});
        return clientTokenResponse.clientToken
    }



}