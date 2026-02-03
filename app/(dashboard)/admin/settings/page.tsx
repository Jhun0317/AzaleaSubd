"use client";

import { useRef, useTransition } from "react";
import { CreditCard, Settings2, Megaphone, FileText, CheckCircle2, Save, Plus, Search, Bell } from "lucide-react";
import { updateSystemSettings } from "@/app/actions/settings"; 

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("payments");
  const [isPending, startTransition] = useTransition();
  
  // 1. Create a reference to the form
  const formRef = useRef<HTMLFormElement>(null);

  const tabs = [
    { id: "payments", label: "Payments", icon: <CreditCard size={18} /> },
    { id: "dues", label: "Dues", icon: <Settings2 size={18} /> },
    { id: "announce", label: "Announce", icon: <Megaphone size={18} /> },
    { id: "documents", label: "Documents", icon: <FileText size={18} /> },
  ];

  // 2. Local handler to save and then CLEAR the inputs
  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      await updateSystemSettings(formData);
      
      // This clears the boxes so they are blank for next time
      formRef.current?.reset(); 
      
      alert("Settings pushed to Payments Tab!");
    });
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      {/* ... Header remains the same ... */}

      <div className="p-8">
        {/* ... Title and Tabs remain the same ... */}

        <div className="bg-white rounded-xl border border-slate-100 p-8 shadow-sm min-h-[500px]">
          
          {/* DUES TAB */}
          {activeTab === "dues" && (
            <form 
              ref={formRef} 
              action={handleSubmit} 
              className="max-w-4xl space-y-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <h4 className="font-bold text-slate-800 uppercase text-[11px] tracking-wider">Dues Configuration</h4>
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-sm text-slate-500">Monthly Dues Amount (₱)</label>
                      <input 
                        name="monthlyDues" 
                        type="number" 
                        placeholder="Enter amount (e.g. 500)" // Blank by default
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm" 
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-slate-800 uppercase text-[11px] tracking-wider">Payment Methods</h4>
                  <div className="space-y-1.5">
                    <label className="text-sm text-slate-500">GCash Number</label>
                    <input 
                      name="gcashNumber" 
                      type="text" 
                      placeholder="Enter new number" // Blank by default
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono" 
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-50 flex justify-end">
                <button 
                  type="submit" 
                  disabled={isPending}
                  className="bg-emerald-600 text-white px-8 py-2.5 rounded-lg font-bold text-sm hover:bg-emerald-700 disabled:opacity-50 transition-all flex items-center gap-2"
                >
                  <Save size={18} /> 
                  {isPending ? "Syncing..." : "Save & Push to Payments"}
                </button>
              </div>
            </form>
          )}

          {/* ... Other tabs ... */}
        </div>
      </div>
    </div>
  );
}
