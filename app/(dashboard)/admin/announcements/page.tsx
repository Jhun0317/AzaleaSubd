import { postAnnouncement } from "./actions";

export default function AdminAnnouncements() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Create New Announcement</h1>
      <form action={postAnnouncement} className="max-w-md space-y-4 bg-white p-6 rounded-xl shadow-sm border">
        <div>
          <label className="block text-sm font-medium text-slate-700">Title</label>
          <input 
            name="title" 
            placeholder="e.g., Scheduled Power Outage" 
            className="w-full mt-1 p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Details</label>
          <textarea 
            name="content" 
            placeholder="Provide more information here..." 
            className="w-full mt-1 p-2 border rounded-md h-32 outline-none focus:ring-2 focus:ring-blue-500"
            required 
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition-colors">
          Post Announcement
        </button>
      </form>
    </div>
  );
}
