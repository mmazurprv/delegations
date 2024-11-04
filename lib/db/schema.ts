import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

// Organisation Table
export const organisation = pgTable("organisation", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

// User Table
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  organisationId: integer("organisation_id").references(() => organisation.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Session Table
export const session = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

// Car Table
export const car = pgTable("car", {
  id: serial("id").primaryKey(),
  licensePlate: text("license_plate").notNull().unique(),
  model: text("model").notNull(),
  userId: text("user_id")
    .references(() => user.id)
    .notNull(),
  organisationId: integer("organisation_id")
    .references(() => organisation.id)
    .notNull(),
});

// Delegation Table
export const delegation = pgTable("delegation", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .references(() => user.id)
    .notNull(),
  description: text("description"),
  dietCount: integer("diet_count"),
  status: text("status").default("active").notNull(),
});

// Trip Table
export const trip = pgTable("trip", {
  id: serial("id").primaryKey(),
  delegationId: integer("delegation_id")
    .references(() => delegation.id)
    .notNull(),
  startTime: timestamp("start_time").defaultNow().notNull(),
  endTime: timestamp("end_time"),
  startLocation: text("start_location").notNull(),
  endLocation: text("end_location"),
  tripDescription: text("trip_description"),
  startMeter: integer("start_meter").notNull(),
  endMeter: integer("end_meter"),
  carId: integer("car_id")
    .references(() => car.id)
    .notNull(),
  userId: text("user_id")
    .references(() => user.id)
    .notNull(),
  lastUpdated: timestamp("last_updated").defaultNow().notNull(),
  status: text("status").default("active").notNull(),
});
