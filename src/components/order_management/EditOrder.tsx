// NOTE: only admin can edit

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NavLink, useNavigate, useParams } from "react-router";
import { FetchDetailOrder } from "./EditOrder.Get";
import type { ApiResponse } from "../../data_sourcing_api/data_tailor";
import { EditOrderFn } from "./EditOrder.Put";
import { DEFAULT_BASE_URL } from "../../data_sourcing_api/base_url";
import { useState } from "react";



// get order_number value, and direct with Navigate()
const EditOrder = () => {

    {/*
        NOTE: halaman ini utk edit 
        - fetch detail data with tanstack query
        - update state data to form
        - hit handleSubmit() to update to server backend

        1. munculkan dalam bentuk sepert form yang bisa diedit
        2. bisa update / upload gambar
        3. bisa edit harga
        4. bisa edit final price
        5. bisa edit pesanan selesai
        
     */}

    const [isOpenModal, setOpenModal] = useState<boolean>(false);
    const [popUpMessage, setPopUpMessage] = useState<string>("")
    const navigate = useNavigate();
    const { orderNumber } = useParams<string>();

    const DirectToDashboard = (message: string, status: number) => {
        setPopUpMessage(message);
        setOpenModal(true);
        if (status == 200) {
            setTimeout(() => {
                navigate("/admin-dashboard");
            }, 3000)
        }
    }

    const {
        data: OrderDataDetail,
        error,
        isLoading,
        isPending
    } = useQuery({
        queryKey: ["req_order_number", orderNumber],
        queryFn: (queryKey) => {
            // harus function locate at EditOrder.Get khusus call API
            return FetchDetailOrder<ApiResponse<any>>({ order_number: orderNumber as string }, {});
        },
    });



    const handleSubmit = (e: any) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        console.log("data payload for edit!!!", data)


        EditOrderFn({
            order_number: OrderDataDetail?.body.data[0].order_number as string,
            service_type: data.service_type as string,
        }, {
            baseUrl: DEFAULT_BASE_URL,
            client: axios,
        })
            .then((res) => {
                // if success give standard pop up succcess 
                DirectToDashboard(res.message, res.status);

            })
            .catch((err) => {
                setPopUpMessage(`error: ${err}`)
                setOpenModal(true);
            })
    }

    const PopUpSuccess = (
        <div className=" bg-gray-50 font-sans text-gray-900 pb-10">

            {/* separate_component */}
            <div className='bg-white border-b px-4 py-3 sticky shadow-sm flex justify-between items-center'>
                <div className='border border-blue-600 px-2 py-1 sticky top-0 z-20'>
                    <h2 className="font-black text-xl tracking-tighter text-blue-600">MAMA </h2>
                    <h2 className="font-black text-xl tracking-tighter text-blue-600">MISKHA </h2>
                    <h2 className="font-black text-xl tracking-tighter text-blue-600">JAHIT...</h2>
                </div>
            </div>

            <div className="w-[400px] h-96 bg-gray-50 font-sans text-gray-900 pb-10 border-black pt-3 px-4">
                <div className="items-center p-16 border shadow-xl rounded-sm border-gray-100">
                    <h2 className="text-center text-3xl font-extrabold text-gray-900">
                        Pop Up Test
                    </h2>
                    <p className="mt-2 text-center font-extrabold text-md text-green-600 my-2">
                        {popUpMessage}
                    </p>
                    <button
                        className="flex-col justify-center py-2 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:bg-blue-300"
                        onClick={() => setOpenModal(false)}
                    >
                        Close Pop Up
                    </button>
                </div>



            </div>
        </div>
    )

    if (isOpenModal) return PopUpSuccess;

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-10">
            <div className='bg-white border-b px-4 py-3 sticky shadow-sm flex justify-between items-center'>
                <div className='border border-blue-600 px-2 py-1 sticky top-0 z-20'>
                    <h2 className="font-black text-xl tracking-tighter text-blue-600">MAMA </h2>
                    <h2 className="font-black text-xl tracking-tighter text-blue-600">MISKHA </h2>
                    <h2 className="font-black text-xl tracking-tighter text-blue-600">JAHIT...</h2>
                </div>
            </div>

            <nav className="bg-white border-b px-4 py-3 sticky top-0 z-20 shadow-sm flex justify-start items-center gap-1">
                <NavLink
                    to="/admin-dashboard"
                    className="btn-style text-[10px] bg-gray-200 px-2 py-1 rounded font-bold uppercase tracking-widest" // Your CSS that makes it look like a button
                >
                    Go to Dashboard
                </NavLink>

            </nav>

            <div className="w-[400px] bg-gray-50 font-sans text-gray-900 pb-10">
                <div className="space-y-8 p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
                    <div>
                        <h2 className="text-center text-3xl font-extrabold text-gray-900">
                            Edit Pesanan
                        </h2>
                        <p className="mt-2 text-center font-extrabold text-md text-gray-600">
                            Pastikan hanya boleh di-edit oleh Admin.
                        </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">

                            {/* 
                                 id AUTO from backend
                                 |order_number   AUTO from backend   
                                 |phone_number

                                 |start_process                
                                 |service_type
                                 |status_progress default new , in_progress, fitting, ready, completed
                                 |total_price default 0
                                 |created_at curr_date                   
                                |updated_at
                                |created_by by login default 1
                                |updated_by
                                |end_process| last date after completed
                                */}

                            <div>
                                <label htmlFor="order_number" className="block text-sm font-medium text-gray-700">
                                    Order Number <span className="font-bold">*no-edit</span>
                                </label>
                                <div className="border rounded-sm p-2 text-sm m-2">
                                    <h4>{OrderDataDetail?.body?.data[0]?.order_number}</h4>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="service_type" className="block text-sm font-medium text-gray-700">
                                    Service Type
                                </label>
                                <select
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    id="service_type"
                                    name="service_type"
                                    defaultValue={OrderDataDetail?.body[0]?.service_type}
                                >
                                    <option value="patch">Patch</option>
                                    <option value="design_dress">Design Dress</option>
                                    <option value="fitting">Fitting Cloth</option>
                                </select>
                            </div>


                            {/* <div>
                                <label htmlFor="order_number" className="block text-sm font-medium text-gray-700">
                                    Order Number
                                </label>
                                <input
                                    id="order_number"
                                    name="order_number"
                                    type="text"
                                    required
                                    defaultValue={OrderDataDetail?.body[0]?.order_number}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Order Number"
                                    onChange={(e) => e.target.value}
                                />
                            </div> */}

                        </div>

                        <button
                            type="submit"
                            className="flex justify-center py-2 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                            {"Edit"}
                        </button>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default EditOrder;