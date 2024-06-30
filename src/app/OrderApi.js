// lib/redux/features/OrderApi.js
import { api } from "./AllApi";

export const OrderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFilterOrder: builder.query({
      query: (filter) =>
        `orders?search${filter}`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: 'Order', id } ))
          : [{ type: 'Order' }],
    }),
    getOrder: builder.query({
      query: () => `orders`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Order", id }))
          : [{ type: "Order" }],
    }),
    getSingleOrder: builder.query({
      query: (id) => `orders/${id}`,
      providesTags: (result, error, id) => [{ type: "Order", id }],
    }),
    getCatOrder: builder.query({
      query: (catId) => `orders/${catId}`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Order", id }))
          : [{ type: "Order" }],
    }),
    addNewOrder: builder.mutation({
        query: (newOrder) => ({
          url: "orders",
          method: "POST",
          body: newOrder,
          headers: {
            'Access-Control-Allow-Origin': '*', 
          },
        }),
        invalidatesTags: [{ type: "Order" }],
      }),
      
    imgUpload: builder.mutation({
        query: (newOrder) => ({
          url: "/",
          method: "POST",
          body: newOrder,
        }),
        invalidatesTags: [{ type: "Order" }],
      }),
    editOrder: builder.mutation({
      query: (Order) => ({
        url: `orders/${Order.id}`,
        method: "PUT",
        body: Order,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Order", id }],
    }),
    editStatusOrder: builder.mutation({
      query: (Order) => ({
        url: `orders/${Order.OrderId}`,
        method: "PATCH",
        body: Order,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Order", id }],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Order", id }],
    }),
    
  }),
});

export const {
  useGetOrderQuery,
  useGetFilterOrderQuery,
  useGetSingleOrderQuery,
  useAddNewOrderMutation,
  useAddNewMultiOrderMutation,
  useImgUploadMutation,
  useEditOrderMutation,
  useDeleteOrderMutation,
  useEditStatusOrderMutation
} = OrderApi;
