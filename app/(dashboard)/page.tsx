import { redirect } from "next/navigation";

export default function DashboardPage() {
  // Base44 style: explicit redirect to the primary functional tab
  redirect("/client/payments");

  // We add an actual return element so the compiler 
  // generates the manifest file properly.
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Redirecting to payments...</p>
    </div>
  );
}