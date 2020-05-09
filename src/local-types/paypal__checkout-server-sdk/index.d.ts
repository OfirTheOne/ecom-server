
import * as paypalhttp from '../paypal__paypalhttp' 

declare namespace paypal { 

    //#region - sub-objects
    /**
     * Each purchase unit establishes a contract between a customer and merchant. 
     * Each purchase unit represents either a full or partial order that the customer intends to purchase from the merchant.
     */
    export interface PurchaseUnit {
        reference_id?: string,
        amount: Amount,
        payee?: object,
        payment_instruction?: object,
        description?: string,
        custom_id?: string,
        invoice_id?: string,
        id?: string,
        soft_descriptor?: string,
        items?: Array<PurchaseUnitItem> 
        shipping?: object,
        payments?: object
    } 
    export interface PurchaseUnitItem {
        name: string 
        unit_amount: Money 
        quantity: string 
        tax?: object
        description?: string
        sku?: string
        category?: 'DIGITAL_GOODS' | 'PHYSICAL_GOODS'
    }
    export interface Money {
        currency_code: string;
        value: string;
    
    } 
    export interface Amount {
        currency_code: string,
        value: string,
        breakdown?: AmountBreakdown
    }  
    export interface AmountBreakdown {
        item_total?: Money,
        shipping?: object,
        handling?: object,
        tax_total?: object,
        insurance?: object,
        shipping_discount?: object,
        discount?: object,
    
    }
    export type OrderRequestIntent = 'CAPTURE' | 'AUTHORIZE';
    export type OrderStatus = 'CREATED' | 'SAVED' | 'APPROVED' | 'VOIDED' | 'COMPLETED';
    //#endregion
    
    //#region - requests
    class PayPalHttpRequest<ReqBodyT, ResBodyT> { }

    export interface OrdersCreateRequestBody {
        intent: OrderRequestIntent,
        payer?: object,
        purchase_units: Array<PurchaseUnit>
    }  
    //#endregion

    //#region - responses
    interface PayPalHttpResponse<T> {
        headers:object 
        result: T 
        statusCode: number
    }

    export interface OrdersCreateResponseBody {
        id: string;
        links: Array<{
            href: string,
            rel: string,
            method: string,
        }>
        status: string;
    }
    export interface OrdersCreateResponse extends PayPalHttpResponse<OrdersCreateResponseBody> { }
    

    export interface OrdersGetResponseBody {
        create_time: Date
        id: string
        intent: OrderRequestIntent
        links: Array<{
            href: string,
            rel: string,
            method: string,
        }>
        purchase_units: Array<PurchaseUnit>
        status: OrderStatus;
    }
    export interface OrdersGetResponse extends PayPalHttpResponse<OrdersGetResponseBody> { }
    //#endregion
  
}

declare module paypal {

    namespace core  {   
        class AccessToken { }
        class AccessTokenRequest { }
        class LiveEnvironment extends PayPalEnvironment { }
        class PayPalEnvironment extends paypalhttp.Environment { }
        class PayPalHttpClient extends paypalhttp.HttpClient { 
            constructor(environment: SandboxEnvironment)
            execute<Q = any,R = any>(request: PayPalHttpRequest<Q, R>): Promise< PayPalHttpResponse< R > >
        }
        class RefreshTokenRequest { }
        class SandboxEnvironment { 
            constructor(clientId: string, clientSecret: string)
        }
    }

    namespace orders {
        class OrdersAuthorizeRequest extends PayPalHttpRequest<any, any> {}
        class OrdersCaptureRequest extends PayPalHttpRequest<any, any> {}
        class OrdersCreateRequest extends PayPalHttpRequest<OrdersCreateRequestBody, OrdersCreateResponseBody> {
            public requestBody(body: any)
        }
        class OrdersGetRequest extends PayPalHttpRequest<any, OrdersGetResponseBody> {
            constructor(orderId: string)
        }
        class OrdersPatchRequest extends PayPalHttpRequest<any, any> {}
        class OrdersValidateRequest extends PayPalHttpRequest<any, any> {}
    }

    namespace payment {
        class AuthorizationsCaptureRequest {}
        class AuthorizationsGetRequest {}
        class AuthorizationsReauthorizeRequest {}
        class AuthorizationsVoidRequest {}
        class CapturesGetRequest {}
        class CapturesRefundRequest {}
        class RefundsGetRequest {}
    }
}

export = paypal;

