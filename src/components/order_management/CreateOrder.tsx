// NOTE: only admin can edit

import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { postCreateOrderFn, type ReqBodyCreateNewOrder } from "./CreateOrder.Post.tsx";
import { DEFAULT_BASE_URL } from "../../data_sourcing_api/base_url.tsx";
import axios from "axios";

const CreateOrder = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [isOpenModal, setOpenModal] = useState<boolean>(false);
    const [popUpMessage, setPopUpMessage] = useState<string>("")

    const navigate = useNavigate();

    const DirectToDashboard = (message: string, status: number) => {
        setPopUpMessage(message);
        setOpenModal(true);
        if (status == 200) {
            setTimeout(() => {
                navigate("/admin-dashboard");
            }, 3000)
        }
    }


    const handleSubmit = (e: any) => {
        e.preventDefault();
        setLoading(true);
        // Logic: Authenticate the user
        // 1. Extract values efficiently
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        // data will look like: { username: "your_user", password: "123" }
        console.log("Payload to send:", data);

        // POST API to SERVER API
        /*
        {
            "phone_number": "2312124124",
            "full_name": "welli don",
            "complete_address": "Jl. Lmbr",
            "service_type": "patch"
            }
            */
        // postCreateOrder()
        const payloadReq = data as ReqBodyCreateNewOrder
        postCreateOrderFn(payloadReq, "", {
            baseUrl: DEFAULT_BASE_URL,
            client: axios,
        })
            .then(val => {
                console.log("val post postCreateOrder", val)
                DirectToDashboard(val.message, val.status)

            })
            .catch(err => {
                setPopUpMessage(`error: ${err}`)
                setOpenModal(true);
            })

    };

    const PopUpSuccess = (
        <div className=" bg-gray-50 font-sans text-gray-900 pb-10">
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

            {/* separate_component */}
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
                            Buat Pesanan Baru
                        </h2>
                        <p className="mt-2 text-center font-extrabold text-md text-gray-600">
                            Silahkan isi data yang diperlukan.
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
                                <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                                    Phone Number
                                </label>
                                <input
                                    id="phone_number"
                                    name="phone_number"
                                    type="text"
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="08xxx"
                                    onChange={(e) => e.target.value}
                                />
                            </div>
                            <div>
                                <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
                                    Full Name
                                </label>
                                <input
                                    id="full_name"
                                    name="full_name"
                                    type="text"
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Full Name"
                                    onChange={(e) => e.target.value}
                                />
                            </div>
                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                    Complete Adress
                                </label>
                                <input
                                    id="complete_address"
                                    name="complete_address"
                                    type="text"
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Jl. Lembur No. 26 RT.00 RW.00"
                                    onChange={(e) => e.target.value}
                                />
                            </div>

                            <div>
                                <label htmlFor="service_type" className="block text-sm font-medium text-gray-700">
                                    Service Type
                                </label>
                                <select
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    id="service_type"
                                    name="service_type"
                                    defaultValue={"Patch"}
                                >
                                    <option value="patch">Patch</option>
                                    <option value="design_dress">Design and Create Dress</option>
                                    <option value="fitting">Fitting Cloth</option>
                                </select>

                            </div>
                        </div>


                        <button
                            type="submit"
                            className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                            {"Upload"}
                        </button>
                    </form>

                </div>
            </div>
        </div>
    );
}


export default CreateOrder;