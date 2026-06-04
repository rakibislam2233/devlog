import { createAuth } from "@/lib/auth";
import { getDb } from "@/db";
import { logs } from "@/db/schema";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";

// Helper context validation node
async function getAuthenticatedUser(req: Request, auth: any) {
  const session = await auth.api.getSession({ headers: req.headers });
  return session?.user || null;
}

export async function GET(req: Request) {
  try {
    const { env } = getCloudflareContext();
    const db = getDb(env);
    const auth = createAuth(env);

    // Validate active user authentication context
    const user = await getAuthenticatedUser(req, auth);
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized access node" },
        { status: 419 },
      );
    }

    const archivedLogs = await db
      .select()
      .from(logs)
      .where(
        and(
          eq(logs.creatorId, user.id),
          eq(logs.status, "archived"),
        ),
      )
      .orderBy(logs.date);

    return NextResponse.json({ success: true, data: archivedLogs });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to retrieve archived data matrix" },
      { status: 500 },
    );
  }
}
