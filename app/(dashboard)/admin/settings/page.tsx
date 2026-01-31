"use client";

import { Smartphone, Save } from "lucide-react";

export default function AdminSettings() {
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-2xl font-bold text-slate-900">System Settings</h1>
        <p className="text-sm text-slate-500 mt-1">
          Configure global portal details and payment information.
        </p>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-2xl bg-white rounded-[40px] border border-slate-100 p-8 md:p-12 shadow-sm">
          {/* Payment Details Section */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
              <Smartphone size={22} />
            </div>
            <h2 className="font-bold text-slate-800">Payment Details</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                Official GCash Number
              </label>
              <input 
                type="text" 
                defaultValue="09123456789"
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-slate-700 font-medium"
              />
            </div>
            
            <div className="flex items-start gap-2 ml-1">
              <div className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center mt-0.5">
                <span className="text-[10px] text-slate-400">i</span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                This number is displayed to all residents on the Payments page.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button Container */}
      <div className="max-w-2xl mx-auto flex justify-end mt-6">
        <button className="flex items-center gap-2 bg-[#1e293b] text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-700 transition-all active:scale-95 shadow-lg">
          <Save size={18} />
          <span>Save Changes</span>
        </button>
      </div>
    </div>
  );
}
