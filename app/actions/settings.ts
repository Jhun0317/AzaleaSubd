"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateSystemSettings(formData: FormData) {
  const monthlyDues = parseFloat(formData.get("monthlyDues") as string);
  const dueDay = parseInt(formData.get("dueDay") as string);
  const gcashNumber = formData.get("gcashNumber") as string;
  const bankDetails = formData.get("bankDetails") as string;

  try {
    await prisma.systemSettings.upsert({
      where: { id: 1 },
      update: {
        monthlyDues,
        dueDay,
        gcashNumber,
        bankDetails,
      },
      create: {
        id: 1,
        monthlyDues,
        dueDay,
        gcashNumber,
        bankDetails,
      },
    });

    // This is crucial: it forces the Payments page to refresh its data
    revalidatePath("/"); 
    return { success: true };
  } catch (error) {
    console.error("Failed to update settings:", error);
    return { success: false };
  }
}
