import { prisma } from "@/lib/prisma";
import { Info, Upload } from 'lucide-react';
import CopyButton from "@/components/CopyButton"; 

export default async function PaymentsPage() {
  // 1. Fetch the real settings from the database
  const settings = await prisma.systemSettings.findUnique({
    where: { id: 1 }
  });

  // 2. Use the database values, or a default if the DB is empty
  const activeGcash = settings?.gcashNumber || "0912049237";
  const activeDues = settings?.monthlyDues || 300;

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      {/* ... header code ... */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Total Amount Due</p>
            
            {/* 3. CONNECTED: Now shows the number from Admin Settings */}
            <p className="text-4xl font-black text-slate-800 mb-6">₱{activeDues}.00</p>
            
            {/* ... info box ... */}
          </div>

          <div className="bg-emerald-500 p-8 rounded-[2.5rem] text-white shadow-lg shadow-emerald-100">
            <h3 className="font-bold mb-4">Pay via GCash</h3>
            <p className="text-sm opacity-90 mb-6">Send payment to the official HOA GCash number:</p>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between border border-white/20">
              <div>
                <p className="text-[10px] font-bold uppercase opacity-70">GCash Account Number</p>
                
                {/* 4. CONNECTED: Now shows the GCash from Admin Settings */}
                <p className="text-xl font-mono font-bold tracking-tighter">{activeGcash}</p>
              </div>
              
              <CopyButton textToCopy={activeGcash} />
            </div>
          </div>
        </div>
        
        {/* ... form section ... */}
      </div>
    </div>
  );
}
