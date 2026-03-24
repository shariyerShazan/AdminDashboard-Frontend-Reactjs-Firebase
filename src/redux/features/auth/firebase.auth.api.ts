import { baseApi } from "@/redux/api/baseApi";


export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    authenticate: builder.mutation({
      query: (credentials: { firebaseAccessToken: string; name?: string }) => ({
        url: "/intro/authenticate",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useAuthenticateMutation } = authApi;
