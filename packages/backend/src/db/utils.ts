import { sql, SQLChunk } from "drizzle-orm";
import * as p from "drizzle-orm/pg-core";
import { customType } from "drizzle-orm/pg-core";

export const nullsLast = (column: p.AnyPgColumn | SQLChunk) =>
  sql`${column} NULLS LAST`;

export const nullsFirst = (column: p.AnyPgColumn | SQLChunk) =>
  sql`${column} NULLS FIRST`;

export const pgBytea = customType<{
  data: Uint8Array;
  driverData: Buffer; // Node.js uses Buffer internally
}>({
  dataType() {
    return "bytea";
  },
});
