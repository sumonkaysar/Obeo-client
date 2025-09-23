import axiosBaseQuery from "@/Redux/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["CANDIDATE"],
  endpoints: () => ({}),
});
