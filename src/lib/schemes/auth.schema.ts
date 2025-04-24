import { z } from "zod";

export const useRegisterSchema = () => {
  return z
    .object({
      username: z
        .string({ required_error: "Username is required." })
        .min(1, "Username cannot be empty.")
        .max(10, "Username must not exceed 10 characters."),

      firstName: z
        .string({ required_error: "First name is required." })
        .min(1, "First name cannot be empty.")
        .max(10, "First name must not exceed 10 characters."),

      lastName: z
        .string({ required_error: "Last name is required." })
        .min(1, "Last name cannot be empty.")
        .max(10, "Last name must not exceed 10 characters."),

      email: z
        .string({ required_error: "Email is required." })
        .email("Please enter a valid email address."),

      phone: z
        .string({ required_error: "Phone number is required." })
        .min(1, "Phone number cannot be empty."),

      password: z
        .string({ required_error: "Password is required." })
        .min(8, "Password must be at least 8 characters long."),

      rePassword: z.string({ required_error: "Please confirm your password." })
      .min(1,"Please confirm your password." ),
    })
    .refine((data) => data.password === data.rePassword, {
      message: "Passwords do not match.",
      path: ["rePassword"],
    });
};


export const useLoginSechema=()=>{
  return z
  .object({
    email: z
        .string({ required_error: "Email is required." })
        .email("Please enter a valid email address."),
  password: z
        .string({ required_error: "Password is required." })
        .min(8, "Password must be at least 8 characters long."),

  })
}
export const useForgetPasswordSechema=()=>{
  return z
  .object({
    email: z
        .string({ required_error: "Email is required." })
        .email("Please enter a valid email address."),


  })
}
export const useSetPasswordSechema=()=>{
  return z
  .object({
        password: z
        .string({ required_error: "Password is required." })
        .min(8, "Password must be at least 8 characters long."),

      rePassword: z.string({ required_error: "Please confirm your password." })
      .min(1,"Please confirm your password." ),
  })
}
export const useVerificationCodeSechema=()=>{
  return z
  .object({
    code: z
        .string({ required_error: "code is required." })
        .min(1, "code cannot be empty.")
  })
}
export type RegistertionInputs=z.infer<ReturnType<typeof useRegisterSchema>>
export type LoginInputs=z.infer<ReturnType<typeof useLoginSechema>>
export type ForgetPasswordInput=z.infer<ReturnType<typeof useForgetPasswordSechema>>
export type SetPasswordInputs=z.infer<ReturnType<typeof useSetPasswordSechema>>
export type verificationCodeInputs=z.infer<ReturnType<typeof useVerificationCodeSechema>>