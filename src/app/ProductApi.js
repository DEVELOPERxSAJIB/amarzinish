// lib/redux/features/ProductApi.js
import { api } from "./AllApi";

export const ProductApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFilterProduct: builder.query({
      query: (filter) =>
        `products?search${filter}`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: 'Product', id } ))
          : [{ type: 'Product' }],
    }),
    getProduct: builder.query({
      query: () => `products`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Product", id }))
          : [{ type: "Product" }],
    }),
    getSingleProduct: builder.query({
      query: (id) => `products/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),
    getCatProduct: builder.query({
      query: (catId) => `products/${catId}`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Product", id }))
          : [{ type: "Product" }],
    }),
    addNewProduct: builder.mutation({
        query: (newProduct) => ({
          url: "products",
          method: "POST",
          body: newProduct,
          headers: {
            'Access-Control-Allow-Origin': '*', 
          },
        }),
        invalidatesTags: [{ type: "Product" }],
      }),
      
    imgUpload: builder.mutation({
        query: (newProduct) => ({
          url: "/",
          method: "POST",
          body: newProduct,
        }),
        invalidatesTags: [{ type: "Product" }],
      }),
    editProduct: builder.mutation({
      query: (Product) => ({
        url: `products/${Product.id}`,
        method: "PUT",
        body: Product,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Product", id }],
    }),
    editStatusProduct: builder.mutation({
      query: (Product) => ({
        url: `products/${Product.productId}`,
        method: "PATCH",
        body: Product,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Product", id }],
    }),
    editStatusMarkProduct: builder.mutation({
      query: (Product) => ({
        url: `products/mark/${Product.productId}`,
        method: "PUT",
        body: Product,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Product", id }],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Product", id }],
    }),
    
  }),
});

export const {
  useGetProductQuery,
  useGetFilterProductQuery,
  useGetSingleProductQuery,
  useAddNewProductMutation,
  useAddNewMultiProductMutation,
  useImgUploadMutation,
  useEditProductMutation,
  useEditStatusMarkProductMutation,
  useDeleteProductMutation,
  useEditStatusProductMutation
} = ProductApi;
