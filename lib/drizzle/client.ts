import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const db_url = process.env.DATABASE_URL!;
const client = postgres(db_url, { max: 1 });

export const db = drizzle(client);
