"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// 1. Function to CREATE an announcement
export async function postAnnouncement(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  await prisma.announcement.create({
    data: {
      title,
      content,
      priority: "normal",
    },
  });

  // Refresh paths so the new post shows up
  revalidatePath("/(dashboard)/client/dashboard");
  revalidatePath("/(dashboard)/client/announcements");
  revalidatePath("/(dashboard)/admin/announcements");
}

// 2. Function to DELETE an announcement (Must be OUTSIDE the first function)
export async function deleteAnnouncement(id: string) {
  await prisma.announcement.delete({
    where: { id },
  });

  // Refresh paths so the post disappears
  revalidatePath("/(dashboard)/client/dashboard");
  revalidatePath("/(dashboard)/client/announcements");
  revalidatePath("/(dashboard)/admin/announcements");
}
