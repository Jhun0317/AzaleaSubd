"use client";

import { useState, useTransition } from "react"; // Added useTransition
import { CreditCard, Settings2, Megaphone, FileText, CheckCircle2, Save, Plus } from "lucide-react";
import { updateSystemSettings } from "@/app/actions/settings"; 

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("payments");
  const [isPending, startTransition] = useTransition(); // Tracks the saving state

  // Local handler to bridge the form and the server action
  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      await updateSystemSettings(formData);
      alert("Settings updated successfully!"); // Feedback for the admin
    });
  }

  // ... (keep your tabs array the same)

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      {/* ... (header and tabs code remains the same) */}

      <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm min-h-[400px]">
        
        {/* PAYMENTS TAB code remains the same */}

        {/* DUES TAB - Updated with local handler */}
        {activeTab === "dues" && (
          <form action={handleSubmit} className="space-y-8">
            <section>
              <h3 className="font-bold text-slate-800 mb-4">Dues Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Monthly Dues Amount (₱)</label>
                  <input 
                    name="monthlyDues" 
                    type="number" 
                    defaultValue="300" 
                    className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Due Day (Day of Month)</label>
                  <input 
                    name="dueDay" 
                    type="number" 
                    defaultValue="15" 
                    className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl" 
                  />
                </div>
              </div>
            </section>
            
            <section className="pt-8 border-t border-slate-50">
              <h3 className="font-bold text-slate-800 mb-4">Payment Methods</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">GCash Number</label>
                  <input 
                    name="gcashNumber" 
                    type="text" 
                    defaultValue="0912049237" 
                    className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl font-mono" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Bank Details</label>
                  <textarea 
                    name="bankDetails" 
                    rows={3} 
                    defaultValue={"BDO Savings Account\nAccount Name: HOA Association\nAccount Number: 1234-5678-9012"} 
                    className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl" 
                  />
                </div>
              </div>
            </section>

            <div className="flex justify-end pt-4">
              <button 
                type="submit" 
                disabled={isPending}
                className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-emerald-700 transition-colors disabled:opacity-50"
              >
                <Save size={18} /> 
                {isPending ? "Saving..." : "Save Settings"}
              </button>
            </div>
          </form>
        )}

        {/* ANNOUNCE and DOCUMENTS TAB code remains the same */}
      </div>
    </div>
  );
}
