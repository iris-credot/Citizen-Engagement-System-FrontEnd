import useDocumentTitle from "../customHooks/documentTitle";

export default function AgenciesPage() {
  useDocumentTitle("Agencies");

  const agencies = [
    {
      _id: "1",
      name: "Health Services Agency",
      description: "Provides health-related services and awareness programs.",
      location: "Kigali, Rwanda",
      contact_email: "health@agency.gov.rw",
    },
    {
      _id: "2",
      name: "Environmental Protection Agency",
      description: "Responsible for environmental regulation and conservation.",
      location: "Musanze, Rwanda",
      contact_email: "env@agency.gov.rw",
    },
    {
      _id: "3",
      name: "Education Development Agency",
      description: "Supports schools and promotes education initiatives.",
      location: "Huye, Rwanda",
      contact_email: "education@agency.gov.rw",
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Explore Government Agencies
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {agencies.map((agency) => (
          <div
            key={agency._id}
            className="bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-shadow rounded-2xl p-5 border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-xl font-semibold text-black dark:text-white mb-2">
              {agency.name}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              {agency.description}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              📍 <strong>Location:</strong> {agency.location}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ✉️ <strong>Email:</strong>{" "}
              <a
                href={`mailto:${agency.contact_email}`}
                className="text-[#FFB640] font-medium hover:underline"
              >
                {agency.contact_email}
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
