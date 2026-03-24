// src/redux/api/baseApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// src/redux/api/baseApi.ts
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://10.10.10.65:3001",
    credentials: "include",
    prepareHeaders: (headers) => {
      // Get token from localStorage or your preferred storage
      const token = localStorage.getItem("token");

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["User", "News"],
  endpoints: () => ({}),
});
