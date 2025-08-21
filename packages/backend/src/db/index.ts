import "dotenv/config";

import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER!,
  host: process.env.DB_HOST!,
  database: process.env.DB_DATABASE!,
  password: process.env.DB_PASSWORD!,
  port: parseInt(process.env.DB_PORT!),
  ssl: false,
  max: 2,
});
const db = drizzle({ client: pool });

export { db };
