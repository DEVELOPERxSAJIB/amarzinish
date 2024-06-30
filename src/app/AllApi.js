
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const api = createApi({
  reducerPath: "Api",
  
  baseQuery: fetchBaseQuery({
    baseUrl: `https://dpxh6f05d3.execute-api.eu-north-1.amazonaws.com/`,
  }),
  tagTypes: ['Product'],
  endpoints: () => ({}),
})