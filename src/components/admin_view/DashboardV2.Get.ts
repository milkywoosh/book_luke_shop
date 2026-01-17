import {
  type ColumnFiltersState,
  type PaginationState,
} from '@tanstack/react-table';
import axios, { type AxiosInstance } from 'axios';
import type { orderTailorT  } from '../../data_sourcing_api/data_tailor';
import type { DatatableResponse } from '../../data_sourcing_api/data_response_interface';
import { DEFAULT_BASE_URL } from '../../data_sourcing_api/base_url';

export type RequestDatatableOptions = {
  /**
   * Base URL of the backend service, e.g. "http://localhost:3000"
   * Defaults to "http://localhost:3000" to keep backward compatibility.
   */
  baseUrl?: string;
  /**
   * Optional axios instance to allow easier testing / custom interceptors
   */
  client?: AxiosInstance;
};




const mappingReq: { [key: string]: string } = {
  order_number: 'orderNumber',
  phone_number: 'phoneNumber',
  full_name: 'fullName',
  start_process: 'startProcess',
  end_process: 'endProcess',
  service_type: 'serviceType',
  status_progress: 'statusProgress',
};

/**
 * Improved version of `requestDatatableFn` with:
 * - Stronger typing
 * - Injectable axios client for easier testing
 * - Normalised success & error response shape
 */
export async function requestDatatableFnV2<TBody>(
  pagination: PaginationState,
  colFilterParam: ColumnFiltersState,
  options: RequestDatatableOptions = {},
): Promise<DatatableResponse<orderTailorT[]>> {

  const { pageIndex, pageSize } = pagination;

  const params = new URLSearchParams({
    offset: pageIndex.toString(),
    fetchRows: pageSize.toString(),
  });

  colFilterParam.forEach((val) => {
    const mappedKey = mappingReq[val.id];
    if (!mappedKey) return;

    // ColumnFiltersState value is unknown; cast to string safely
    const rawValue = (val as { value?: unknown }).value;
    if (rawValue == null) return;

    params.append(mappedKey, String(rawValue));
  });

  const baseUrl = options.baseUrl ?? DEFAULT_BASE_URL;
  const client = options.client ?? axios;

  try {
    const res = await client.get<{
      status?: number;
      message?: string;
      body: any;
    }>(
      `${baseUrl}/api/order-customer/datatable?${params.toString()}`,
      {},
    );

    return {
      status: res.status,
      body: res.data.body ?? [],
      message: res.data.message ?? "error not defined",
    };
  } catch (err: any) {
    // Normalise known axios error shape
    const status: number = err?.response?.status ?? 0;
    const message: string =
      err?.response?.data?.message ??
      err?.message ??
      'Unknown error while fetching datatable';

    const body = [] as orderTailorT[];
    return {
      status,
      // keep body consistent; empty array by default
      body: body,
      message,
    };
  }
}

export default requestDatatableFnV2;

