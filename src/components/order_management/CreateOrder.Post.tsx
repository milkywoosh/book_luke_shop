import type { AxiosInstance } from "axios";
import type { DataAPIResponse } from "../../data_sourcing_api/data_response_interface"
import axios from "axios";
import { DEFAULT_BASE_URL } from "../../data_sourcing_api/base_url";


export type ReqCreateOrderOption = {
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

// {
//     "phone_number": "2312124124",
//     "full_name": "welli don",
//     "complete_address": "Jl. Lmbr",
//     "service_type": "patch"
// }

export type ReqBodyCreateNewOrder = {
    // order_number: string ==> auto dari backend
    phone_number: string
    full_name: string
    service_type: string
    complete_address: string
    // startProcess: string
    // createdAt: string
}

export async function postCreateOrder<TBody>(
    reqBody: ReqBodyCreateNewOrder,
    userId: string,
    options: ReqCreateOrderOption,
): Promise<DataAPIResponse<any>> {

    try {

        // type of response <DataAPIResponse<any>>
        const res = await axios.post<DataAPIResponse<any>>(
            `${DEFAULT_BASE_URL}/api/order-customer/create`,
            reqBody,
            {}
        );


        return {
            status: res.status,
            message: res.data.message,
            body: res.data.body,
        }
    } catch (err: any) {
        // Normalise known axios error shape
        const status: number = err?.response?.status ?? 0;
        const message: string =
            err?.response?.data?.message ??
            err?.message ??
            'Unknown error while fetching datatable';

        const body = [] as any[];
        return {
            status,
            // keep body consistent; empty array by default
            body: body,
            message,
        };
    }
}



