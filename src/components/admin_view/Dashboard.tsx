

import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    type ColumnDef,
    type ColumnFiltersState,
    type PaginationState,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { formatter, MOCK_ORDERS_TAILOR, type orderTailorT } from '../../data_sourcing_api/data_tailor';

import {
    Plus,
    Eye,
    EyeOff
} from 'lucide-react';
import { NavLink } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import requestDatatableFn from './RequestDatatableFn';






// --- ADMIN VIEW (Using TanStack Table) ---
function AdminDashboard() {

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10
    });

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const handleColumnFilterChange = (updater: any) => {
        // console.log(updater)
        setColumnFilters(updater);

        setPagination((prev) => {
            return {
                ...prev,
                pageIndex: 0
            }
        });
    };

    const firstPage = () => setPagination((current: PaginationState) => {
        if (current.pageIndex > 0) {
            return {
                ...current,
                pageIndex: 0,
            }
        } else {
            return {
                ...current,
                pageIndex: 0,
            }
        }
    })
    const prevPage = () => setPagination((current: PaginationState) => {
        if (current.pageIndex > 0) {
            return {
                ...current,
                pageIndex: current.pageIndex - 10
            }
        } else {
            return {
                pageIndex: 0,
                pageSize: 10,
            }
        }
    })
    const nextPage = () => setPagination((current: PaginationState) => {
        // edge case gimana klo rows sudah max???
        return {
            ...current,
            pageIndex: current.pageIndex + 10
        }

    });
    const resetFilter = () => {
        // edge case gimana klo rows sudah max???
        setColumnFilters([]);
        setPagination({
            pageIndex: 0,
            pageSize: 10,
        })

    };

    const [showPrice, setShowPrice] = useState(false);



    const columns: ColumnDef<orderTailorT, any>[] = useMemo(() => [
        { accessorKey: 'dt_row_index', header: 'Index' },
        // { accessorKey: 'id', header: 'No' },
        {
            accessorKey: 'start_process',
            header: 'Mulai Jahit',
            cell: (info: any) => {
                console.log("cesss")
                return formatter.format(info.getValue())
            }

        },
        { accessorKey: 'full_name', header: 'Customer' },
        { accessorKey: 'service_type', header: 'Service' },
        {
            accessorKey: 'status_progress',
            header: 'Status',
            cell: (info: any) => <span className="text-xs font-bold px-2 py-1 bg-blue-100 rounded text-blue-700">{info.getValue()}</span>
        },
        {
            accessorKey: 'total_price',
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
                                <br />
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

    const {
        data: datatableSource,
        isError: isErrDataSource,
        error: errInfoDataSource,
        isLoading,
    } = useQuery({
        queryKey: ["all_orders", pagination, columnFilters],
        queryFn: ({ queryKey }: { queryKey: [string, PaginationState, ColumnFiltersState] }) => {

            const [_key, PaginationStateVal, colFilterVal] = queryKey;

            return requestDatatableFn(PaginationStateVal, colFilterVal);
        },
        placeholderData: (previousData) => previousData, // This prevents the flicker/reset
        refetchOnWindowFocus: false,   // Disable refetch on window focus
        refetchOnMount: false,         // Disable refetch when component mounts
        refetchOnReconnect: false,
    })

    const table = useReactTable({
        data: datatableSource, // biasanya get fetch from useQuery
        columns,
        state: {
            columnFilters
        },
        onColumnFiltersChange: handleColumnFilterChange, //setColumnFilters, handleColumnFilterChange ==> note: this function trigger unpredictable behaviour
        getCoreRowModel: getCoreRowModel(),
        manualFiltering: true,
        manualPagination: true,

        autoResetPageIndex: false,
        autoResetExpanded: false,
    });

    if (isLoading) {
        return (<>
            <h2> {"Loading"} </h2>
        </>);
    }

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

                            <div className="w-full ">
                                <div className="flex flex-row items-center justify-between p-2 w-full">
                                    {/* Left Group: First and Prev */}
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => firstPage()}
                                            className="w-24 border-2 border-b px-2 hover:text-blue-600 transition-colors"
                                        >
                                            <span>first page</span>
                                        </button>

                                        <button
                                            onClick={() => prevPage()}
                                            className="w-24 border-2 border-b px-2 hover:text-blue-600 transition-colors"
                                        >
                                            <span>prev</span>
                                        </button>

                                        <button
                                            onClick={() => resetFilter()}
                                            className="w-24 border-2 border-b px-2 hover:text-blue-600 transition-colors"
                                        >
                                            <span>reset filter</span>
                                        </button>

                                        <button
                                            onClick={() => nextPage()}
                                            className="w-24 border-2 border-b px-2 hover:text-blue-600 transition-colors"
                                        >
                                            <span>next</span>
                                        </button>
                                    </div>

                                    {/* Right Group: Next */}

                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </main>
        </div>
    );
}

export default AdminDashboard;