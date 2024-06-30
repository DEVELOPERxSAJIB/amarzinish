// lib/redux/features/BidApi.js
import { api } from "./AllApi";

export const BidApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFilterBid: builder.query({
      query: (filter) =>
        `bids?search${filter}`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: 'Bid', id } ))
          : [{ type: 'Bid' }],
    }),
    getBid: builder.query({
      query: () => `bids`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Bid", id }))
          : [{ type: "Bid" }],
    }),
    getSingleBid: builder.query({
      query: (id) => `bids/${id}`,
      providesTags: (result, error, id) => [{ type: "Bid", id }],
    }),
    getSingleBidByProductId: builder.query({
      query: (productId) => `bids/${productId}`,
      providesTags: (result, error, id) => [{ type: "Bid", id }],
    }),
    getUserBids: builder.query({
      query: (userId) => `userbids/${userId}`,
      providesTags: (result, error, id) => [{ type: "Bid", id }],
    }),
    getCatBid: builder.query({
      query: (catId) => `bids/${catId}`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Bid", id }))
          : [{ type: "Bid" }],
    }),
    addNewBid: builder.mutation({
        query: (newBid) => ({
          url: "bids",
          method: "POST",
          body: newBid,
          headers: {
            'Access-Control-Allow-Origin': '*', 
          },
        }),
        invalidatesTags: [{ type: "Bid" }],
      }),
      
    
    editBid: builder.mutation({
      query: (Bid) => ({
        url: `bids/${Bid.id}`,
        method: "PUT",
        body: Bid,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Bid", id }],
    }),
    deleteBid: builder.mutation({
      query: (id) => ({
        url: `bids/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Bid", id }],
    }),
    
  }),
});

export const {
  useGetBidQuery,
  useGetFilterBidQuery,
  useGetSingleBidQuery,
  useAddNewBidMutation,
  useAddNewMultiBidMutation,
  useImgUploadMutation,
  useGetSingleBidByProductIdQuery,
  useEditBidMutation,
  useGetUserBidsQuery,
} = BidApi;
