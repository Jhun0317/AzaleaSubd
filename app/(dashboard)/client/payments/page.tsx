// app/(dashboard)/client/payments/page.tsx
import { prisma } from "@/lib/prisma";
import { Info, Upload } from 'lucide-react';
// We move the Copy Button to its own small component or use a simpler approach
import CopyButton from "@/components/CopyButton"; 

export default async function PaymentsPage() {
  // 1. Fetch data on the Server
  const settings = await prisma.systemSettings.findUnique({
    where: { id: 1 }
  });

  const activeGcash = settings?.gcashNumber || "0912049237";
  const activeDues = settings?.monthlyDues || 300;

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-black text-slate-800">Monthly Dues</h1>
        <p className="text-slate-500">View and settle your community payments.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Total Amount Due</p>
            {/* 2. Use the dynamic dues from database */}
            <p className="text-4xl font-black text-slate-800 mb-6">₱{activeDues}.00</p>
            
            <div className="bg-blue-50 p-4 rounded-2xl flex gap-3 items-start border border-blue-100">
              <Info className="text-blue-500 shrink-0" size={18} />
              <p className="text-xs text-blue-700 leading-relaxed">
                Please pay exactly the amount shown. Payments are verified by the Admin within 24 hours.
              </p>
            </div>
          </div>

          <div className="bg-emerald-500 p-8 rounded-[2.5rem] text-white shadow-lg shadow-emerald-100">
            <h3 className="font-bold mb-4">Pay via GCash</h3>
            <p className="text-sm opacity-90 mb-6">Send payment to the official HOA GCash number:</p>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between border border-white/20">
              <div>
                <p className="text-[10px] font-bold uppercase opacity-70">GCash Account Number</p>
                {/* 3. Use the dynamic number from database */}
                <p className="text-xl font-mono font-bold tracking-tighter">{activeGcash}</p>
              </div>
              
              {/* This needs to be a separate Client Component for the clipboard logic */}
              <CopyButton textToCopy={activeGcash} />
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col">
          <h3 className="font-bold text-slate-800 mb-6">Submit Proof of Payment</h3>
          <div className="space-y-4 flex-1">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase block mb-2 px-1">Reference Number</label>
              <input 
                type="text" 
                placeholder="Enter the 13-digit GCash Ref #" 
                className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 text-sm"
              />
            </div>

            <div className="border-2 border-dashed border-slate-100 rounded-3xl p-8 text-center hover:border-emerald-200 transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-all">
                <Upload size={20} />
              </div>
              <p className="text-xs font-bold text-slate-500">Upload Receipt Screenshot</p>
            </div>
          </div>

          <button className="w-full py-5 bg-slate-800 text-white font-bold rounded-2xl hover:bg-slate-900 transition-all mt-8">
            Confirm Payment Submission
          </button>
        </div>
      </div>
    </div>
  );
}
