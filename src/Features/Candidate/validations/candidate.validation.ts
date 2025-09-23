import z from "zod";

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
export const ACCEPTED_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const fileSchema = z
  .instanceof(File)
  .refine(
    (file) => ACCEPTED_MIME_TYPES.includes(file.type),
    "Only .jpg, .jpeg, and .png formats are supported."
  )
  .refine(
    (file) => file.size <= MAX_FILE_SIZE_BYTES,
    `File size must be less than ${MAX_FILE_SIZE_MB}MB.`
  )
  .optional();

export const basicInfoZodSchema = z.object({
  firstName: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "First name is required"
          : "First name must be a string",
    })
    .nonempty("First name can't be blank")
    .min(2, "First name must be at least 2 characters long.")
    .max(20, "First name can't be more than 20 characters."),
  lastName: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Last name is required"
          : "Last name must be a string",
    })
    .nonempty("Last name can't be blank")
    .min(2, "Last name must be at least 2 characters long.")
    .max(20, "Last name can't be more than 20 characters."),
  email: z.email("Invalid email address.").nonempty("Email can't be blank."),
  phone: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Phone number is required"
          : "Phone number must be a string",
    })
    .nonempty("Phone number can't be blank")
    .regex(
      /^(\+8801[3-9]\d{8}|01[3-9]\d{8})$/,
      "Invalid format for Bangladeshi phone number (+8801xxxxxxxxx or 01xxxxxxxxx)"
    ),
  altPhone: z
    .union([
      z.literal(""),
      z
        .string("Alternative phone number must be a string")
        .regex(
          /^(\+8801[3-9]\d{8}|01[3-9]\d{8})$/,
          "Invalid format for Bangladeshi phone number (+8801xxxxxxxxx or 01xxxxxxxxx)"
        ),
    ])
    .optional(),
  ssn: z.string("ssn must be a string").optional(),
  presentAddress: z
    .string("Present address must be a string")
    .max(200, "Present address can't be more than 200 characters.")
    .optional(),
  permanentAddress: z
    .string("Permanent address must be a string")
    .max(200, "Permanent address can't be more than 200 characters.")
    .optional(),
  state: z
    .string("State must be a string")
    .max(50, "State can't be more than 50 characters.")
    .optional(),
  city: z
    .string("City must be a string")
    .max(50, "City can't be more than 50 characters.")
    .optional(),
  zipCode: z.string("Zip code must be a string").optional(),
  picture: fileSchema,
});
