"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function approvePayment(residentId: string) {
  try {
    // 1. Update the resident's status in the database
    await prisma.user.update({
      where: { id: residentId },
      data: { paymentStatus: "PAID" },
    });

    // 2. Refresh the pages so the "UNPAID" red text turns into "PAID" green text
    revalidatePath("/");
    revalidatePath("/admin/payments");
    
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to approve payment" };
  }
}