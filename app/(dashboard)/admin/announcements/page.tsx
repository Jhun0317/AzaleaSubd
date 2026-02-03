import { prisma } from "@/lib/prisma";
import { postAnnouncement, deleteAnnouncement } from "./actions";
import { Trash2, Megaphone } from "lucide-react";

export default async function AdminAnnouncements() {
  const announcements = await prisma.announcement.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Community Announcements</h1>

      {/* Post Form */}
      <form action={postAnnouncement} className="mb-10 bg-white p-6 rounded-xl border space-y-4">
        <input name="title" placeholder="Title" className="w-full p-2 border rounded" required />
        <textarea name="content" placeholder="Details" className="w-full p-2 border rounded h-24" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700">
          Post Announcement
        </button>
      </form>

      {/* List of Announcements with Delete Button */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-700 uppercase tracking-wider text-sm">Active Posts</h2>
        {announcements.map((a) => (
          <div key={a.id} className="flex items-center justify-between p-4 bg-slate-50 border rounded-lg">
            <div>
              <h3 className="font-bold text-slate-800">{a.title}</h3>
              <p className="text-sm text-slate-500 line-clamp-1">{a.content}</p>
            </div>
            
            <form action={async () => {
              "use server";
              await deleteAnnouncement(a.id);
            }}>
              <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 size={18} />
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
