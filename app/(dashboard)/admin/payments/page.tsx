"use client";
import { useState } from 'react';
import { Check, X, Eye, Clock } from 'lucide-react';
// 1. Import the action we created
import { approvePayment } from "@/app/actions/payment-actions";

// 2. THIS LINE IS MANDATORY:
export default function ReviewPayments() {
  
  // Sample Data (In a real app, this comes from the database)
  const [payments, setPayments] = useState([
    { id: "user_1", resident: "Maria Clara", amount: 300, ref: "1234567890123", status: "Pending", date: "Jan 30, 2026" },
    { id: "user_2", resident: "Juan Dela Cruz", amount: 300, ref: "9876543210987", status: "Pending", date: "Jan 29, 2026" },
  ]);

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
              <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Resident</th>
              <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ref Number</th>
              <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {payments.map((pay) => (
              <tr key={pay.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-5">
                  <p className="font-bold text-slate-800">{pay.resident}</p>
                </td>
                <td className="px-6 py-5 font-mono text-xs text-slate-500">
                  {pay.ref}
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={async () => {
                        const confirmApprove = confirm(`Approve payment for ${pay.resident}?`);
                        if (confirmApprove) {
                          const result = await approvePayment(pay.id);
                          if (result.success) {
                            alert("Payment Verified! Resident status updated.");
                          }
                        }
                      }}
                      className="p-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-500 hover:text-white transition-all"
                    >
                      <Check size={18} />
                    </button>
                    <button className="p-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-500 hover:text-white transition-all">
                      <X size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
