'use client';

import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DashboardShell from "@/components/ui/DashboardShell";

export default function DashboardClientLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <DashboardShell isAdmin={false}>
        {children}
      </DashboardShell>
    </QueryClientProvider>
  );
}
