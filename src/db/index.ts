import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

export function getDb(env?: Partial<CloudflareEnv>) {
  const connectionString =
    env?.HYPERDRIVE?.connectionString ??
    (process.env
      .CLOUDFLARE_HYPERDRIVE_LOCAL_CONNECTION_STRING_HYPERDRIVE as string) ??
    process.env.DATABASE_URL!;

  const sql = neon(connectionString);
  return drizzle(sql, { schema });
}

export type DB = ReturnType<typeof getDb>;
