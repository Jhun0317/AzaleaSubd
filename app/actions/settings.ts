"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/** * 1. UPDATED: SYSTEM SETTINGS 
 * This handles your GCash, Dues, and Bank Details
 */
export async function updateSystemSettings(formData: FormData) {
  const monthlyDues = formData.get("monthlyDues") ? Number(formData.get("monthlyDues")) : undefined;
  const dueDay = formData.get("dueDay") ? Number(formData.get("dueDay")) : undefined;
  const gcashNumber = (formData.get("gcashNumber") as string) || undefined;
  const bankDetails = (formData.get("bankDetails") as string) || undefined;

  const updateData: any = {};
  if (monthlyDues !== undefined) updateData.monthlyDues = monthlyDues;
  if (dueDay !== undefined) updateData.dueDay = dueDay;
  if (gcashNumber !== undefined) updateData.gcashNumber = gcashNumber;
  if (bankDetails !== undefined) updateData.bankDetails = bankDetails;

  try {
    await prisma.systemSettings.upsert({
      where: { id: 1 },
      update: updateData,
      create: { 
        id: 1, 
        monthlyDues: monthlyDues ?? 300, 
        dueDay: dueDay ?? 15, 
        gcashNumber: gcashNumber ?? "09123456789",
        bankDetails: bankDetails ?? ""
      },
    });

    revalidatePath("/"); 
    return { success: true };
  } catch (error) {
    console.error("Failed to update settings:", error);
    throw new Error("Failed to save settings");
  }
}

/** * 2. NEW: ANNOUNCEMENTS
 * This allows you to post news from the Admin Panel
 */
export async function createAnnouncement(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const priority = (formData.get("priority") as string) || "normal";

  if (!title || !content) {
    throw new Error("Title and content are required");
  }

  try {
    await prisma.announcement.create({
      data: {
        title,
        content,
        priority,
      },
    });

    revalidatePath("/"); // Update resident dashboard
    return { success: true };
  } catch (error) {
    console.error("Failed to post announcement:", error);
    throw new Error("Could not post announcement");
  }
}
