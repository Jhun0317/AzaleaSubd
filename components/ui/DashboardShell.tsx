'use client';

import { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Home, CreditCard, Bell, Calendar, FileText, MessageSquare, BarChart, Users, Settings } from 'lucide-react';

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
      <div className="flex min-h-screen bg-slate-50">
        {/* --- SIDEBAR --- */}
        <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
          <div className="p-6">
            <h1 className="text-xl font-bold text-emerald-600">HOA Portal</h1>
            <p className="text-xs text-slate-500">Community Management</p>
          </div>
          
          <nav className="flex-1 px-4 space-y-1">
            <NavItem icon={<Home size={18}/>} label="Dashboard" active />
            <NavItem icon={<CreditCard size={18}/>} label="Payments" />
            <NavItem icon={<Bell size={18}/>} label="Announcements" />
            {/* Add more NavItems here */}
          </nav>

          {isAdmin && (
            <div className="px-4 py-4 border-t border-slate-100">
              <p className="px-2 mb-2 text-xs font-semibold text-slate-400 uppercase">Admin Tools</p>
              <NavItem icon={<BarChart size={18}/>} label="Admin Dashboard" />
              <NavItem icon={<Users size={18}/>} label="Manage Residents" />
            </div>
          )}
        </aside>

        {/* --- MAIN CONTENT --- */}
        <main className="flex-1 flex flex-col">
          <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
             <div className="text-slate-500 italic">Search...</div>
             <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Carsido Joenel</span>
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 text-xs">CJ</div>
             </div>
          </header>
          
          <div className="p-8">
            {children} {/* This is where "Welcome back, Carsido!" will live */}
          </div>
        </main>
      </div>
    </QueryClientProvider>
  );
}

// Simple helper component for navigation links
function NavItem({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
  return (
    <div className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${active ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'}`}>
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}