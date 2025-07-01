import postgres from "postgres";
import * as schema from "./schema";
import { drizzle } from "drizzle-orm/postgres-js";

const db_url = process.env.DATABASE_URL!;
const client = postgres(db_url);

export const db = drizzle(client, { schema });
