import { submitPayment } from "@/app/actions/payments";
import { prisma } from "@/lib/prisma";
import { Info, Upload, CheckCircle2 } from 'lucide-react';
import CopyButton from "@/components/CopyButton"; 

export const dynamic = "force-dynamic";

// Added searchParams to detect the ?success=true redirect
export default async function PaymentsPage({ searchParams }: { searchParams: { success?: string } }) {
  // 1. Fetch settings and history
  const settings = await prisma.systemSettings.findUnique({
    where: { id: 1 }
  });

  const submissions = await prisma.paymentSubmission.findMany({
    where: { userId: 1 }, // Later this will use the real logged-in user
    orderBy: { createdAt: 'desc' },
    take: 5
  });

  const activeGcash = settings?.gcashNumber || "0912049237";
  const activeDues = settings?.monthlyDues || 300;

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      {/* 1. Success Banner */}
      {searchParams.success === 'true' && (
        <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="text-emerald-500" size={20} />
          <p className="text-sm font-medium text-emerald-800">
            Payment submitted successfully! Admin will verify your reference number shortly.
          </p>
        </div>
      )}

      {/* 2. Header Section */}
      <div className="flex flex-col items-center text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Monthly Dues</h1>
        <p className="text-slate-500">View and settle your community payments.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* 3. Amount Due Card */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Total Amount Due</p>
            <p className="text-4xl font-black text-slate-800 mb-6">₱{activeDues}.00</p>
            
            <div className="bg-blue-50 p-4 rounded-2xl flex gap-3 items-start border border-blue-100">
              <Info className="text-blue-500 shrink-0 mt-0.5" size={18} />
              <p className="text-xs text-blue-700 leading-relaxed">
                Please pay exactly the amount shown. Payments are verified by the Admin within 24 hours.
              </p>
            </div>
          </div>

          {/* 4. GCash Card */}
          <div className="bg-emerald-500 p-8 rounded-[2.5rem] text-white shadow-lg shadow-emerald-100">
            <h3 className="font-bold mb-4 text-lg">Pay via GCash</h3>
            <p className="text-sm opacity-90 mb-6">Send payment to the official HOA GCash number:</p>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between border border-white/20">
              <div>
                <p className="text-[10px] font-bold uppercase opacity-70">GCash Account Number</p>
                <p className="text-xl font-mono font-bold tracking-tighter">{activeGcash}</p>
              </div>
              <CopyButton textToCopy={activeGcash} />
            </div>
          </div>
        </div>

        {/* 5. Payment Submission Form */}
        <form action={submitPayment} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
            <h3 className="font-bold text-slate-800 mb-4">Submit Proof of Payment</h3>
            <div className="w-full space-y-4">
               <div className="text-left space-y-1">
                 <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Reference Number</label>
                 <input 
                   name="referenceNumber" 
                   type="text" 
                   required
                   placeholder="Enter the 13-digit GCash Ref #" 
                   className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-sm" 
                 />
               </div>
               
               <div className="border-2 border-dashed border-slate-100 rounded-[2rem] p-10 flex flex-col items-center gap-3 cursor-pointer hover:bg-slate-50 transition-colors">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                    <Upload size={20} />
                  </div>
                  <p className="text-xs font-medium text-slate-500">Upload Receipt Screenshot</p>
               </div>

               <button type="submit" className="w-full bg-[#1e293b] text-white py-4 rounded-2xl font-bold text-sm shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all mt-4">
                 Confirm Payment Submission
               </button>
            </div>
        </form>
      </div>

      {/* 6. Submission History Table */}
      <div className="mt-12 bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-6 text-lg">Recent Submissions</h3>
        <div className="space-y-4">
          {submissions.map((sub) => (
            <div key={sub.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Ref: {sub.referenceNumber}</p>
                <p className="text-[10px] text-slate-500">{sub.createdAt.toLocaleDateString()}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                sub.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' :
                sub.status === 'REJECTED' ? 'bg-rose-100 text-rose-700' :
                'bg-amber-100 text-amber-700'
              }`}>
                {sub.status}
              </span>
            </div>
          ))}
          {submissions.length === 0 && (
            <p className="text-center text-slate-400 text-sm italic">No recent payment submissions found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
