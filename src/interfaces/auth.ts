import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address configuration."),
  password: z.string().min(8, "Security keys must be at least 8 characters."),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Name identifier too short."),
  email: z.string().email("Invalid email address configuration."),
  password: z.string().min(8, "Security keys must be at least 8 characters."),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address configuration."),
});

export const resetPasswordSchema = z.object({
  password: z.string().min(8, "Security keys must be at least 8 characters."),
  confirmPassword: z.string().min(8, "Confirmation key mismatch."),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Security keys do not match.",
  path: ["confirmPassword"],
});

export const profileUpdateSchema = z.object({
  name: z.string().min(2, "Name identifier too short."),
  image: z.string().url("Invalid image URL.").optional().or(z.literal("")),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(8, "Current key required."),
  newPassword: z.string().min(8, "New key must be at least 8 characters."),
  confirmPassword: z.string().min(8, "Confirmation key required."),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "New security keys do not match.",
  path: ["confirmPassword"],
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
