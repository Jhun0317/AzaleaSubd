"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateSystemSettings(formData: FormData) {
  const monthlyDues = parseFloat(formData.get("monthlyDues") as string);
  const dueDay = parseInt(formData.get("dueDay") as string);
  const gcashNumber = formData.get("gcashNumber") as string;
  const bankDetails = formData.get("bankDetails") as string;

  await prisma.systemSettings.upsert({
    where: { id: 1 },
    update: { monthlyDues, dueDay, gcashNumber, bankDetails },
    create: { id: 1, monthlyDues, dueDay, gcashNumber, bankDetails },
  });

  // This clears the cache so the Payments page shows the new data immediately
  revalidatePath("/"); 
}