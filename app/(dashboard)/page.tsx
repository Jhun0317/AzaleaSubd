import { Bell, Search, Wallet, FileText, MessageSquare, Calendar, ChevronRight } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* 1. TOP NAVBAR (Search, Notifications, User) */}
      <header className="flex items-center justify-between px-8 py-4 bg-white/50 backdrop-blur-md sticky top-0 z-10">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/20" />
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-slate-100 rounded-full text-slate-600 relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="flex items-center gap-3 border-l pl-4 border-slate-200">
            <div className="text-right">
              <p className="text-sm font-bold text-slate-800 leading-none">Carsido Joenel</p>
              <p className="text-[10px] text-slate-500 uppercase font-bold">Admin</p>
            </div>
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">CJ</div>
          </div>
        </div>
      </header>

      <main className="p-8 space-y-8">
        {/* 2. WELCOME BANNER */}
        <section className="bg-emerald-600 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-xl shadow-emerald-900/10">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2">Welcome back, Carsido! 👋</h2>
            <p className="text-emerald-50 opacity-90">Stay updated with your community. Here's what's happening today.</p>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        </section>

        {/* 3. MAIN GRID (Left Column: Quick Actions & News | Right Column: Status) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT & CENTER COLUMNS */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-4 gap-4">
              {['Unread Messages', 'Upcoming Events', 'Announcements', 'Payments Made'].map((label, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-xs font-bold text-slate-400 uppercase mb-2">{label}</p>
                  <p className="text-3xl font-black text-slate-800">{i === 2 ? '5' : '0'}</p>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100">
               <h3 className="font-bold text-slate-800 mb-6">Quick Actions</h3>
               <div className="grid grid-cols-2 gap-4">
                 <button className="flex items-center gap-4 p-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all text-left">
                    <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white"><Wallet /></div>
                    <div><p className="font-bold text-slate-800 text-sm">Submit Payment</p><p className="text-xs text-slate-400">Pay your monthly dues</p></div>
                 </button>
                 <button className="flex items-center gap-4 p-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all text-left">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white"><FileText /></div>
                    <div><p className="font-bold text-slate-800 text-sm">View Documents</p><p className="text-xs text-slate-400">Access HOA files</p></div>
                 </button>
               </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-8">
            {/* Payment Status Card */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-800">Payment Status</h3>
                <button className="text-emerald-600 text-xs font-bold flex items-center">View History <ChevronRight size={14}/></button>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-6">
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Current Bill</p>
                <p className="text-2xl font-black text-slate-800">₱300.00</p>
              </div>
              <button className="w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200">Pay Now</button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
