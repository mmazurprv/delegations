import { trip } from "./schema";
import { createInsertSchema } from "drizzle-zod";

export const insertTripSchema = createInsertSchema(trip);
