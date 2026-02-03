"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// --- Action 1: For Residents to Submit ---
export async function submitPayment(formData: FormData) {
  const referenceNumber = formData.get("referenceNumber") as string;
  
  if (!referenceNumber || referenceNumber.length < 10) {
    return;
  }

  try {
    await prisma.paymentSubmission.create({
      data: {
        referenceNumber,
        status: "PENDING",
        amount: 300, 
        userId: 1, 
      },
    });

    revalidatePath("/client/payments");
  } catch (error) {
    console.error("Payment submission failed:", error);
    return;
  }

  redirect("/client/payments?success=true");
}

// --- Action 2: For Admins to Approve/Reject ---
export async function updatePaymentStatus(id: number, status: "APPROVED" | "REJECTED") {
  try {
    await prisma.paymentSubmission.update({
      where: { id },
      data: { status },
    });
    
    // Refresh both paths so the Admin sees the list update 
    // and the Client sees their history update
    revalidatePath("/admin/payments");
    revalidatePath("/client/payments");
  } catch (error) {
    console.error("Status update failed:", error);
  }
}
