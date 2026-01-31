"use client";
import { useState } from 'react';
import { User, Search, Filter, MoreVertical, CheckCircle2, AlertCircle, Mail, Phone } from 'lucide-react';

export default function ManageResidents() {
  // Sample Data - This will eventually be replaced with: const residents = await prisma.user.findMany()
  const residents = [
    { id: "1", name: "Carsido Joenel", block: "1", lot: "12", email: "carsido@email.com", status: "Paid", phone: "0917-123-4567" },
    { id: "2", name: "Maria Clara", block: "2", lot: "05", email: "maria@email.com", status: "Unpaid", phone: "0918-987-6543" },
    { id: "3", name: "Juan Dela Cruz", block: "1", lot: "22", email: "juan@email.com", status: "Paid", phone: "0919-555-0123" },
    { id: "4", name: "Elena Gilbert", block: "3", lot: "01", email: "elena@email.com", status: "Overdue", phone: "0920-111-2233" },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Resident Directory</h1>
          <p className="text-slate-500 text-sm">Manage homeowners, check payment status, and update contact info.</p>
        </div>
        <button className="bg-slate-800 text-white px-6 py-3 rounded-2xl font-bold hover:bg-slate-900 transition-all flex items-center gap-2">
          <User size={18} />
          Add New Resident
        </button>
      </div>

      {/* FILTERS & SEARCH */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, block, or email..." 
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-sm"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-4 bg-white border border-slate-100 rounded-2xl text-slate-600 font-bold hover:bg-slate-50 transition-all shadow-sm">
          <Filter size={18} />
          Filters
        </button>
      </div>

      {/* RESIDENTS TABLE */}
      <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Resident</th>
              <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Address</th>
              <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Contact</th>
              <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {residents.map((person) => (
              <tr key={person.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold text-xs">
                      {person.name.charAt(0)}
                    </div>
                    <p className="font-bold text-slate-800">{person.name}</p>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <p className="text-sm text-slate-600 font-medium">Block {person.block}, Lot {person.lot}</p>
                </td>
                <td className="px-6 py-5">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                    person.status === 'Paid' ? 'bg-emerald-50 text-emerald-600' : 
                    person.status === 'Unpaid' ? 'bg-orange-50 text-orange-600' : 
                    'bg-rose-50 text-rose-600'
                  }`}>
                    {person.status === 'Paid' ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                    {person.status}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex gap-2">
                    <button className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all" title={person.email}>
                      <Mail size={16} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg transition-all" title={person.phone}>
                      <Phone size={16} />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-5 text-right text-slate-300">
                  <button className="p-2 hover:bg-white hover:text-slate-600 rounded-xl transition-all">
                    <MoreVertical size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}