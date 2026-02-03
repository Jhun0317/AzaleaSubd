"use server";

import axios from "axios";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

// ✅ 1. Added formData here so the function can "see" what you typed
export async function createPayment(formData: FormData) {
  if (!process.env.PAYMONGO_SECRET_KEY) {
    throw new Error("PAYMONGO_SECRET_KEY is missing");
  }

  // ✅ 2. Get the amount from the form (convert to cents for PayMongo)
  const rawAmount = formData.get("amount") ? Number(formData.get("amount")) : 500;
  const amountInCents = rawAmount * 100; 

  // 1️⃣ CREATE PAYMENT RECORD IN DATABASE
  const payment = await prisma.paymentSubmission.create({
    data: {
      amount: rawAmount, // Store the normal peso amount
      status: "PENDING",
      userId: 1, // Using your test resident ID
      referenceNumber: formData.get("referenceNumber") as string, 
    },
  });

  // 2️⃣ CREATE PAYMONGO CHECKOUT LINK
  const response = await axios.post(
    "https://api.paymongo.com/v1/links",
    {
      data: {
        attributes: {
          amount: amountInCents, // Use the cents version here
          description: "HOA Monthly Dues",
          remarks: `Payment for Ref: ${formData.get("referenceNumber")}`,
          reference_number: String(payment.id), // Use our database ID as the bridge
        },
      },
    },
    {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(process.env.PAYMONGO_SECRET_KEY + ":").toString("base64"),
        "Content-Type": "application/json",
      },
    }
  );

  const checkoutUrl = response.data.data.attributes.checkout_url;

  // 3️⃣ REDIRECT USER TO PAYMONGO
  redirect(checkoutUrl);
}
