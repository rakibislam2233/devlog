import { createAuth } from "@/lib/auth";
import { getDb } from "@/db";
import { logs } from "@/db/schema";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { eq, and, ne } from "drizzle-orm";
import { NextResponse } from "next/server";

// Helper function to extract user session inside edge components
async function getAuthenticatedUser(req: Request, auth: any) {
  const session = await auth.api.getSession({ headers: req.headers });
  return session?.user || null;
}

export async function GET(req: Request) {
  try {
    const { env } = getCloudflareContext();
    const db = getDb(env);
    const auth = createAuth(env);

    const user = await getAuthenticatedUser(req, auth);
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized access node" },
        { status: 419 },
      );
    }

    // Fetch user specific entries that are NOT archived
    const userLogs = await db
      .select()
      .from(logs)
      .where(
        and(
          eq(logs.creatorId, user.id),
          ne(logs.status, "archived"),
        ),
      )
      .orderBy(logs.date);

    return NextResponse.json({ success: true, data: userLogs });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Execution exception occurred" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const { env } = getCloudflareContext();
    const db = getDb(env);
    const auth = createAuth(env);

    const user = await getAuthenticatedUser(req, auth);
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized access node" },
        { status: 419 },
      );
    }

    const body = await req.json() as any;
    const {
      whatIDid,
      whatILearned,
      whatIWillDoTomorrow,
      hoursSpent,
      category,
      date,
      status,
    } = body;

    // Core schema validation fallbacks
    if (
      !whatIDid ||
      !whatILearned ||
      !whatIWillDoTomorrow ||
      !hoursSpent ||
      !category ||
      !date
    ) {
      return NextResponse.json(
        { error: "Missing required payload tracking configurations" },
        { status: 400 },
      );
    }

    // Generate runtime unique record identifier
    const recordId = `log_${crypto.randomUUID()}`;

    const [newLog] = await db
      .insert(logs)
      .values({
        id: recordId,
        creatorId: user.id,
        whatIDid,
        whatILearned,
        whatIWillDoTomorrow,
        hoursSpent,
        category,
        date: new Date(date),
        status: status || "draft",
      })
      .returning();

    return NextResponse.json({ success: true, data: newLog }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to commit record write" },
      { status: 500 },
    );
  }
}
