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
      priority: "normal",
    },
  });

  revalidatePath("/(dashboard)/admin/announcements");
  revalidatePath("/(dashboard)/client/dashboard");
  revalidatePath("/(dashboard)/client/announcements");
}

export async function deleteAnnouncement(id: string) {
  await prisma.announcement.delete({
    where: { id: id },
  });

  revalidatePath("/(dashboard)/admin/announcements");
  revalidatePath("/(dashboard)/client/dashboard");
  revalidatePath("/(dashboard)/client/announcements");
}
