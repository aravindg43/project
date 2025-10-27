 

// 'use client';

// import { useState } from 'react';
// import { Search, Volume2, RefreshCw } from 'lucide-react';

// export default function NetworkProviderSearch({ onSearch }) {
//   const [city, setCity] = useState('');
//   const [county, setCounty] = useState('');
//   const [zip, setZip] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [captcha, setCaptcha] = useState('');
//   const [providerType, setProviderType] = useState('');
//   const [specialty, setSpecialty] = useState('Anesthesiology');
//   const [distance, setDistance] = useState('10');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSearch({
//       providerType,
//       specialty,
//       lastName,
//       city,
//       county,
//       zip,
//       distance,
//       captcha,
//     });
//   };

//   const handleClear = () => {
//     setProviderType('');
//     setSpecialty('Anesthesiology');
//     setLastName('');
//     setCity('');
//     setCounty('');
//     setZip('');
//     setDistance('10');
//     setCaptcha('');
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold text-gray-800 mb-2">Network Provider Search</h2>
//       <p className="text-sm text-red-600 mb-6">* City or County or ZIP Code is required</p>

//       <form onSubmit={handleSubmit} className="space-y-5">
//         {/* Provider Type */}
//         <div>
//           <label htmlFor="providerType" className="block text-sm font-medium text-gray-700 mb-1">
//             Provider Type:
//           </label>
//           <select
//             id="providerType"
//             value={providerType}
//             onChange={(e) => setProviderType(e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white text-gray-900"
//           >
//             <option value="" disabled>Network Providers</option>
//             <option value="physician">Physician</option>
//             <option value="hospital">Hospital</option>
//             <option value="facility">Facility</option>
//           </select>
//         </div>

//         {/* Specialty */}
//         <div>
//           <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-1">
//             Specialty:
//           </label>
//           <select
//             id="specialty"
//             value={specialty}
//             onChange={(e) => setSpecialty(e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white text-gray-900"
//           >
//             <option>Anesthesiology</option>
//             <option>Cardiology</option>
//             <option>Dermatology</option>
//             <option>Neurology</option>
//             <option>Pediatrics</option>
//             <option>Family Medicine</option>
//             <option>Obstetrics and Gynecology</option>
//           </select>
//         </div>

//         {/* Last Name */}
//         <div>
//           <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
//             Provider Last Name:
//           </label>
//           <input
//             type="text"
//             id="lastName"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 text-black rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//           />
//         </div>

//         {/* City */}
//         <div>
//           <label htmlFor="city" className="block text-sm font-medium  text-gray-700 mb-1">
//             City: <span className="text-red-600">*</span>
//           </label>
//           <input
//             type="text"
//             id="city"
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border  text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             required
//           />
//         </div>

//         {/* County */}
//         <div>
//           <label htmlFor="county" className="block text-sm font-medium text-gray-700 mb-1">
//             County: <span className="text-red-600">*</span>
//           </label>
//           <input
//             type="text"
//             id="county"
//             value={county}
//             onChange={(e) => setCounty(e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border  text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//           />
//         </div>

//         {/* ZIP */}
//         <div>
//           <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
//             ZIP: <span className="text-red-600">*</span>
//           </label>
//           <input
//             type="text"
//             id="zip"
//             value={zip}
//             onChange={(e) => setZip(e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border  text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             placeholder="Enter ZIP code"
//           />
//         </div>

//         {/* Max Distance */}
//         <div>
//           <label htmlFor="distance" className="block text-sm font-medium text-gray-700 mb-1">
//             Max Distance: <span className="text-red-600">*</span>
//           </label>
//           <select
//             id="distance"
//             value={distance}
//             onChange={(e) => setDistance(e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white text-gray-900"
//           >
//             <option value="5">5 Miles</option>
//             <option value="10">10 Miles</option>
//             <option value="25">25 Miles</option>
//             <option value="50">50 Miles</option>
//             <option value="100">100 Miles</option>
//           </select>
//         </div>

//         {/* CAPTCHA */}
//         <div className="bg-gradient-to-r from-cyan-600 to-blue-700 p-4 rounded-md flex flex-col sm:flex-row items-center gap-3">
//           <div className="flex items-center gap-2 text-white">
//             <Volume2 className="w-5 h-5" />
//             <span className="text-3xl font-bold tracking-widest text-cyan-300" style={{ fontFamily: 'monospace' }}>
//               LCYUB
//             </span>
//             <button type="button" className="text-white hover:text-cyan-200">
//               <RefreshCw className="w-5 h-5" />
//             </button>
//           </div>
//           <input
//             type="text"
//             value={captcha}
//             onChange={(e) => setCaptcha(e.target.value)}
//             placeholder="Enter text from image"
//             className="flex-1 w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
//             // required
//           />
//         </div>

//         {/* Buttons */}
//         <div className="flex flex-col sm:flex-row gap-3 pt-4">
//           <button
//             type="submit"
//             className="flex-1 inline-flex justify-center items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
//           >
//             <Search className="w-4 h-4 mr-2" />
//             Search
//           </button>
//           <button
//             type="button"
//             onClick={handleClear}
//             className="flex-1 inline-flex justify-center items-center px-6 py-3 border border-gray-300 text-sm font-medium rounded-md text-blue-700 bg-white hover:bg-gray-50"
//           >
//             Clear Search
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

export default function NetworkProviderSearch({ onSearch }) {
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ city, zip });
  };

  const handleClear = () => {
    setCity('');
    setZip('');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Find a Network Provider</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City:
          </label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g. Flowood"
            className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ZIP Code:
          </label>
          <input
            type="text"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            placeholder="e.g. 39232"
            className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 flex justify-center items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Search className="w-4 h-4" />
            Search
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}