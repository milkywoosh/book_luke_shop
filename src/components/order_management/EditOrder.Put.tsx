// edit data API

import type { AxiosInstance } from "axios";
import type { DataAPIResponse } from "../../data_sourcing_api/data_response_interface"

type EditOrderPayload = {
    order_number: string;
    service_type: string;
    // add other fields as necessary
}

type RequstEditOrderOptions = {
    baseUrl: string;
    client: AxiosInstance;
}

export async function EditOrderFn(
    { order_number, service_type }: EditOrderPayload,
    options: RequstEditOrderOptions,
): Promise<DataAPIResponse<any>> {

    try {

        console.log("order_number, service_type: ", order_number, service_type)

        const res = await options.client.put<DataAPIResponse<any>>(
            `${options.baseUrl}/api/order/edit?order_number=${order_number}`,
            {
                service_type
            },
            {}
        );

        /*
            NOTE: balikan BE { res.data.body, res.status, res.data.message }
        */

        if (res?.status == 200) {

            return {
                body: res?.data?.body,
                message: res.data.message,
                status: res.status,
            }
        } else {
            return {
                body: res?.data?.body,
                message: res.data.message,
                status: res.status,
            }
        }
    } catch (error) {
        return {
            // TEST
            body: {
                data: null,
            },
            status: 500,
            message: `error edit order: ${(error as any)?.message}`
        }
    }



}