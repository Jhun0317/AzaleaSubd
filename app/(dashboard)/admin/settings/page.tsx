"use client";

import { useState, useTransition } from "react";
import { CreditCard, Settings2, Megaphone, FileText, CheckCircle2, Save, Plus, Search, Bell } from "lucide-react";
import { updateSystemSettings } from "@/app/actions/settings"; 

export default function AdminSettings({ initialSettings }: { initialSettings: any }) {
  const [activeTab, setActiveTab] = useState("payments");
  const [isPending, startTransition] = useTransition();

  const tabs = [
    { id: "payments", label: "Payments", icon: <CreditCard size={18} /> },
    { id: "dues", label: "Dues", icon: <Settings2 size={18} /> },
    { id: "announce", label: "Announce", icon: <Megaphone size={18} /> },
    { id: "documents", label: "Documents", icon: <FileText size={18} /> },
  ];

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      await updateSystemSettings(formData);
      // You can replace this with a toast notification later
    });
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-8 py-4 bg-white border-b border-slate-100">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-lg text-sm outline-none focus:ring-1 focus:ring-slate-200"
          />
        </div>
        <Bell className="text-slate-400 cursor-pointer hover:text-slate-600" size={20} />
      </div>

      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Admin Settings</h1>
          <p className="text-sm text-slate-500 mt-1">Manage HOA settings, payments, and content</p>
        </div>

        {/* Tab Navigation Style from image_5825c4.png */}
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

        {/* Content Card */}
        <div className="bg-white rounded-xl border border-slate-100 p-8 shadow-sm min-h-[500px]">
          
          {/* PAYMENTS TAB - Match image_5825c4.png exactly */}
          {activeTab === "payments" && (
            <div className="space-y-6">
              <div className="border-b border-slate-50 pb-4">
                <h3 className="font-bold text-slate-800 text-lg">Pending Payment Verifications</h3>
                <p className="text-sm text-slate-400">Review and verify submitted payment receipts</p>
              </div>
              
              <div className="flex flex-col items-center justify-center py-24">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 size={24} />
                </div>
                <p className="text-slate-500 text-sm font-medium">All payments have been verified</p>
              </div>
            </div>
          )}

          {/* DUES TAB - Functional Form */}
          {activeTab === "dues" && (
            <form action={handleSubmit} className="max-w-4xl space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <h4 className="font-bold text-slate-800 uppercase text-[11px] tracking-wider">Dues Configuration</h4>
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-sm text-slate-500">Monthly Dues Amount (₱)</label>
                      <input 
                        name="monthlyDues" 
                        type="number" 
                        defaultValue={initialSettings?.monthlyDues ?? 300}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm" 
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm text-slate-500">Due Day (Day of Month)</label>
                      <input 
                        name="dueDay" 
                        type="number" 
                        defaultValue={initialSettings?.dueDay ?? 15}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm" 
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-slate-800 uppercase text-[11px] tracking-wider">Payment Methods</h4>
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-sm text-slate-500">GCash Number</label>
                      <input 
                        name="gcashNumber" 
                        type="text" 
                        defaultValue={initialSettings?.gcashNumber ?? "0912049237"}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono" 
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-50 flex justify-end">
                <button 
                  type="submit" 
                  disabled={isPending}
                  className="bg-emerald-600 text-white px-8 py-2.5 rounded-lg font-bold text-sm hover:bg-emerald-700 transition-all flex items-center gap-2"
                >
                  <Save size={18} /> {isPending ? "Saving..." : "Save Settings"}
                </button>
              </div>
            </form>
          )}

          {/* ANNOUNCE & DOCUMENTS - Empty states like screenshot */}
          {(activeTab === "announce" || activeTab === "documents") && (
             <div className="flex flex-col items-center justify-center py-32 text-slate-400">
               <Plus size={40} className="mb-4 opacity-20" />
               <p className="text-sm">No items found.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
