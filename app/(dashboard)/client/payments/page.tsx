import { prisma } from "@/lib/prisma";

export default async function PaymentsPage() {
  // Fetch the actual record from the DB
  const settings = await prisma.systemSettings.findUnique({
    where: { id: 1 },
  });

  // Use the DB values, otherwise fall back to the old defaults
  const displayDues = settings?.monthlyDues ?? 300;
  const displayGcash = settings?.gcashNumber ?? "09123456789";

  return (
    // ... inside your JSX:
    <p className="text-4xl font-black">₱{displayDues}.00</p>
    // ... and for GCash:
    <p className="text-xl font-mono">{displayGcash}</p>
  );
}
