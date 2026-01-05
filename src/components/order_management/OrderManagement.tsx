import { useState } from 'react';


import CustomerListView from '../customer_list_view/CustomerListView';

import CustomerDetailView from '../customer_list_view/CustomerDetailList';

import { NavLink } from 'react-router';



// --- MAIN APP COMPONENT ---
export default function OrderManagement() {

    const [activeCustomer, setActiveCustomer] = useState(null);



    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-10">
            {/* Header */}
            <div className='bg-white border-b px-4 py-3 sticky shadow-sm flex justify-between items-center'>
                <div className='border border-blue-600 px-2 py-1 top-0 z-20'>
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
                <NavLink
                    to="/"
                    // onClick={() => setIsAdmin(!isAdmin)}
                    className="text-[10px] bg-gray-200 px-2 py-1 rounded font-bold uppercase tracking-widest"
                >
                    {/* Switch to {isAdmin ? 'Customer' : 'Admin'} */}
                    {"Order Information"}
                </NavLink>
            </nav>




            <main className="max-w-4xl mx-auto p-4">
                {activeCustomer ? (
                    <CustomerDetailView order={activeCustomer} onBack={() => setActiveCustomer(null)} />
                ) : (
                    <CustomerListView onSelect={setActiveCustomer} />
                )}
            </main>
        </div>

    );
}






