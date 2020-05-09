import * as request from "request";

export function asyncRequest<T = any>(url: string, option: request.CoreOptions, response?: 'JSON' | 'XML') {
    return new Promise<T>((resolve, reject) => {
        request({ url, ...option }, (err, data, body) => {
            if (err || data?.statusCode > 400) {
                reject(err);
            } else {
                try {

                    if (typeof body == 'string') {
                        resolve(JSON.parse(body));
                    } else {
                        resolve(body);
                    }
                } catch (error) {
                    reject(error);

                }
            }
        })
    })
}

