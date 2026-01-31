import { describe, it, test, expect, vi, type Mocked } from 'vitest';
import type { ColumnFiltersState, PaginationState } from '@tanstack/react-table';
import type { AxiosInstance } from 'axios';

import { requestDatatableFnV2 } from './DashboardV2.Get';
import type { DatatableResponse } from '../../data_sourcing_api/data_response_interface';

type MockAxios = Pick<AxiosInstance, 'get'>;

// factories, make sure each call is unique
const createMockClient = (): Mocked<MockAxios> => {
  return {
    get: vi.fn() as MockAxios['get']
  } as Mocked<MockAxios>; //as unknown as MockAxios;
};



const createPagination = (pageIndex: number, pageSize: number): PaginationState => ({
  pageIndex,
  pageSize,
});

describe('requestDatatableFnV2', () => {


  it('builds query params from pagination and filters and returns normalized success response', async () => {
    const mockClient = createMockClient();
    const pagination = createPagination(1, 25);

    const filters: ColumnFiltersState = [
      { id: 'order_number', value: 'ORD-123' },
      { id: 'phone_number', value: '08123456789' },
    ];

    const mockBody = [{ id: 1 }, { id: 2 }]
    const mockMessage: string = 'ok';

    (mockClient.get as any).mockResolvedValue({
      body: mockBody,
      data: {
        body: {
          data: mockBody,
        },
        message: mockMessage,
      },
      status: 200,
    });

    const res = await requestDatatableFnV2<typeof mockBody>(pagination, filters, {
      baseUrl: 'http://example.com',
      client: mockClient as any,
    });
    // Verify axios call
    expect(mockClient.get).toHaveBeenCalledTimes(1);

    
    
    const calledUrl = (mockClient.get as any).mock.calls[0][0] as string; //????
    // expect(calledUrl).toContain('http://example.com/order-customer/datatable-all-customer?'); api v1
    expect(calledUrl).toContain('http://example.com/api/order/datatable?'); // api v2
    expect(calledUrl).toContain('offset=1');
    expect(calledUrl).toContain('fetchRows=25');
    expect(calledUrl).toContain('orderNumber=ORD-123');
    expect(calledUrl).toContain('phoneNumber=08123456789');

    // Verify normalized response
    const expected: DatatableResponse<typeof mockBody> = {
      body: mockBody,
      status: 200,
      message: 'ok',
    };

    console.log("res: ", res)
    expect(res).toEqual(expected);
  });

  it('ignores filters without mapping or with nullish values', async () => {
    const mockClient = createMockClient();
    const pagination = createPagination(0, 10);

    const filters: ColumnFiltersState = [
      { id: 'order_number', value: 'ORD-999' },
      // unmapped id
      { id: 'some_other_column', value: 'should-not-appear' },
      // null value
      { id: 'phone_number', value: null as any },
    ];

    (mockClient.get as any).mockResolvedValue({
      status: 200,
      data: {
        body: [],
      },
    });

    await requestDatatableFnV2(pagination, filters, {
      client: mockClient as any,
    });

    expect(mockClient.get).toHaveBeenCalledTimes(1);
    const calledUrl = (mockClient.get as any).mock.calls[0][0] as string;

    // Should contain mapped orderNumber but not other ids / null values
    expect(calledUrl).toContain('orderNumber=ORD-999');
    expect(calledUrl).not.toContain('some_other_column');
    expect(calledUrl).not.toContain('phoneNumber=');
  });

  it('returns normalized error response when axios client throws with response', async () => {
    const mockClient = createMockClient();
    const pagination = createPagination(0, 10);
    const filters: ColumnFiltersState = [];

    (mockClient.get as any).mockRejectedValue({
      response: {
        status: 500,
        data: { message: 'Internal Server Error' },
      },
    });

    const res = await requestDatatableFnV2(pagination, filters, {
      client: mockClient as any,
    });

    expect(res.status).toBe(500);
    expect(res.body).toEqual([]);
    expect(res.message).toBe('Internal Server Error');
  });

  it('falls back to generic message and status 0 when error has no response', async () => {
    const mockClient = createMockClient();
    const pagination = createPagination(0, 10);
    const filters: ColumnFiltersState = [];

    (mockClient.get as any).mockRejectedValue({
      message: 'Network Error',
    });

    const res = await requestDatatableFnV2(pagination, filters, {
      client: mockClient as any,
    });

    expect(res.status).toBe(0);
    expect(res.body).toEqual([]);
    expect(res.message).toBe('Network Error');
  });
});

