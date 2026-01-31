"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, CreditCard, Megaphone, Calendar, FileText, User, HeadphonesIcon } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  // 1. Define all your menu lists inside the component
  const menuItems = [
    { icon: <LayoutDashboard size={18} />, label: 'Dashboard', href: '/' },
    { icon: <CreditCard size={18} />, label: 'Payments', href: '/client/payments' },
    { icon: <Megaphone size={18} />, label: 'Announcements', href: '/announcements' },
    { icon: <Calendar size={18} />, label: 'Events', href: '/events' },
    { icon: <FileText size={18} />, label: 'Documents', href: '/documents' },
    { icon: <User size={18} />, label: 'Profile', href: '/profile' },
  ];

  const adminItems = [
    { icon: <User size={18} />, label: 'Manage Residents', href: '/admin/residents' },
    { icon: <CreditCard size={18} />, label: 'Review Payments', href: '/admin/payments' },
  ];

  return (
    <aside className="w-64 bg-white h-screen border-r border-slate-100 flex flex-col p-6 sticky top-0 z-[100]">
      {/* LOGO SECTION */}
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold">H</div>
        <h1 className="text-sm font-bold text-slate-800">HOA Portal</h1>
      </div>

      {/* MAIN NAVIGATION */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive = item.href === '/' 
            ? pathname === '/' 
            : pathname?.startsWith(item.href) ?? false;

          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? 'bg-emerald-50 text-emerald-600 font-bold' 
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}

        {/* ADMIN TOOLS SECTION */}
        <div className="mt-8 pt-8 border-t border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-4">Admin Tools</p>
          {adminItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive ? 'bg-slate-800 text-white font-bold' : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* FOOTER HELP */}
      <div className="mt-auto bg-slate-50 p-4 rounded-2xl">
        <button className="flex items-center gap-2 text-slate-700 hover:text-emerald-600 w-full">
          <HeadphonesIcon size={16} />
          <span className="text-xs font-bold">Contact Admin</span>
        </button>
      </div>
    </aside>
  );
}
