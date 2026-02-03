"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function submitPayment(formData: FormData) {
  const referenceNumber = formData.get("referenceNumber") as string;
  
  if (!referenceNumber || referenceNumber.length < 10) {
    // Instead of throwing an error that crashes the build, 
    // we can handle this with a redirect or just return
    return;
  }

  try {
    await prisma.paymentSubmission.create({
      data: {
        referenceNumber,
        status: "PENDING",
        amount: 300, // You can fetch the real dues here later
        userId: 1, 
      },
    });

    revalidatePath("/client/payments");
  } catch (error) {
    console.error("Payment submission failed:", error);
    // Returning nothing (void) satisfies the TypeScript error
    return;
  }

  // Optional: Redirect them to a success page or back home
  redirect("/client/payments?success=true");
}
