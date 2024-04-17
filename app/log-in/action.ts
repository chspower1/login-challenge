"use server";

import db from "@/lib/db";
import { getSession, saveSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";

const loginSchema = z
  .object({
    email: z.string().trim().email("Invalid email"),
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (!user) {
      return ctx.addIssue({
        code: "custom",
        message: "This email is not registerd",
        path: ["email"],
      });
    }

    // login
    const session = await getSession();
    await saveSession(session, user.id);
  });
export const loginAction = async (formData: FormData) => {
  console.log("formData", formData);
  try {
    const data = {
      email: formData.get("email"),
    };
    const result = await loginSchema.safeParseAsync(data);

    // guard
    if (!result.success) {
      return result.error.flatten();
    }
  } catch (err) {
    console.log(err);
  }
  redirect("/");
};
