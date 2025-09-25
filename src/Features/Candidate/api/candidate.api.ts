import { baseApi } from "@/Redux/baseApi";
import type { IResponse } from "@/types";
import type { TCandidate } from "../types/candidate.type";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCandidate: builder.mutation<
      IResponse<null>,
      Record<string, string>
      //   z.infer<typeof createCandidateZodSchema>
    >({
      query: (data) => ({
        url: "/candidates/create",
        method: "POST",
        data,
      }),
      invalidatesTags: ["CANDIDATE"],
    }),
    getAllCandidates: builder.query<
      IResponse<TCandidate>,
      Record<string, string>
      //   z.infer<typeof createCandidateZodSchema>
    >({
      query: () => ({
        url: "/candidates",
        method: "POST",
        // data,
      }),
      providesTags: ["CANDIDATE"],
    }),
  }),
});

export const { useCreateCandidateMutation, useGetAllCandidatesQuery } = authApi;
