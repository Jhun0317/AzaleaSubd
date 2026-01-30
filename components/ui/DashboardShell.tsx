'use client';

import { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function DashboardShell({
  children,
  isAdmin,
}: {
  children: ReactNode;
  isAdmin: boolean;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {/* ⬇️ KEEP ALL YOUR EXISTING DASHBOARD JSX BELOW */}
      {children}
    </QueryClientProvider>
  );
}
