// lib/redux/features/PaymentApi.js
import { api } from "./AllApi";

export const PaymentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFilterPayment: builder.query({
      query: (filter) =>
        `payments?search${filter}`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: 'Payment', id } ))
          : [{ type: 'Payment' }],
    }),
    getPayment: builder.query({
      query: () => `payments`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Payment", id }))
          : [{ type: "Payment" }],
    }),
    getSinglePayment: builder.query({
      query: (id) => `payments/${id}`,
      providesTags: (result, error, id) => [{ type: "Payment", id }],
    }),
    getCatPayment: builder.query({
      query: (catId) => `payments/${catId}`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Payment", id }))
          : [{ type: "Payment" }],
    }),
    addNewPayment: builder.mutation({
        query: (newPayment) => ({
          url: "payments",
          method: "POST",
          body: newPayment,
          headers: {
            'Access-Control-Allow-Origin': '*', 
          },
        }),
        invalidatesTags: [{ type: "Payment" }],
      }),
      
    imgUpload: builder.mutation({
        query: (newPayment) => ({
          url: "/",
          method: "POST",
          body: newPayment,
        }),
        invalidatesTags: [{ type: "Payment" }],
      }),
    editPayment: builder.mutation({
      query: (Payment) => ({
        url: `payments/${Payment.id}`,
        method: "PUT",
        body: Payment,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Payment", id }],
    }),
    editStatusPayment: builder.mutation({
      query: (Payment) => ({
        url: `payments/${Payment.PaymentId}`,
        method: "PATCH",
        body: Payment,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Payment", id }],
    }),
    deletePayment: builder.mutation({
      query: (id) => ({
        url: `payments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Payment", id }],
    }),
    
  }),
});

export const {
  useGetPaymentQuery,
  useGetFilterPaymentQuery,
  useGetSinglePaymentQuery,
  useAddNewPaymentMutation,
  useAddNewMultiPaymentMutation,
  useImgUploadMutation,
  useEditPaymentMutation,
  useDeletePaymentMutation,
  useEditStatusPaymentMutation
} = PaymentApi;
