export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* WELCOME BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#10b981] to-[#059669] rounded-[2rem] p-10 text-white shadow-lg shadow-emerald-500/20">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Carsido! 👋</h1>
          <p className="text-emerald-50 opacity-90">Stay updated with your community. Here's what's happening today.</p>
        </div>
        <div className="absolute top-[-20%] right-[-5%] w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard label="Unread Messages" value="0" color="bg-orange-500" />
        <StatCard label="Upcoming Events" value="0" color="bg-blue-500" />
        <StatCard label="Announcements" value="5" color="bg-emerald-500" />
        <StatCard label="Payments Made" value="0" color="bg-rose-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           {/* Quick Actions and Recent Announcements components would go here */}
           <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
             <h3 className="font-bold text-slate-800 mb-6">Quick Actions</h3>
             {/* Action buttons... */}
           </div>
        </div>
        
        <div className="space-y-8">
           {/* Payment Status and Upcoming Events sidebars */}
           <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
             <h3 className="font-bold text-slate-800 mb-4">Payment Status</h3>
             <button className="w-full py-3 bg-[#10b981] text-white rounded-xl font-bold hover:bg-emerald-600 transition-colors">
               Pay Now
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string, value: string, color: string }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-3xl font-black text-slate-800">{value}</p>
      </div>
      <div className={`w-12 h-12 ${color} rounded-2xl opacity-10 flex items-center justify-center`} />
    </div>
  );
}