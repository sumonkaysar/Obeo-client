import type z from "zod";
import {
  basicInfoZodSchema,
  eduInfoZodSchema,
  pastExpZodSchema,
} from "../validations/candidate.validation";

export type TBasicInfo = z.infer<typeof basicInfoZodSchema>;
export type TEduInfo = z.infer<typeof eduInfoZodSchema>;
export type TPastExp = z.infer<typeof pastExpZodSchema>;

export type TCreateCandidateForm = TBasicInfo & TEduInfo & TPastExp;

export type TCandidate = Omit<TCreateCandidateForm, "picture"> & {
  _id: string;
  candidateId: string;
  picture: string;
};

export interface ISort {
  sortBy: string;
  order: "asc" | "desc";
}
