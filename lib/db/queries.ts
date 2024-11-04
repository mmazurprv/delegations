import { and, eq } from "drizzle-orm";
import db from "./drizzle";
import { car, delegation, trip, user } from "./schema";

export async function getUser(email: string) {
  const [dbUser] = await db.select().from(user).where(eq(user.email, email));
  return dbUser;
}

export async function getAllDelegations(userId: string) {
  const allDelegations = await db
    .select()
    .from(delegation)
    .where(and(eq(delegation.userId, userId)));
  return allDelegations;
}

export async function getActiveDelegation(userId: string) {
  const [activeDelegation] = await db
    .select()
    .from(delegation)
    .where(and(eq(delegation.userId, userId), eq(delegation.status, "active")));
  return activeDelegation;
}

export async function getTripsForDelegation(
  delegationId: number,
  userId: string,
) {
  const delegationTrips = await db
    .select()
    .from(trip)
    .where(and(eq(trip.userId, userId), eq(trip.delegationId, delegationId)));
  return delegationTrips;
}

export async function getCarsByUser(userId: string) {
  const userCars = await db.select().from(car).where(eq(car.userId, userId));
  return userCars;
}
