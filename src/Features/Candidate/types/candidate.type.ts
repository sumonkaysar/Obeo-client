import type z from "zod";
import type { basicInfoZodSchema } from "../validations/candidate.validation";

export type TBasicInfo = z.infer<typeof basicInfoZodSchema>;
