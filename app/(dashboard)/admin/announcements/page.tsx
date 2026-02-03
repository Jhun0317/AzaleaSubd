import { postAnnouncement } from "./actions";

export default function AdminAnnouncements() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Create Announcement</h1>
      <form action={postAnnouncement} className="max-w-md space-y-4">
        <input 
          name="title" 
          placeholder="Title (e.g. Water Interruption)" 
          className="w-full p-2 border rounded"
          required 
        />
        <textarea 
          name="content" 
          placeholder="Write details here..." 
          className="w-full p-2 border rounded h-32"
          required 
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Post to Dashboard
        </button>
      </form>
    </div>
  );
}