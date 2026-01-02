import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  type PaginationState,
  useReactTable,
  type ColumnDef,
  type RowData,
  type ColumnFiltersState,
} from "@tanstack/react-table";

import "@tanstack/react-query";

import { useQuery } from "@tanstack/react-query";
// import { makeDataProduct } from "./MakeData";
import { useState } from "react";
import axios from "axios";
import Filter from "../filter_column/FilterDatatableColumn";
import PopUp from "../pop_up/PopUpBasic";

declare module '@tanstack/react-table' {
  //allows us to define custom properties for our columns
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: 'text' | 'range' | 'select'
  }
}

/*

note DatatableProductV2:

using filter column

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
    cell: (info) => {
      // const { pageIndex, pageSize } = info.table.getState().pagination;
      // return pageIndex * pageSize + info.row.index + 1;
      return info.getValue();
    },
    enableColumnFilter: false,
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

const requestDatatableFn = async (pagination: PaginationState, colFilterParam: ColumnFiltersState) => {

  const { pageIndex, pageSize } = pagination

  // all required param utk triggering perubahan request to server
  // semua param di bawah harus sesuai dengan BACKEND
  const params = new URLSearchParams({
    offset: pageIndex.toString(),
    fetchRows: pageSize.toString(),
  })

  const mappingReq: { [key: string]: string } = {
    product_code: "productCode",
    brand: "productBrand",
    type: "productType",
  }

  colFilterParam.forEach((val, _) => {
    // modify params

    params.append(mappingReq[val.id] as string, val.value as string)
  })

  // console.log("ceess params: ", params);
  // console.log("ceess params.toString(): ", params.toString());



  // const url_product = "https://item-management-dev-int-newscmt-dev.apps.kpaasjtn1.telkom.co.id"
  const url_product = "http://localhost:5000"
  // const result = await axios.get(`${url_product}/datatable-product-be?${params.toString()}`, {})
  return axios.get(`${url_product}/datatable-product-be?${params.toString()}`, {})
    .then(res => {
      // console.log("resss: ", res)
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
  // console.log("cek curr result: ", result.statusText)
  // if (result.status != 200) {
  //   return [];
  // }

  // return result.data.body;
}

const ProductDatatableV2 = () => {

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  // const [colFilterProduct, setColFilterProduct] = useState<ColFilterProduct>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const handleColumnFilterChange = (updater: any) => {
    console.log(updater)
    setColumnFilters(updater);

    setPagination((prev) => {
      return {
        ...prev,
        pageIndex: 0
      }
    });
  };


  const [popUpError, setPopUpError] = useState<boolean>(false);


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

  // note: filterProductIdFn dipake di column filter!
  // const filterColsFn = (col_filter: string, value: string) => setColFilterProduct((prevState: ColFilterProduct) => {
  //   return [
  //     ...prevState,
  //     { id: col_filter, value: value }
  //   ]
  // });


  const {
    data: dataSource, // aliasing
    isError: isErrDataSource,
    error: errInfoDataSource,
    isLoading,
  } = useQuery({
    queryKey: ["productDatatable", pagination, columnFilters] as const, // dependencies for triggering recalling API. Pagination and Col filtering
    queryFn: ({ queryKey }) => {
      // common pattern for pagination state
      const [_key, PaginationStateVal, colFilterProductVal] = queryKey;

      return requestDatatableFn(PaginationStateVal, colFilterProductVal)
    },
    placeholderData: (previousData) => previousData, // This prevents the flicker/reset
    refetchOnWindowFocus: false,   // Disable refetch on window focus
    refetchOnMount: false,         // Disable refetch when component mounts
    refetchOnReconnect: false,
  })

  const table = useReactTable({
    data: dataSource ?? [], // data hasil fetch URL useQuery langsung dipake hook ini untuk render table
    columns,
    state: {
      columnFilters
    },
    onColumnFiltersChange: handleColumnFilterChange, //setColumnFilters, handleColumnFilterChange ==> note: this function trigger unpredictable behaviour
    getCoreRowModel: getCoreRowModel(),
    manualFiltering: true,
    manualPagination: true,

    // DISABLE these to stop the "snap back" behavior
    autoResetPageIndex: false,
    autoResetExpanded: false,
  });

  // console.log("dataSource: ", dataSource)
  // console.log("isErrDataSource: ", isErrDataSource)
  // console.log("errInfoDataSource: ", errInfoDataSource)
  // console.log("b4 useEffect table", table);
  // console.log("b4 useEffect dataSource", dataSource);

  // useEffect(() => {

  //   if (dataSource?.code === "ERR_NETWORK") {
  //     console.log("siniiiii", popUpError)
  //     console.log("isErrDataSource", isErrDataSource)
  //     console.log("errInfoDataSource", errInfoDataSource)
  //     console.log("dataSource", dataSource)
  //     // trigger pop up 5 secs
  //     setPopUpError(true);
  //   }
  // }, []);



  if (isLoading) {
    return (<>
      <h2> {"Loading"} </h2>
    </>);
  }


  if (isErrDataSource) {
    return (<>
      <h2> {errInfoDataSource.message} </h2>
    </>);
  }

  const rowModel = table.getRowModel() ?? [];

  return (
    <>
      <div className="pl-16 pr-4 py-4">
        <table className="table-fixed w-full">
          <thead className="border border-green-500">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} >
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="border border-green-500 items-center justify-center px-2 py-1">
                    <div>
                      {header.isPlaceholder ? null :
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
                      }
                    </div>
                    <div>
                      {header.column.getCanFilter() ? (
                        <div className="rounded-none bg-inherit border-white">
                          {/* need =>  const { filterVariant } = column.columnDef.meta ?? {} utk membedakan tipe data yang difilter */}
                          <Filter
                            column={header.column}
                          />
                        </div>
                      ) : null
                      }
                    </div>
                  </th>
                )
                )}
              </tr>
            ))}
          </thead>


          <tbody className="border border-green-500">
            {
              rowModel.rows.length == 0 ?
                (<tr className="border border-green-500 text-center justify-items-center">
                  <td colSpan={5} className="border border-green-500 px-2">
                    <div className="flex flex-row  justify-center py-4">
                      {"Tidak mendapatkan data, data yang dicari tidak ada di sistem."}
                    </div>
                  </td>
                </tr>) : (
                  rowModel.rows.map((row) => (
                    <tr key={row.id} className="border border-green-500">
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="border border-green-500 px-2 ">
                          {/* note: using div tag di tempat yg tepat */}
                          <div className="flex flex-row  justify-center">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </div>
                        </td>
                      ))}
                    </tr>)
                  )
                )}
          </tbody>

        </table>
        <div className="w-full ">
          <div className="flex flex-row items-center justify-between p-2 w-full">
            {/* Left Group: First and Prev */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => firstPage()}
                className="w-24 border-2 border-green-500 px-2 hover:text-blue-600 transition-colors"
              >
                <span>first page</span>
              </button>

              <button
                onClick={() => prevPage()}
                className="w-24 border-2 border-green-500 px-2 hover:text-blue-600 transition-colors"
              >
                <span>prev</span>
              </button>

              <button
                onClick={() => resetFilter()}
                className="w-24 border-2 border-green-500 px-2 hover:text-blue-600 transition-colors"
              >
                <span>reset filter</span>
              </button>
            </div>

            {/* Right Group: Next */}
            <button
              onClick={() => nextPage()}
              className="w-24 border-2 border-green-500 px-2 hover:text-blue-600 transition-colors"
            >
              <span>next</span>
            </button>
          </div>
        </div>
      </div >
    </>
  )
}

export default ProductDatatableV2;    