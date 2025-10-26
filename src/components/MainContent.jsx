'use client';
import SearchForm from "./searchComponent";
import SearchResults from "./SearchResults";
import { useState } from "react";
import './styles.css'; // Import the CSS file

export default function MainContent() {
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = (formData) => {
    const mockResults = [
      { provider: "Dr. John Doe", specialty: "General Practice", city: "Jackson", zip: "39201" },
      { provider: "Dr. Jane Smith", specialty: "Pediatrics", city: "Gulfport", zip: "39501" },
    ].filter(result =>
      (!formData?.specialtyType || result.specialty === formData.specialtyType) &&
      (!formData?.city || result.city.toLowerCase().includes(formData.city.toLowerCase())) &&
      (!formData?.zip || result.zip === formData.zip)
    );
    setSearchResults(mockResults);
  };

  return (
    <main className="flex-grow bg-gray-50 mx-[18%] mt-1">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-3 gap-8" style={{ minHeight: '400px' }}> {/* Added minHeight for debugging */}
          {/* Left Side (70%) for Search Results */}
          <div className="col-span-2 bg-gray-200" style={{ border: '1px solid red' }}> {/* Debugging border */}
            <SearchResults results={searchResults} />
          </div>

          {/* Right Side (30%) for Search Form */}
          <div className="col-span-1 bg-gray-100" style={{ border: '1px solid blue' }}> {/* Debugging border */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <SearchForm onSearch={handleSearch} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}