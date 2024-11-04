"use server";

import { cookies } from "next/headers";
import { getUser, lucia } from "../auth";
import { redirect } from "next/navigation";
import db from "../db/drizzle";
import { user } from "../db/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

export async function login(_: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  console.log(email, password);

  // Fetch the user by email
  const [existingUser] = await db
    .select()
    .from(user)
    .where(eq(user.email, email));

  console.log(existingUser);

  if (!existingUser) {
    console.log("Incorrect email");
    return {
      error: "Incorrect email or password",
    };
  }

  // Verify the password using bcrypt
  const validPassword = await bcrypt.compare(
    password,
    existingUser.passwordHash,
  );
  if (!validPassword) {
    console.log("Incorrect password");
    return {
      error: "Incorrect email or password",
    };
  }

  // Create a session for the user
  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  // Redirect to the dashboard
  return redirect("/dashboard");
}

export async function logout() {
  const { session } = await getUser();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/");
}
