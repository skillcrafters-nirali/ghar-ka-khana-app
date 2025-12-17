import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout } from '../store/authSlice';
import { useSelector } from 'react-redux';
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://192.168.29.169:3001/api/v1/',
  prepareHeaders: (headers, { getState }) => {
    // ✅ get token from redux store
    const token = getState().auth?.token;

    console.log('user token', token);

    if (token) {
      headers.set('x-auth-token', token);
      // OR if backend expects Bearer
      // headers.set('Authorization', `Bearer ${token}`);
    }

    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    api.dispatch(logout());
  }
  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Address'],
  endpoints: builder => ({
    // Auth
    login: builder.mutation({
      query: credentials => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
    //OTP
    verifyOtp: builder.mutation({
      query: credentials => ({
        url: 'verifyotp',
        method: 'POST',
        body: credentials,
      }),
      // transformResponse: response => {
      //   console.log('API Response:', response);
      //   console.log('Token:', response.token);
      //   console.log('User:', response.user);
      //   console.log('Status:', response.status);
      //   return response;
      // },
    }),

    //Resend OTP
    resendOtp: builder.mutation({
      query: credentials => ({
        url: 'resendOtp',
        method: 'POST',
        body: credentials,
      }),
    }),
    //city
    // getCities: builder.query({
    //   query: stateId => `city?stateId=${stateId}`,
    // }),

    getCities: builder.mutation({
      query: stateId => {
        console.log("stateId", stateId)
        return {
        url: 'city',
        method: 'POST',
        body: { stateId },
      }}
    }),

    //state
    getStates: builder.query({
      query: () => 'state',
    }),

    // ADDRESS
    userAddress: builder.mutation({
      query: addressData => ({
        url: 'storeaddress',
        method: 'POST',
        body: addressData,
      }),
      invalidatesTags: ['Address'],
    }),

    getUserAddresses: builder.query({
      query: () => 'useraddresses',
      providesTags: ['Address'],
    }),
  }),
});

export const {
  useLoginMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  // useGetCitiesQuery,
  useGetCitiesMutation,
  useGetStatesQuery,
  useUserAddressMutation,
  useGetUserAddressesQuery,
} = api;
