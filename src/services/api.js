import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout } from '../store/authSlice';

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await fetchBaseQuery({
    baseUrl: 'http://192.168.29.169:3001/api/v1/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  })(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    api.dispatch(logout());
  }

  return result;
};


export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User','Address'],
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
      transformResponse: (response) => {
        console.log('API Response:', response);
        console.log('Token:', response.token);
        console.log('User:', response.user);
        console.log('Status:', response.status);
        return response;
      },
    }),
     
    //Resend OTP
    resendOtp:
    builder.mutation({
      query: credentials => ({
        url:'resendOtp',
        method:'POST',
        body:credentials,
      }),
    }),
    //Address 
    getCities:
    builder.query({
      query:(stateId) => `city${stateId ? `?stateId=${stateId}`:''}`,
      
    }),

    getStates:
    builder.query({
      query: () => 'state',
      
    }),

    storeAddress:
    builder.mutation({
        query:(addressData) => ({
          url: 'storeaddress',
          method:'POST',
          body:addressData,
        }),
        invalidatesTags:['Address'],
      }),
    }),
  });

export const { 
  useLoginMutation, 
  useVerifyOtpMutation,
  useResendOtpMutation,
  useGetCitiesQuery,
  useGetStatesQuery,
  useStoreAddressMutation } = api;
