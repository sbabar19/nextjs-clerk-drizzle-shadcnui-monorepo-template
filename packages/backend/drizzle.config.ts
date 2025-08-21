import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    user: process.env.DB_USER!,
    host: process.env.DB_HOST!,
    database: process.env.DB_DATABASE!,
    password: process.env.DB_PASSWORD!,
    port: parseInt(process.env.DB_PORT!),
    ssl: false,
  },
});
