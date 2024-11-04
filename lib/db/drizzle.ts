import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const client = postgres(
  "postgres://postgres:password@192.168.88.200:5432/business",
);

const db = drizzle(client);

export default db;
