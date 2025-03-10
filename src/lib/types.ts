import { z } from "zod";


export const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export const signupFormSchema = z.object({
    email: z.string().email({
      message: "Invalid email.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });



export const CreateWorkspaceSchema = z.object({
  workspaceName: z.string().describe("Workspace Name").min(1, {
    message: "Workspace Name is required",
  }),
  logo: z.any().describe("Workspace Logo").nullable(),
});
