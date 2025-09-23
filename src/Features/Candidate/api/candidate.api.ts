import { baseApi } from "@/Redux/baseApi";
import type { IResponse } from "@/types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCandidate: builder.mutation<
      IResponse<null>,
      Record<string, string>
      //   z.infer<typeof createCandidateZodSchema>
    >({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        data,
      }),
      invalidatesTags: ["CANDIDATE"],
    }),
  }),
});

export const { useCreateCandidateMutation } = authApi;
