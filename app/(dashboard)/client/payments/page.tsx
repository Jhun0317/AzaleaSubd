import { CreditCard, FileText, MessageSquare, Calendar, ChevronRight } from 'lucide-react';

// 1. THE MAIN PAGE (Only one export default allowed!)
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
           {/* REPLACED THE PLACEHOLDER WITH THE ACTUAL QUICKACTIONS COMPONENT */}
           <QuickActions />
           
           <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
             <h3 className="font-bold text-slate-800 mb-6">Recent Announcements</h3>
             <p className="text-slate-400 text-sm italic">No new announcements today.</p>
           </div>
        </div>
        
        <div className="space-y-8">
           <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
             <h3 className="font-bold text-slate-800 mb-4">Payment Status</h3>
             <div className="mb-4 p-4 bg-emerald-50 rounded-2xl">
                <p className="text-xs text-emerald-600 font-bold uppercase">Current Balance</p>
                <p className="text-2xl font-black text-emerald-700">₱0.00</p>
             </div>
             <button className="w-full py-3 bg-[#10b981] text-white rounded-xl font-bold hover:bg-emerald-600 transition-colors">
               Pay Now
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}

// 2. STAT CARD COMPONENT (Internal helper)
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

// 3. QUICK ACTIONS COMPONENT (Removed 'export default')
function QuickActions() {
  const actions = [
    {
      title: "Submit Payment",
      description: "Pay your monthly dues",
      icon: <CreditCard className="text-emerald-600" size={20} />,
      color: "bg-emerald-50",
      link: "/client/payments/new"
    },
    {
      title: "View Documents",
      description: "Access HOA files",
      icon: <FileText className="text-blue-600" size={20} />,
      color: "bg-blue-50",
      link: "/client/documents"
    },
    {
      title: "Send Message",
      description: "Contact admin",
      icon: <MessageSquare className="text-purple-600" size={20} />,
      color: "bg-purple-50",
      link: "/client/messages"
    },
    {
      title: "View Events",
      description: "Check calendar",
      icon: <Calendar className="text-orange-600" size={20} />,
      color: "bg-orange-50",
      link: "/client/events"
    }
  ];

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 mb-6">Quick Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <div 
            key={index}
            className="group flex items-center justify-between p-4 rounded-2xl border border-slate-50 hover:border-emerald-100 hover:bg-slate-50/50 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center transition-transform group-hover:scale-110`}>
                {action.icon}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-700">{action.title}</h4>
                <p className="text-xs text-slate-400">{action.description}</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
          </div>
        ))}
      </div>
    </div>
  );
}