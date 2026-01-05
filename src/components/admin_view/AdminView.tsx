

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { MOCK_ORDERS_TAILOR } from '../../data_sourcing_api/data_tailor';

import {
    Plus,
    Eye,
    EyeOff
} from 'lucide-react';
import { NavLink } from 'react-router';
import { useQuery } from '@tanstack/react-query';



// --- ADMIN VIEW (Using TanStack Table) ---
function AdminView() {

    const [showPrice, setShowPrice] = useState(false);
    const columnHelper = createColumnHelper();

    const columns = useMemo(() => [
        { accessorKey: 'queue', header: 'No' },
        { accessorKey: 'start', header: 'Mulai Jahit' },
        { accessorKey: 'customer', header: 'Customer' },
        { accessorKey: 'type', header: 'Service' },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: (info: any) => <span className="text-xs font-bold px-2 py-1 bg-blue-100 rounded text-blue-700">{info.getValue()}</span>
        },
        {
            accessorKey: 'price',
            header: 'Price',
            cell: (info: any) => (
                <span className="font-mono font-bold">
                    {showPrice ? `$${info.getValue()}` : '***'}
                </span>
            )
        },
        {

            // TEST Note: DIRECT ke page terkait untuk edit/ upload gambar value
            accessorKey: 'order_number',
            header: 'Edit Order',
            cell: (info: any) => {
                return (
                    <div className="group relative flex flex-col items-center">

                        <button className='rounded-md bg-blue-600 text-white p-1' onClick={() => console.log(info.getValue())}>
                            <span className="hover-">
                                {"ubah"}
                            </span>
                        </button>

                        <div className="absolute bottom-full mb-2 flex flex-col items-center invisible opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100">
                            <span className="relative z-10 w-24 rounded-md bg-black p-2 text-xs text-white shadow-lg">
                                Klik untuk
                                <br/>
                                mengubah data.
                            </span>
                            
                            <div className="-mt-1 h-2 w-2 rotate-45 bg-black"></div>
                        </div>
                    </div>
                );
            }

        },

    ], [showPrice]);


    // TEST useQuery to fetch data orders

    // useQuery({
    //     queryKey: "all_orders",
    //     queryFn: () => {

    //     }
    // })

    const table = useReactTable({
        data: MOCK_ORDERS_TAILOR, // biasanya get fetch from useQuery
        columns,
        getCoreRowModel: getCoreRowModel(),
    });



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
                <div className="space-y-4 w-[400px]">

                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
                        <div className="flex gap-2">
                            <button onClick={() => setShowPrice(!showPrice)} className="p-2 bg-gray-200 rounded">
                                {showPrice ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold">
                                <Plus size={18} /> New Order
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border shadow-sm overflow-x-hidden">
                        <div className="overflow-x-auto">


                            <table className="w-full text-left ">

                                <thead className="bg-gray-50 border-b">
                                    {table.getHeaderGroups().map(headerGroup => (
                                        <tr key={headerGroup.id}>
                                            {headerGroup.headers.map(header => (
                                                <th key={header.id} className="p-4 text-xs uppercase text-gray-400">
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                </th>
                                            ))}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody className="divide-y">
                                    {table.getRowModel().rows.map(row => (
                                        <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                                            {row.getVisibleCells().map(cell => (
                                                <td key={cell.id} className="p-4 text-sm whitespace-nowrap">
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>


                </div>
            </main>
        </div>
    );
}

export default AdminView;