"use client";
import { Calendar as CalendarIcon, MapPin, Clock, ChevronRight, Plus } from 'lucide-react';
import Link from 'next/link';

export default function EventsPage() {
  // Sample data - eventually this will come from prisma.event.findMany()
  const events = [
    {
      id: 1,
      title: "Community Clean-up Drive",
      date: "Feb 8, 2026",
      time: "7:00 AM",
      location: "Phase 1 Guard House",
      description: "Join us for our quarterly clean-up drive to keep our neighborhood beautiful. Refreshments will be provided.",
      category: "Maintenance",
      color: "bg-emerald-500"
    },
    {
      id: 2,
      title: "Monthly Homeowners Meeting",
      date: "Feb 15, 2026",
      time: "2:00 PM",
      location: "Community Clubhouse",
      description: "Discussion of new security protocols and budget approval for the upcoming summer festival.",
      category: "Meeting",
      color: "bg-blue-500"
    },
    {
      id: 3,
      title: "Valentine's Night Market",
      date: "Feb 14, 2026",
      time: "5:00 PM",
      location: "Main Park",
      description: "Local vendors, food stalls, and live music for all residents to enjoy.",
      category: "Social",
      color: "bg-rose-500"
    }
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Community Events</h1>
          <p className="text-slate-500 text-sm">Don't miss out on what's happening in Villa Azalea.</p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100 self-start">
          <Plus size={20} />
          <span>Suggest Event</span>
        </button>
      </div>

      {/* EVENTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
            {/* Colored Top Bar */}
            <div className={`h-3 w-full ${event.color}`}></div>
            
            <div className="p-8 space-y-6">
              <div className="flex justify-between items-start">
                <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest bg-slate-100 text-slate-500`}>
                  {event.category}
                </span>
                <div className="text-right">
                  <p className="text-lg font-black text-slate-800 leading-none">{event.date.split(' ')[1].replace(',', '')}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">{event.date.split(' ')[0]}</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors">
                  {event.title}
                </h3>
                <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed">
                  {event.description}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-50 space-y-3">
                <div className="flex items-center gap-3 text-slate-400">
                  <Clock size={16} className="text-emerald-500" />
                  <span className="text-xs font-medium">{event.time}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  <MapPin size={16} className="text-emerald-500" />
                  <span className="text-xs font-medium">{event.location}</span>
                </div>
              </div>

              <button className="w-full py-4 bg-slate-50 text-slate-600 font-bold rounded-2xl group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all flex items-center justify-center gap-2">
                View Details
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EMPTY STATE (Optional) */}
      {events.length === 0 && (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-[3rem] p-20 text-center">
          <CalendarIcon size={48} className="mx-auto text-slate-200 mb-4" />
          <p className="text-slate-400 font-medium">No upcoming events scheduled yet.</p>
        </div>
      )}
    </div>
  );
}