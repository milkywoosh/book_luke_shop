// get data API terkait details pesananan untuk isi form yang akan di edit

import type { AxiosInstance } from "axios";
import type { DataAPIResponse } from "../../data_sourcing_api/data_response_interface";
import { DEFAULT_BASE_URL } from "../../data_sourcing_api/base_url";
import axios from "axios";

export type ReqGetDetailOrder = {
    /**
      * Base URL of the backend service, e.g. "http://localhost:3000"
      * Defaults to "http://localhost:3000" to keep backward compatibility.
      */
    baseUrl?: string;
    /**
     * Optional axios instance to allow easier testing / custom interceptors
     */
    client?: AxiosInstance;
}

export type ReqQueryGetDetailOrder = {
    order_number: string
}

export async function FetchDetailOrder<TBody>(
    reqQuery: ReqQueryGetDetailOrder,
    options: ReqGetDetailOrder
): Promise<DataAPIResponse<any>> {

    try {

        const { order_number } = reqQuery;
        // parsing reqQuery to form like this ==> ?order_number=val&param1=val1&param2=val2
        const params = new URLSearchParams({
            order_number: order_number.toString(),
        });

        return axios.get<DataAPIResponse<any>>(
            // `${DEFAULT_BASE_URL}/api/order-customer/detail?${params.toString()}`, // api v1
            `${DEFAULT_BASE_URL}/api/order/detail?${params.toString()}`, // api v2
            {}
        ).then(res => {
            return {
                status: res.status as number,
                message: res.data.message as string,
                body: res.data.body,
            }
        })
        .catch(err => {
            const status: number = err?.response?.status ?? 0;
            const message: string =
                err?.response?.data?.message ??
                err?.message ??
                'Unknown error fetching detail order'
            const body = [] as any[];

            return {
                status,
                message,
                body
            }
        });

    } catch (err: any) {
        const status: number = err?.response?.status ?? 0;
        const message: string =
            err?.response?.data?.message ??
            err?.message ??
            'Unknown error fetching detail order'
        const body = [] as any[];

        return {
            status,
            message,
            body
        }
    }
}