import useDocumentTitle from "../customHooks/documentTitle";

export default function AllComplaints() {
  useDocumentTitle("All Complaints");

  return (
    <div className="p-6">
      
      <h2 className="text-2xl font-bold mb-4 dark:text-white">All Complaints</h2>

      <table className="w-full border-collapse border border-gray-300 dark:text-white">
        <thead>
          <tr className="bg-gray-100 dark:text-black">
            <th className="border border-gray-300 p-2 text-left">Title</th>
            <th className="border border-gray-300 p-2 text-left">Category</th>
            <th className="border border-gray-300 p-2 text-left">Status</th>
            <th className="border border-gray-300 p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {[
            {
              title: "Broken Streetlight",
              category: "Infrastructure",
              status: "Pending",
            },
            {
              title: "Garbage Collection Delay",
              category: "Sanitation",
              status: "Resolved",
            },
            {
              title: "Water Leakage",
              category: "Utilities",
              status: "In Progress",
            },
          ].map((complaint, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-2">{complaint.title}</td>
              <td className="border border-gray-300 p-2">{complaint.category}</td>
              <td className="border border-gray-300 p-2">{complaint.status}</td>
              <td className="border border-gray-300 p-2 text-center space-x-2">
                <button className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800">
                  View
                </button>
                <button className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800">
                  Edit
                </button>
                <button className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
