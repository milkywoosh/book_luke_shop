
import {
    type ColumnFiltersState,
    type PaginationState,
} from '@tanstack/react-table';

import axios from 'axios';
import { DEFAULT_BASE_URL } from '../../data_sourcing_api/base_url';

const requestDatatableFn = async (pagination: PaginationState, colFilterParam: ColumnFiltersState) => {

    const { pageIndex, pageSize } = pagination

    // all required param utk triggering perubahan request to server
    // semua param di bawah harus sesuai dengan BACKEND
    const params = new URLSearchParams({
        offset: pageIndex.toString(),
        fetchRows: pageSize.toString(),
    })


    // "id": 5,
    //  "order_number": "ORD-2026-X100-005",
    //  "phone_number": "081220121001",
    //  "full_name": "donga",
    //  "start_process": null,
    //  "end_process": null,
    //  "service_type": "dress_patch",
    //  "status_progress": "fitting",

    const mappingReq: { [key: string]: string } = {
        order_number: "orderNumber",
        phone_number: "phoneNumber",
        full_name: "fullName",
        start_process: "startProcess",
        end_process: "endProcess",
        service_type: "serviceType",
        status_progress: "statusProgress",
    }

    colFilterParam.forEach((val, _) => {
        // modify params

        params.append(mappingReq[val.id] as string, val.value as string)
    });

    console.log("params: ", params)
    // console.log("ceess params: ", params);
    // console.log("ceess params.toString(): ", params.toString());



    // const url_product = "https://item-management-dev-int-newscmt-dev.apps.kpaasjtn1.telkom.co.id"
    // const result = await axios.get(`${url_product}/datatable-product-be?${params.toString()}`, {})
    return axios.get(`${DEFAULT_BASE_URL}/api/order/datatable?${params.toString()}`, {})
        .then(res => {
            console.log("resss: ", res)
            return res.data.body;
        })
        .catch((err) => {
            const err_val = { ...err }
            return err_val
            // console.log("err_val: ", err_val)
            // if (err_val.code === "ERR_NETWORK") {
            //   return {
            //     status: err_val.status,
            //     body: [],
            //     message: err_val.message,

            //   }
            // }
            // return {
            //   status: err_val.status,
            //   body: [],
            //   message: err_val.message,

            // }
        });
}

export default requestDatatableFn;