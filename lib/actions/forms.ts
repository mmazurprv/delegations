"use server";

import { revalidatePath } from "next/cache";
import db from "../db/drizzle";
import { insertTripSchema } from "../db/models";
import { car, delegation, trip } from "../db/schema";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { getUser } from "../auth";

export async function startDelegation() {
  const { user } = await getUser();
  if (!user) {
    return redirect("/login");
  }

  const newDelegation = await db
    .insert(delegation)
    .values({ userId: user.id, status: "active" })
    .returning();
  console.log(newDelegation);

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function startTrip(_prevState: any, formData: FormData) {
  const { user } = await getUser();
  if (!user) {
    return redirect("/login");
  }

  const addTripSchema = insertTripSchema
    .pick({
      startLocation: true,
      startMeter: true,
      delegationId: true,
    })
    .extend({
      carModel: z.string().min(1, "Car model is required."),
    });

  const validatedFields = addTripSchema.safeParse({
    startLocation: formData.get("startLocation"),
    startMeter: parseInt(formData.get("startMeter") as string),
    delegationId: parseInt(formData.get("delegationId") as string),
    carModel: formData.get("carModel"),
  });

  if (!validatedFields.success) {
    console.error(
      "Missing Fields. Failed to Create Trip.",
      validatedFields.error.flatten().fieldErrors,
    );
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Trip.",
    };
  }

  const [newCar] = await db
    .select()
    .from(car)
    .where(eq(car.model, validatedFields.data.carModel));

  const carId = newCar.id;

  const { startLocation, startMeter, delegationId } = validatedFields.data;

  const data = {
    startLocation,
    startMeter,
    delegationId,
    userId: user.id,
    carId,
  };

  try {
    await db.insert(trip).values(data);
  } catch (error) {
    console.error("Database Error: Failed to add trip", error);
    return {
      message: "Database Error: Failed to add trip",
    };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function endTrip(_prevState: any, formData: FormData) {
  const endTripSchema = insertTripSchema.pick({
    endLocation: true,
    endMeter: true,
  });

  const validatedFields = endTripSchema.safeParse({
    endLocation: formData.get("endLocation"),
    endMeter: parseInt(formData.get("endMeter") as string),
  });

  if (!validatedFields.success) {
    console.error(validatedFields.error.flatten());
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to End Trip.",
    };
  }

  const { endLocation, endMeter } = validatedFields.data;

  const data = {
    endLocation,
    endMeter,
    endTime: new Date(),
    status: "completed",
  };

  try {
    await db.update(trip).set(data).where(eq(trip.status, "active"));
  } catch (error) {
    console.error("Database Error: Failed to end trip", error);
    return {
      message: "Database Error: Failed to end trip",
    };
  }

  if (endLocation == "Kleszczów") {
    await db
      .update(delegation)
      .set({ status: "completed" })
      .where(eq(delegation.status, "active"));
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}
