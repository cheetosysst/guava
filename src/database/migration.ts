import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";

const bunSqlite = new Database("db.sqlite3");
const db = drizzle(bunSqlite);

migrate(db, { migrationsFolder: "drizzle" });

bunSqlite.close();
