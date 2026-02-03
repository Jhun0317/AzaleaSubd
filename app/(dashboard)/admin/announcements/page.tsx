import { prisma } from "@/lib/prisma";
import { postAnnouncement, deleteAnnouncement } from "./actions";
import { Trash2, Megaphone } from "lucide-react";

export default async function AdminAnnouncements() {
  const announcements = await prisma.announcement.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Megaphone className="text-blue-600" size={32} />
        <h1 className="text-2xl font-bold">Admin Announcements</h1>
      </div>

      {/* Create Form */}
      <form action={postAnnouncement} className="mb-10 bg-white p-6 rounded-xl border shadow-sm space-y-4">
        <input name="title" placeholder="Announcement Title" className="w-full p-2 border rounded" required />
        <textarea name="content" placeholder="Announcement Details..." className="w-full p-2 border rounded h-32" required />
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors">
          Publish Now
        </button>
      </form>

      {/* List with Delete capability */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Active Announcements</h2>
        {announcements.length === 0 && <p className="text-slate-400 italic">No announcements found.</p>}
        {announcements.map((a) => (
          <div key={a.id} className="flex items-center justify-between p-4 bg-white border rounded-xl shadow-sm">
            <div>
              <h3 className="font-bold text-slate-800">{a.title}</h3>
              <p className="text-sm text-slate-500 line-clamp-1">{a.content}</p>
            </div>
            
            <form action={async () => {
              "use server";
              await deleteAnnouncement(a.id);
            }}>
              <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 size={20} />
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
