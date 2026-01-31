"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateGcashSettings(newNumber: string) {
  try {
    // We use 'upsert' to update the record if it exists, or create it if it doesn't
    // @ts-ignore
    await prisma.globalSettings.upsert({
      where: { id: "system_settings" },
      update: { gcashNumber: newNumber },
      create: { id: "system_settings", gcashNumber: newNumber },
    });

    // This clears the cache so the new number shows up everywhere instantly
    revalidatePath("/admin/settings");
    revalidatePath("/"); // Update dashboard if needed
    
    return { success: true };
  } catch (error) {
    console.error("Settings Error:", error);
    return { success: false, error: "Database error" };
  }
}