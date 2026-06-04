"use server";

import { createAuth } from "@/lib/auth";
import { getDb } from "@/db";
import { logs } from "@/db/schema";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { eq, and, ne } from "drizzle-orm";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import {
  ActionResponse,
  CreateLogInput,
  Log,
  UpdateLogInput,
} from "@/interfaces/log";

async function getAuthenticatedUser() {
  const { env } = getCloudflareContext();
  const auth = createAuth(env);
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.user || null;
}

export async function getLogsAction(): Promise<ActionResponse<Log[]>> {
  try {
    const user = await getAuthenticatedUser();
    if (!user) throw new Error("Unauthorized");

    const { env } = getCloudflareContext();
    const db = getDb(env);

    const userLogs = await db
      .select()
      .from(logs)
      .where(and(eq(logs.creatorId, user.id), ne(logs.status, "archived")))
      .orderBy(logs.date);

    return { success: true, data: userLogs as Log[] };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getArchivedLogsAction(): Promise<ActionResponse<Log[]>> {
  try {
    const user = await getAuthenticatedUser();
    if (!user) throw new Error("Unauthorized");

    const { env } = getCloudflareContext();
    const db = getDb(env);

    const archivedLogs = await db
      .select()
      .from(logs)
      .where(and(eq(logs.creatorId, user.id), eq(logs.status, "archived")))
      .orderBy(logs.date);

    return { success: true, data: archivedLogs as Log[] };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createLogAction(
  data: CreateLogInput,
): Promise<ActionResponse<Log>> {
  try {
    const user = await getAuthenticatedUser();
    if (!user) throw new Error("Unauthorized");

    const { env } = getCloudflareContext();
    const db = getDb(env);

    const recordId = `log_${crypto.randomUUID()}`;

    const [newLog] = await db
      .insert(logs)
      .values({
        id: recordId,
        creatorId: user.id,
        whatIDid: data.whatIDid,
        whatILearned: data.whatILearned,
        whatIWillDoTomorrow: data.whatIWillDoTomorrow,
        hoursSpent: data.hoursSpent,
        category: data.category,
        date: new Date(data.date),
        status: data.status || "draft",
      })
      .returning();

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/dev-logs");
    return { success: true, data: newLog as Log };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateLogAction(
  id: string,
  data: UpdateLogInput,
): Promise<ActionResponse<Log>> {
  try {
    const user = await getAuthenticatedUser();
    if (!user) throw new Error("Unauthorized");

    const { env } = getCloudflareContext();
    const db = getDb(env);

    const updatePayload: any = { ...data };
    if (data.date) updatePayload.date = new Date(data.date);
    updatePayload.updatedAt = new Date();

    const [updatedRecord] = await db
      .update(logs)
      .set(updatePayload)
      .where(and(eq(logs.id, id), eq(logs.creatorId, user.id)))
      .returning();

    if (!updatedRecord) throw new Error("Log not found or unauthorized");

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/dev-logs");
    revalidatePath(`/dashboard/dev-logs/${id}`);
    revalidatePath("/dashboard/archive-logs");

    return { success: true, data: updatedRecord as Log };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteLogAction(id: string): Promise<ActionResponse> {
  try {
    const user = await getAuthenticatedUser();
    if (!user) throw new Error("Unauthorized");

    const { env } = getCloudflareContext();
    const db = getDb(env);

    const [deletedRecord] = await db
      .delete(logs)
      .where(and(eq(logs.id, id), eq(logs.creatorId, user.id)))
      .returning();

    if (!deletedRecord) throw new Error("Log not found or unauthorized");

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/dev-logs");
    revalidatePath("/dashboard/archive-logs");

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getLogByIdAction(id: string): Promise<ActionResponse<Log>> {
  try {
    const user = await getAuthenticatedUser();
    if (!user) throw new Error("Unauthorized");

    const { env } = getCloudflareContext();
    const db = getDb(env);

    const [logRecord] = await db
      .select()
      .from(logs)
      .where(and(eq(logs.id, id), eq(logs.creatorId, user.id)));

    if (!logRecord) throw new Error("Log not found");

    return { success: true, data: logRecord as Log };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
