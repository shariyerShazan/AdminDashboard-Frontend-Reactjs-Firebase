/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../api/baseApi";

export type NewsCategory = "FOOTBALL" | "BASKETBALL" | "TENNIS";

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  category: NewsCategory;
  image: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NewsResponse<T> {
  success: boolean | null;
  message: string;
  data: T;
}

export interface AllNewsResponse extends NewsResponse<NewsItem[]> {
  pageNumber: number;
  totalNews: number;
}

export interface NewsQueryParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  date?: string;
}

export interface CreateNewsRequest {
  file: File;
  title: string;
  description: string;
  category: NewsCategory;
}


export const newsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /news/latest-news
    getLatestNews: builder.query<NewsResponse<NewsItem[]>, void>({
      query: () => "/news/latest-news",
      providesTags: ["News"],
    }),

    // GET /news/all
    getAllNews: builder.query<AllNewsResponse, NewsQueryParams>({
      query: (params) => ({
        url: "/news/all",
        params,
      }),
      providesTags: ["News"],
    }),

    // GET /news/single/{id}
    getSingleNews: builder.query<NewsResponse<NewsItem>, string>({
      query: (id) => `/news/single/${id}`,
      providesTags: ( id) => [{ type: "News", id }] as any,
    }),

    // POST /news/create
    createNews: builder.mutation<NewsResponse<NewsItem>, CreateNewsRequest>({
      query: (body) => {
        const formData = new FormData();
        formData.append("file", body.file);
        formData.append("title", body.title);
        formData.append("description", body.description);
        formData.append("category", body.category);
        return {
          url: "/news/create",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["News"],
    }),

    // PATCH /news/update/{id}
    updateNews: builder.mutation<
      NewsResponse<NewsItem>,
      { id: string; body: Partial<NewsItem> }
    >({
      query: ({ id, body }) => ({
        url: `/news/update/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ({ id }: any) => [
        "News",
        { type: "News", id },
      ],
    }),

    // DELETE /news/delete/{id}
    deleteNews: builder.mutation<NewsResponse<void>, string>({
      query: (id) => ({
        url: `/news/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["News"],
    }),
  }),
});

export const {
  useGetLatestNewsQuery,
  useGetAllNewsQuery,
  useGetSingleNewsQuery,
  useCreateNewsMutation,
  useUpdateNewsMutation,
  useDeleteNewsMutation,
} = newsApi;
