/* eslint-disable @typescript-eslint/no-unused-vars */
// File: /app/api/auth/reset-password/route.ts

import bcrypt from "bcryptjs"; // পাসওয়ার্ড হ্যাশ করার জন্য
import { db } from "@/utils/db"; // আপনার ডাটাবেস কনফিগারেশন এখানে যুক্ত করুন
import { ResetPasswordSchema } from "@/lib/validator";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate input
    const validation = ResetPasswordSchema.safeParse(body);
    if (!validation.success) {
      return new Response(
        JSON.stringify({ errors: validation.error.format() }),
        { status: 400 }
      );
    }

    const { email, newPassword } = validation.data;

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password in your database
    const result = await db.collection("users").updateOne(
      { email },
      { $set: { password: hashedPassword } }
    );

    if (result.matchedCount === 0) {
      return new Response(
        JSON.stringify({ error: "User not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Password reset successful!" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Something went wrong!" }),
      { status: 500 }
    );
  }
}
