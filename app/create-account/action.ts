"use server";

import { createUser, isEmailUnique } from "@/lib/auth";
import { RedirectType, redirect } from "next/navigation";
import { z } from "zod";

const createAccountSchema = z
  .object({
    name: z.string().trim().min(2, "min 2 characters"),
    email: z.string().trim().email("Invalid email"),
  })
  .superRefine(async ({ email }, ctx) => {
    if (!(await isEmailUnique(email))) {
      ctx.addIssue({
        code: "custom",
        message: "This Eamil is already in used",
        fatal: true,
        path: ["email"],
      });
      return z.NEVER;
    }
  });
export const createAccountAction = async (formData: FormData) => {
  try {
    const data = {
      email: formData.get("email"),
      name: formData.get("name"),
    };
    const result = await createAccountSchema.safeParseAsync(data);

    // guard
    if (!result.success) {
      console.log(result.error.flatten());
      return result.error.flatten();
    }
    // create user
    await createUser(result.data);
  } catch (err) {
    console.log(err);
  }

  redirect("/log-in", RedirectType.push);
};
