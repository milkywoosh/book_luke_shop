

import {
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


// --- ADMIN VIEW (Using TanStack Table) ---
function AdminView() {
    const [showPrice, setShowPrice] = useState(false);

    const columns = useMemo(() => [
        { accessorKey: 'queue', header: 'No' },
        { accessorKey: 'start', header: 'Mulai Jahit' },
        { accessorKey: 'customer', header: 'Customer' },
        { accessorKey: 'customer', header: 'Customer' },
        { accessorKey: 'customer', header: 'Customer' },
        { accessorKey: 'customer', header: 'Customer' },
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
    ], [showPrice]);

    const table = useReactTable({
        data: MOCK_ORDERS_TAILOR, // biasanya get fetch from useQuery
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
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
    );
}

export default AdminView;