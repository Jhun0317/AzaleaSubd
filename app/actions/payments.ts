"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitPayment(formData: FormData) {
  const referenceNumber = formData.get("referenceNumber") as string;
  // Note: In a full setup, you'd also handle the file upload URL here
  
  if (!referenceNumber || referenceNumber.length < 10) {
    throw new Error("Please enter a valid reference number.");
  }

  try {
    await prisma.paymentSubmission.create({
      data: {
        referenceNumber,
        status: "PENDING",
        amount: 77, // You can fetch the current dues here too
        userId: 1, // Replace with actual logged-in user ID later
      },
    });

    revalidatePath("/admin/payments"); // Updates the Admin's review list
    return { success: true };
  } catch (error) {
    console.error("Payment submission failed:", error);
    return { success: false };
  }
}