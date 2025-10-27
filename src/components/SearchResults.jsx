'use client';

import { MapPin, Phone, ExternalLink, Star, Clock, Users, Calendar } from 'lucide-react';

export default function SearchResults({ results = [] }) {
  if (results.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">No providers found. Try entering a city or ZIP code.</p>
      </div>
    );
  }

  const handleGoogleSearch = (name, city) => {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(name + ' ' + city)}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        {results.length} Provider{results.length > 1 ? 's' : ''} Found
      </h2>

      {results.map((p, i) => {
        const addr = p.address;
        const fullAddress = [addr.addressLineOne, addr.addressLineTwo, `${addr.city}, ${addr.state} ${addr.zip}`]
          .filter(Boolean)
          .join(', ');
        const hasRating = p.providerRating && p.providerRating !== '';

        return (
          <div key={i} className="bg-white p-6 rounded-lg border shadow-sm hover:shadow-md">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900">{p.name}</h3>
                <p className="text-sm text-blue-600 font-medium">{p.specialty}</p>
                {addr.locationName && <p className="text-sm italic text-gray-600">{addr.locationName}</p>}

                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-blue-600">
                    <Phone className="w-4 h-4" />
                    <span>{p.telephone}</span>
                  </div>
                  <div className="flex items-start gap-2 text-gray-700">
                    <MapPin className="w-4 h-4 mt-0.5 text-gray-500" />
                    <span>{fullAddress}</span>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  {p.extendedHoursFlag && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Extended Hours
                    </span>
                  )}
                  {p.acceptsNewPatientsDescription.includes("Accepts") && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full flex items-center gap-1">
                      <Users className="w-3 h-3" /> Accepts New Patients
                    </span>
                  )}
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-gray-600">
                  {p.averageWaitTimeDescription && p.averageWaitTimeDescription !== "No Value Specified" && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Office: <strong>{p.averageWaitTimeDescription}</strong>
                    </div>
                  )}
                  {p.electiveProcedureWaitTimeDescription && p.electiveProcedureWaitTimeDescription !== "No Value Specified" && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> Appt: <strong>{p.electiveProcedureWaitTimeDescription}</strong>
                    </div>
                  )}
                </div>

                {hasRating && (
                  <div className="mt-3 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(+p.providerRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="ml-1 text-sm font-medium">{p.providerRating}</span>
                  </div>
                )}
              </div>

              <button
                onClick={() => handleGoogleSearch(p.name, addr.city)}
                className="self-start flex items-center gap-2 px-4 py-2 bg-white border border-blue-600 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-50"
              >
                Search on Google
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}