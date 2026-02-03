import { prisma } from "@/lib/prisma";
import { Megaphone } from 'lucide-react';

export default async function AnnouncementsPage() {
  // 1. Fetch data - Removed the missing isPinned sort
  const announcements = await prisma.announcement.findMany({
    orderBy: [
      { createdAt: "desc" },
    ],
  });

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Announcements</h1>
          <p className="text-slate-500 text-sm">Stay updated with the latest community news.</p>
        </div>
        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
          <Megaphone size={24} />
        </div>
      </div>

      {/* 2. Check if empty */}
      {announcements.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2rem] p-20 text-center">
          <p className="text-slate-400 font-medium">No announcements yet. Check back later!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {announcements.map((a) => (
            <div
              key={a.id}
              className="bg-white border border-slate-100 rounded-[1.5rem] p-6 transition-all hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-lg text-slate-800">{a.title}</h3>
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase">
                  {new Date(a.createdAt).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </span>
              </div>

              <p className="text-slate-600 mt-3 leading-relaxed whitespace-pre-wrap">
                {a.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
