import { prisma } from "@/lib/prisma";
import { Check, X, Clock } from 'lucide-react';
// Import the new action we just made
import { updatePaymentStatus } from "@/app/actions/payments";

export const dynamic = "force-dynamic";

export default async function ReviewPayments() {
  // 1. Fetch real "PENDING" payments from the database
  const payments = await prisma.paymentSubmission.findMany({
    where: { status: "PENDING" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-black text-slate-800">Review Payments</h1>
        <p className="text-slate-500 text-sm">Verify GCash submissions and update resident accounts.</p>
      </div>

      <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
              <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ref Number</th>
              <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {payments.map((pay) => (
              <tr key={pay.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-5 text-sm text-slate-600">
                  {pay.createdAt.toLocaleDateString()}
                </td>
                <td className="px-6 py-5 font-mono text-xs font-bold text-slate-800">
                  {pay.referenceNumber}
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex justify-end gap-2">
                    {/* Form for Approval */}
                    <form action={async () => {
                      "use server";
                      await updatePaymentStatus(pay.id, "APPROVED");
                    }}>
                      <button 
                        type="submit"
                        className="p-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-500 hover:text-white transition-all"
                      >
                        <Check size={18} />
                      </button>
                    </form>

                    {/* Form for Rejection */}
                    <form action={async () => {
                      "use server";
                      await updatePaymentStatus(pay.id, "REJECTED");
                    }}>
                      <button 
                        type="submit"
                        className="p-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-500 hover:text-white transition-all"
                      >
                        <X size={18} />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {payments.length === 0 && (
          <div className="p-16 text-center">
            <Clock className="mx-auto text-slate-200 mb-4" size={48} />
            <p className="text-slate-400 italic">No pending payments to review.</p>
          </div>
        )}
      </div>
    </div>
  );
}
