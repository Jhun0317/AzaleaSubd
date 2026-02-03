"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitManualPayment(formData: FormData) {
  const amount = Number(formData.get("amount"));
  const refNumber = formData.get("refNumber") as string;
  
  // We use the ID 1 for our demo resident for now
  await prisma.paymentSubmission.create({
    data: {
      amount: amount,
      referenceNumber: refNumber,
      status: "PENDING", // Admin will manually check this later
      userId: 1, 
    },
  });

  revalidatePath("/admin/settings"); // Notify admin that a new payment is waiting
}
