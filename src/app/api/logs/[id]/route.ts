import { createAuth } from "@/lib/auth";
import { getDb } from "@/db";
import { logs } from "@/db/schema";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";

async function getAuthenticatedUser(req: Request, auth: any) {
  const session = await auth.api.getSession({ headers: req.headers });
  return session?.user || null;
}


export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
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

    const [logRecord] = await db
      .select()
      .from(logs)
      .where(and(eq(logs.id, id), eq(logs.creatorId, user.id)));

    if (!logRecord) {
      return NextResponse.json(
        { error: "Target log record context not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: logRecord });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * 4. PATCH/PUT: Edit existing dev log instance parameters OR Archive it
 * (Pass "status": "archived" in the request body to execute an archive protocol)
 */
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
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
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request payload" },
        { status: 400 },
      );
    }

    // Check if item exists and belongs to user before patching metrics
    const [existingLog] = await db
      .select()
      .from(logs)
      .where(and(eq(logs.id, id), eq(logs.creatorId, user.id)));

    if (!existingLog) {
      return NextResponse.json(
        { error: "Target data cluster unavailable for modification" },
        { status: 404 },
      );
    }

    // Process type casting for date metrics if updated
    const updatePayload: any = { ...body };
    if (body.date) updatePayload.date = new Date(body.date);

    // Enforce dynamic system clock updates
    updatePayload.updatedAt = new Date();

    const [updatedRecord] = await db
      .update(logs)
      .set(updatePayload)
      .where(and(eq(logs.id, id), eq(logs.creatorId, user.id)))
      .returning();

    return NextResponse.json({ success: true, data: updatedRecord });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
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

    const [deletedRecord] = await db
      .delete(logs)
      .where(and(eq(logs.id, id), eq(logs.creatorId, user.id)))
      .returning();

    if (!deletedRecord) {
      return NextResponse.json(
        { error: "Delete sequence aborted. Instance missing or unauthorized." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Record permanently purged from workspace",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
