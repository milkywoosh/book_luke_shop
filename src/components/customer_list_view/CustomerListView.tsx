import {
    ChevronRight,
} from 'lucide-react';

import { MOCK_ORDERS_TAILOR } from '../../data_sourcing_api/data_tailor';
import { useQuery } from '@tanstack/react-query';



// --- CUSTOMER LIST VIEW ---
function CustomerListView({ onSelect }: { onSelect: any }) {

    const {
        data: listOrderCustomer,
        isError,
        isPending,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["listOrderCustCache"],
        queryFn: () => { },

    })


    return (
        <div className="space-y-4 w-[400px]">
            <div className="bg-blue-600 text-white p-6 rounded-2xl mb-6 shadow-blue-200 shadow-lg">
                <h2 className="text-lg opacity-80">Track your order</h2>
                <p className="text-3xl font-bold">Check Status</p>
                <div className="mt-4 flex gap-2">

                    {/* TEST */}
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        className="flex-1 px-4 py-2 rounded-lg text-gray-900 text-sm focus:outline-none"
                    />

                    {/* need API search by NOTEL */}
                    <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold text-sm">Find</button>

                </div>
            </div>

            <h3 className="font-bold text-gray-500 uppercase text-xs tracking-wider">Your Queue</h3>
            <div className="grid gap-3">
                {/* TEST note: filter dari internal BE */}
                {MOCK_ORDERS_TAILOR.slice(0, 3).map((order: any) => (

                    <div
                        key={order.id}
                        onClick={() => onSelect(order)}
                        className="bg-white p-4 rounded-xl border flex items-center justify-between cursor-pointer active:scale-95 transition-transform"
                    >
                        <div>
                            <p className="text-xs font-mono text-gray-400">#{order.id}</p>
                            <h4 className="font-bold text-lg">{order.type}</h4>
                            <p className="text-sm text-blue-600 font-medium">{order.status}</p>
                        </div>
                        
                        <div className="text-right flex items-center gap-3">
                            <div>
                                <p className="text-[10px] text-gray-400 uppercase">Queue</p>
                                <p className="text-xl font-black text-gray-300">#{order.queue}</p>
                            </div>
                            <ChevronRight className="text-gray-300" />
                        </div>
                    </div>

                ))}
            </div>
        </div>
    );
}

export default CustomerListView;