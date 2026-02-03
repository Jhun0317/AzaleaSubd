"use client";

import { useState, useRef, useTransition } from "react"; 
import { CreditCard, Settings2, Megaphone, FileText, CheckCircle2, Save, Plus, Search, Bell } from "lucide-react";
import { updateSystemSettings } from "@/app/actions/settings"; 

// Only ONE export default function is allowed
export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("dues"); 
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const tabs = [
    { id: "payments", label: "Payments", icon: <CreditCard size={18} /> },
    { id: "dues", label: "Dues", icon: <Settings2 size={18} /> },
    { id: "announce", label: "Announce", icon: <Megaphone size={18} /> },
    { id: "documents", label: "Documents", icon: <FileText size={18} /> },
  ];

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      // This sends the data to your database
      await updateSystemSettings(formData);
      
      // This clears the boxes so they are blank for next time
      formRef.current?.reset(); 
      
      alert("Settings pushed to Payments Tab!");
    });
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-4 bg-white border-b border-slate-100">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-lg text-sm outline-none" />
        </div>
        <Bell className="text-slate-400" size={20} />
      </div>

      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Admin Settings</h1>
          <p className="text-sm text-slate-500 mt-1">Manage HOA settings, payments, and content</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-6 border-b border-slate-100">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all relative ${
                activeTab === tab.id
                  ? "text-slate-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-slate-900"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-slate-100 p-8 shadow-sm min-h-[500px]">
          {/* DUES TAB */}
          {activeTab === "dues" && (
            <form ref={formRef} action={handleSubmit} className="max-w-4xl space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <h4 className="font-bold text-slate-800 uppercase text-[11px] tracking-wider">Dues Configuration</h4>
                  <div className="space-y-1.5">
                    <label className="text-sm text-slate-500">Monthly Dues Amount (₱)</label>
                    <input 
                      name="monthlyDues" 
                      type="number" 
                      placeholder="Enter amount (e.g. 500)" 
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm" 
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-slate-800 uppercase text-[11px] tracking-wider">Payment Methods</h4>
                  <div className="space-y-1.5">
                    <label className="text-sm text-slate-500">GCash Number</label>
                    <input 
                      name="gcashNumber" 
                      type="text" 
                      placeholder="Enter new number" 
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono" 
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-50 flex justify-end">
                <button 
                  type="submit" 
                  disabled={isPending}
                  className="bg-emerald-600 text-white px-8 py-2.5 rounded-lg font-bold text-sm hover:bg-emerald-700 disabled:opacity-50 flex items-center gap-2 transition-all"
                >
                  <Save size={18} /> 
                  {isPending ? "Syncing..." : "Save & Push to Payments"}
                </button>
              </div>
            </form>
          )}

          {/* PAYMENTS TAB (Placeholder) */}
          {activeTab === "payments" && (
             <div className="flex flex-col items-center justify-center py-24 text-slate-400">
                <CheckCircle2 size={48} className="mb-4 text-emerald-500 opacity-20" />
                <p>All payments verified.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
