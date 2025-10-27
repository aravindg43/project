'use client';

import { useState } from 'react';
import searchData from '../data/searchResults.json';
import NetworkProviderSearch from './NetworkProviderSearch';
import SearchResults from './SearchResults';

export default function Home() {
  const [results, setResults] = useState([]);

  const handleSearch = (formData) => {
    const { city = '', zip = '' } = formData;

    const providers = searchData?.search?.networkProviderSearchResult?.providers || [];

    const filtered = providers
      .map(p => p.provider)
      .filter(p => {
        const addr = p.address;
        const matchCity = city && addr.city.toLowerCase().includes(city.toLowerCase());
        const matchZip = zip && addr.zip.includes(zip);
        return matchCity || matchZip;
      });

    setResults(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Results – 2/3 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <SearchResults results={results} />
            </div>
          </div>

          {/* Form – 1/3 */}
          <div className="lg:col-span-1">
            <NetworkProviderSearch onSearch={handleSearch} />
          </div>
        </div>
      </div>
    </div>
  );
}