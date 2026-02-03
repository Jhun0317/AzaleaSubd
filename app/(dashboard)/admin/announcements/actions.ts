"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function postAnnouncement(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  await prisma.announcement.create({
    data: {
      title,
      content,
    },
  });

  // This clears the cache so the resident sees the new post immediately
  revalidatePath("/"); 
}