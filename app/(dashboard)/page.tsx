import { Bell, Search, Wallet, FileText, Calendar, ChevronRight, Megaphone } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* HEADER: Search and Profile */}
      <header className="flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/20" />
        </div>
        <div className="flex items-center gap-6">
          <button className="relative p-2 text-slate-400 hover:bg-slate-100 rounded-full">
            <Bell size={22} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-bold text-slate-800">Carsido Joenel</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Admin</p>
            </div>
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold italic">CJ</div>
          </div>
        </div>
      </header>

      <main className="p-8 space-y-8">
        {/* WELCOME BANNER */}
        <section className="bg-emerald-500 rounded-[2rem] p-10 text-white shadow-lg shadow-emerald-200 relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-3xl font-black mb-2">Welcome back, Carsido! 👋</h1>
            <p className="opacity-90 font-medium">Stay updated with your community. Here's what's happening today.</p>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        </section>

        {/* QUICK ACTIONS SECTION */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Action 1: Submit Payment */}
            <Link href="/client/payments" className="block">
              <button className="w-full flex items-center gap-4 p-5 border border-slate-100 rounded-2xl hover:bg-emerald-50 hover:border-emerald-100 transition-all text-left group">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Wallet />
                </div>
                <div>
                  <p className="font-bold text-slate-800">Submit Payment</p>
                  <p className="text-xs text-slate-400">Pay your monthly dues</p>
                </div>
                <ChevronRight size={16} className="ml-auto text-slate-300 group-hover:text-emerald-500" />
              </button>
            </Link>

            {/* Action 2: View Documents */}
            <Link href="/documents" className="block">
              <button className="w-full flex items-center gap-4 p-5 border border-slate-100 rounded-2xl hover:bg-blue-50 hover:border-blue-100 transition-all text-left group">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileText />
                </div>
                <div>
                  <p className="font-bold text-slate-800">View Documents</p>
                  <p className="text-xs text-slate-400">Access HOA files</p>
                </div>
                <ChevronRight size={16} className="ml-auto text-slate-300 group-hover:text-blue-500" />
              </button>
            </Link>
          </div>
        </div>

        {/* STATS ROW & OTHER CONTENT WOULD CONTINUE HERE */}
      </main>
    </div>
  );
}
