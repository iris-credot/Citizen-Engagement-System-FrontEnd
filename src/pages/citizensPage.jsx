import useDocumentTitle from "../customHooks/documentTitle";

export default function CitizensPage() {
  useDocumentTitle("All Citizens");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">All Citizens</h1>

      <table className="w-full border-collapse border border-gray-300 dark:text-white">
        <thead>
          <tr className="bg-gray-100 dark:text-black">
            <th className="border border-gray-300 p-2 text-left">Name</th>
            <th className="border border-gray-300 p-2 text-left">Email</th>
            <th className="border border-gray-300 p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-50">
            <td className="border border-gray-300 p-2">Citizen One</td>
            <td className="border border-gray-300 p-2">citizen1@example.com</td>
            <td className="border border-gray-300 p-2 text-center space-x-2">
              <button className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800">
                View
              </button>
              <button className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800">
                Delete
              </button>
            </td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="border border-gray-300 p-2">Citizen Two</td>
            <td className="border border-gray-300 p-2">citizen2@example.com</td>
            <td className="border border-gray-300 p-2 text-center space-x-2">
              <button className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800">
                View
              </button>
              <button className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800">
                Delete
              </button>
            </td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="border border-gray-300 p-2">Citizen Three</td>
            <td className="border border-gray-300 p-2">citizen3@example.com</td>
            <td className="border border-gray-300 p-2 text-center space-x-2">
              <button className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800">
                View
              </button>
              <button className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
