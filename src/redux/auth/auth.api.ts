import { baseApi } from "../api/baseApi";

export interface UserProfile {
  id: string;
  email: string;
  role: "ADMIN" | "USER";
  name: string;
  phone: string | null;
  profileImageUrl: string | null;
  notificationsEnabled: boolean;
}

export interface ProfileResponse {
  success: boolean;
  message: string;
  data: UserProfile;
}



export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /auth/profile
    getProfile: builder.query<ProfileResponse, void>({
      query: () => "/auth/profile",
      providesTags: ["User"],
      // Transform response to return just the user data if preferred
      transformResponse: (response: ProfileResponse) => response,
    }),
  }),
});

export const { useGetProfileQuery } = authApi;
