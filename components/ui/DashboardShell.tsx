'use client';

import { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Home, CreditCard, Bell, Calendar, FileText, MessageSquare, BarChart, Users, Settings, Search, BellDot } from 'lucide-react';

export default function DashboardShell({ children, isAdmin }: { children: ReactNode; isAdmin: boolean }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen bg-[#f8fafc]">
        {/* --- SIDEBAR --- */}
        <aside className="w-64 bg-white border-r border-slate-100 hidden md:flex flex-col sticky top-0 h-screen">
          <div className="p-6 flex items-center gap-3">
            <div className="w-8 h-8 bg-[#10b981] rounded-lg flex items-center justify-center text-white font-bold">H</div>
            <div>
              <h1 className="text-sm font-bold text-slate-800">HOA Portal</h1>
              <p className="text-[10px] text-slate-400">Community Management</p>
            </div>
          </div>
          
          <nav className="flex-1 px-4 space-y-1 mt-4">
            <NavItem icon={<Home size={18}/>} label="Dashboard" active />
            <NavItem icon={<CreditCard size={18}/>} label="Payments" />
            <NavItem icon={<Bell size={18}/>} label="Announcements" />
            <NavItem icon={<Calendar size={18}/>} label="Events" />
            <NavItem icon={<FileText size={18}/>} label="Documents" />
            <NavItem icon={<MessageSquare size={18}/>} label="Messages" />
          </nav>

          {isAdmin && (
            <div className="px-4 py-6 mt-6 border-t border-slate-50">
              <p className="px-3 mb-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Admin Tools</p>
              <NavItem icon={<BarChart size={18}/>} label="Admin Dashboard" />
              <NavItem icon={<Users size={18}/>} label="Manage Residents" />
              <NavItem icon={<Settings size={18}/>} label="Settings" />
            </div>
          )}
        </aside>

        {/* --- MAIN CONTENT --- */}
        <main className="flex-1">
          <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-10">
             <div className="relative w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input type="text" placeholder="Search..." className="w-full bg-slate-50 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-emerald-500/20" />
             </div>
             <div className="flex items-center gap-6">
                <BellDot size={20} className="text-slate-400 cursor-pointer hover:text-emerald-600" />
                <div className="flex items-center gap-3 border-l pl-6 border-slate-100">
                   <div className="text-right">
                      <p className="text-sm font-semibold text-slate-700">Carsido Joenel</p>
                      <p className="text-[10px] text-slate-400 font-medium">Admin</p>
                   </div>
                   <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold border-2 border-white shadow-sm">CJ</div>
                </div>
             </div>
          </header>
          
          <div className="p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </QueryClientProvider>
  );
}

function NavItem({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-200 ${active ? 'bg-[#ecfdf5] text-[#10b981] shadow-sm shadow-emerald-500/10' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}>
      {icon}
      <span className="text-sm font-medium">{label}</span>
      {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500" />}
    </div>
  );
}