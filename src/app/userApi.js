// lib/redux/features/UserApi.js
import { api } from "./AllApi";

export const UserApi = api.injectEndpoints({
  endpoints: (builder) => ({
   
    getUser: builder.query({
      query: () => `users`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "User", id }))
          : [{ type: "User" }],
    }),
    getSingleUser: builder.query({
      query: (id) => `users/${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
    getCatUser: builder.query({
      query: (catId) => `users/${catId}`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "User", id }))
          : [{ type: "User" }],
    }),
    addNewUser: builder.mutation({
        query: (newUser) => ({
          url: "users",
          method: "POST",
          body: newUser,
          headers: {
            'Access-Control-Allow-Origin': '*', 
          },
        }),
        invalidatesTags: [{ type: "User" }],
      }),
      

    editUserRole: builder.mutation({
      query: (User) => ({
        url: `users/${User.userId}`,
        method: "PUT",
        body: User,
        headers: {
          'Access-Control-Allow-Origin': '*', 
        },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "User", id }],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "User", id }],
    }),
    
  }),
});

export const {
  useGetUserQuery,
  useGetFilterUserQuery,
  useGetSingleUserQuery,
  useAddNewUserMutation,
  useAddNewMultiUserMutation,
  useEditUserRoleMutation,
  useDeleteUserMutation
} = UserApi;
