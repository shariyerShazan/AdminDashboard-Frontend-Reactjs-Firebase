import { baseApi } from "../api/baseApi";

export interface User {
  id: string;
  name: string;
  email: string;
  status: boolean; // true for active, false for blocked
  created_at: string;
  lastLogin: string;
}

export interface DashboardStats {
  success: boolean | null;
  message: string | null;
  data: null;
  totalUser: number;
  totalNews: number;
}

export interface AllUsersResponse {
  success: boolean | null;
  message: string | null;
  data: User[];
  page: number;
  totalUsers: number;
}

export interface RecentUsersResponse {
  success: boolean | null;
  message: string | null;
  data: User[];
}

export interface UserQueryParams {
  page?: number;
  limit?: number;
  search?: string;
}

;

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /admin-dashboard/admin-dashboard
    getDashboardStats: builder.query<DashboardStats, void>({
      query: () => "/admin-dashboard/admin-dashboard",
      providesTags: ["User", "News"],
    }),

    // GET /admin-dashboard/all-users
    getAllUsers: builder.query<AllUsersResponse, UserQueryParams>({
      query: (params) => ({
        url: "/admin-dashboard/all-users",
        params,
      }),
      providesTags: ["User"],
    }),

    // GET /admin-dashboard/recent-users
    getRecentUsers: builder.query<RecentUsersResponse, void>({
      query: () => "/admin-dashboard/recent-users",
      providesTags: ["User"],
    }),

    // PATCH /admin-dashboard/block/{id}
    blockUser: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/admin-dashboard/block/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),

    // PATCH /admin-dashboard/unblock/{id}
    unblockUser: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/admin-dashboard/unblock/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),

    // DELETE /admin-dashboard/delete/{id}
    deleteUser: builder.mutation<{ success: boolean; message: string }, string>(
      {
        query: (id) => ({
          url: `/admin-dashboard/delete/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["User"],
      },
    ),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetAllUsersQuery,
  useGetRecentUsersQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
  useDeleteUserMutation,
} = adminApi;
