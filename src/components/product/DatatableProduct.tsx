import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  type PaginationState,
  useReactTable,
  type ColumnDef
} from "@tanstack/react-table";

import { useQuery } from "@tanstack/react-query";
import { makeDataProduct } from "./MakeData";
import { useEffect, useMemo, useState } from "react";
import axios, { } from "axios";

/*

"id": 2,
"product_code": "50MW2HW01",
"brand": "HUAWEI",
"type": "GENERIC_MODEM",
"dt_row_index": 2

*/
type DatatableProduct = {
  dt_row_index: number // row yang digenerate per page
  product_code: string
  brand: string
  type: string
  id: number

}

const columnHelper = createColumnHelper<DatatableProduct>();
const columns: ColumnDef<DatatableProduct, any>[] = [
  // flat array
  columnHelper.accessor('dt_row_index', {
    id: 'index',
    header: () => <span>{'Index'}</span>,
    // cell: (info) => info.getValue()
    cell: (info) => {
      // const { pageIndex, pageSize } = info.table.getState().pagination;
      // return pageIndex * pageSize + info.row.index + 1;
      return info.getValue();
    }
  }),
  columnHelper.accessor('product_code', {
    id: 'product_code',
    header: () => <span>{'Product Code'}</span>,
    cell: (info) => info.getValue()
  }),
  columnHelper.accessor('brand', {
    id: 'brand',
    header: () => <span >{'Brand'}</span>,
    cell: (info) => {
      return info.getValue()
    }
  }),
  columnHelper.accessor('type', {
    id: 'type',
    header: () => <span>{'Product Type'}</span>,
    cell: (info) => info.getValue()
  }),
  columnHelper.accessor('id', {
    id: 'product_id',
    header: () => <span>{'Product ID'}</span>,
    cell: (info) => info.getValue()
  }),
]

const paginationDatatableFn = async (pagination: PaginationState) => {

  const { pageIndex, pageSize } = pagination

  const url_product = "https://item-management-dev-int-newscmt-dev.apps.kpaasjtn1.telkom.co.id"
  const result = await axios.get(`${url_product}/datatable-product-be?columnFilter=product_code,brand&offset=${pageIndex}&fetchRows=${pageSize}`, {})
  if (result.status != 200) {
    return [];
  }

  return result.data.body;
}




const ProductDatatable = () => {

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 20,
    pageSize: 10,
  });



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

  })


  const {
    data: dataSource, // aliasing
    isError: isErrDataSource,
    error: errInfoDataSource,
    isLoading,
  } = useQuery({
    queryKey: ["productDatatable", pagination] as const,
    queryFn: ({ queryKey }) => {
      // common pattern for pagination state
      const [_key, PaginationState] = queryKey;

      return paginationDatatableFn(PaginationState)
    },
    refetchOnWindowFocus: false,   // Disable refetch on window focus
    refetchOnMount: false,         // Disable refetch when component mounts
    refetchOnReconnect: false,
  })

  const table = useReactTable({
    data: dataSource ?? [], // data hasil fetch URL langsung dipake hook ini untuk render table
    columns,
    getCoreRowModel: getCoreRowModel(),
  });


  if (isLoading) {
    return (<>
      <h2> {"Loading"} </h2>
    </>)
  }

  if (isErrDataSource) {
    return (<>
      <h2> {errInfoDataSource.message} </h2>
    </>)
  }

  return (
    <>
      <div className="pl-16 pr-4 py-4">
        <table className="table-fixed w-full">
          <thead className="border border-green-500">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} >
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="border border-green-500 items-center justify-center px-2 py-1">
                    {header.isPlaceholder ? null :
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )
                    }
                  </th>
                )
                )}
              </tr>
            ))}
          </thead>

          <tbody className="border border-green-500">
            {table.getRowModel().rows.map((row) => (

              <tr key={row.id} className="border border-green-500">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="border border-green-500 px-2 ">
                    {/* note: using div tag di tempat yg tepat */}
                    <div className="flex flex-row  justify-center">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          {/* <footer className="flex flex-row gap-10"> */}

        </table>
        <div className="w-full">
          <div className="flex flex-row items-center justify-between p-4 w-full">
            {/* Left Group: First and Prev */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => firstPage()}
                className="hover:text-blue-600 transition-colors"
              >
                <span>first page</span>
              </button>
              <button
                onClick={() => prevPage()}
                className="hover:text-blue-600 transition-colors"
              >
                <span>prev</span>
              </button>
            </div>

            {/* Right Group: Next */}
            <button
              onClick={() => nextPage()}
              className="hover:text-blue-600 transition-colors"
            >
              <span>next</span>
            </button>
          </div>
        </div>
      </div >
    </>
  )
}

export default ProductDatatable;    