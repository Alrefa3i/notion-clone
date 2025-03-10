import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../../../migrations/schema";
import { migrate } from "drizzle-orm/postgres-js/migrator";

const client = postgres(process.env.DATABASE_URL!);
const db = drizzle(client, { schema });

const migrateDB = async () => {
  try {
    console.log("Migrating database...");
    await migrate(db, { migrationsFolder: "./migrations" });
    console.info("Database migration completed successfully.");
  } catch (error) {
    console.error("Error migrating database:", error);
  }
};
// migrateDB();

export default db;
