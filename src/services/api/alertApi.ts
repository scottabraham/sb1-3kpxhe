import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Alert, AlertTableParams, AlertTableResponse } from '../types/alert';

export const alertApi = createApi({
  reducerPath: 'alertApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Alert'],
  endpoints: (builder) => ({
    getAlert: builder.query<Alert, string>({
      query: (id) => `alerts/${id}`,
      providesTags: (result, error, id) => [{ type: 'Alert', id }],
    }),
    getAlertTable: builder.query<AlertTableResponse, AlertTableParams>({
      query: (params) => ({
        url: 'alerts',
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.alerts.map(({ id }) => ({ type: 'Alert' as const, id })),
              { type: 'Alert', id: 'LIST' },
            ]
          : [{ type: 'Alert', id: 'LIST' }],
    }),
  }),
});

export const { useGetAlertQuery, useGetAlertTableQuery } = alertApi;