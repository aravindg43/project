export default function SearchResults({ results }) {
  if (!results || results.length === 0) {
    return <p className="text-gray-700">No results found. Please apply filters and search.</p>;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Search Results</h3>
      <ul className="space-y-4">
        {results.map((result, index) => (
          <li key={index} className="border-b pb-2">
            <p><strong>Provider:</strong> {result.provider}</p>
            <p><strong>Specialty:</strong> {result.specialty}</p>
            <p><strong>City:</strong> {result.city}</p>
            <p><strong>ZIP:</strong> {result.zip}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}