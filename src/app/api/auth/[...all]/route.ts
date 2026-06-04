import { createAuth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET(req: Request) {
  const { env } = getCloudflareContext();
  const auth = createAuth(env);
  return toNextJsHandler(auth).GET(req);
}

export async function POST(req: Request) {
  const { env } = getCloudflareContext();
  const auth = createAuth(env);
  return toNextJsHandler(auth).POST(req);
}
