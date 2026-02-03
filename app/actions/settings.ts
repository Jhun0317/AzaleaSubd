"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateSystemSettings(formData: FormData) {
  // Use "Number()" and a fallback to avoid "NaN" errors if the input is blank
  const monthlyDues = formData.get("monthlyDues") ? Number(formData.get("monthlyDues")) : undefined;
  const dueDay = formData.get("dueDay") ? Number(formData.get("dueDay")) : undefined;
  const gcashNumber = (formData.get("gcashNumber") as string) || undefined;
  const bankDetails = (formData.get("bankDetails") as string) || undefined;

  // Create a clean data object that only includes things you actually typed
  const updateData: any = {};
  if (monthlyDues !== undefined) updateData.monthlyDues = monthlyDues;
  if (dueDay !== undefined) updateData.dueDay = dueDay;
  if (gcashNumber !== undefined) updateData.gcashNumber = gcashNumber;
  if (bankDetails !== undefined) updateData.bankDetails = bankDetails;

  try {
    await prisma.systemSettings.upsert({
      where: { id: 1 },
      update: updateData,
      // If creating for the first time, provide defaults if fields are missing
      create: { 
        id: 1, 
        monthlyDues: monthlyDues ?? 300, 
        dueDay: dueDay ?? 15, 
        gcashNumber: gcashNumber ?? "09123456789",
        bankDetails: bankDetails ?? ""
      },
    });

    revalidatePath("/"); 
  } catch (error) {
    console.error("Failed to update settings:", error);
    throw new Error("Failed to save settings");
  }
}
