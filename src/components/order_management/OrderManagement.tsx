import { useState } from 'react';


import CustomerListView from '../customer_list_view/CustomerListView';
import AdminView from '../admin_view/AdminView';
import CustomerDetailView from '../customer_list_view/CustomerDetailList';



// --- MAIN APP COMPONENT ---
export default function OrderManagement() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [activeCustomer, setActiveCustomer] = useState(null);

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-10">
            {/* Header */}
            <nav className="bg-white border-b px-4 py-3 sticky top-0 z-20 shadow-sm flex justify-between items-center">
                <div className='border border-blue-600 px-2 py-1'>
                    <h2 className="font-black text-xl tracking-tighter text-blue-600">MAMA </h2>
                    <h2 className="font-black text-xl tracking-tighter text-blue-600">MISKHA </h2>
                    <h2 className="font-black text-xl tracking-tighter text-blue-600">JAHIT...</h2>
                </div>
                <button
                    onClick={() => setIsAdmin(!isAdmin)}
                    className="text-[10px] bg-gray-200 px-2 py-1 rounded font-bold uppercase tracking-widest"
                >
                    Switch to {isAdmin ? 'Customer' : 'Admin'}
                </button>
            </nav>

            <main className="max-w-4xl mx-auto p-4">
                {isAdmin ? (
                    <AdminView />
                ) : activeCustomer ? (
                    <CustomerDetailView order={activeCustomer} onBack={() => setActiveCustomer(null)} />
                ) : (
                    <CustomerListView onSelect={setActiveCustomer} />
                )}
            </main>
        </div>

    );
}






