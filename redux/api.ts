import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/general";

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.auth?.user?.access_token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const myApi = createApi({
  reducerPath: "myApi",
  baseQuery: baseQuery,
  tagTypes: [],
  endpoints: (builder) => ({
    /*** */
  }),
});
