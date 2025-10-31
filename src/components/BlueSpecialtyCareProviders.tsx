'use client';

import React from 'react';
import { useMainStore } from '@/store/useMainStore';
import PrimaryButton from '@/components/BCBSMS/buttons/PrimaryButton';

const BlueSpecialtyCareProviders: React.FC = () => {
  const { blueSpecialtyCareProviders, showSuccessMessage, showErrorMessage } = useMainStore();

  const search = (locationName: string) => {
    const searchQuery = encodeURIComponent(locationName);
    window.open(`https://www.google.com/search?q=${searchQuery}`, '_blank');
  };

  return (
    <div id="searchResults" className="w-[65%] m-8 p-8 max-sm:w-[90%] max-sm:mx-auto max-sm:mt-8">
      <div>
        <h1 className="text-[35px] leading-6 font-arial mt-4 max-sm:text-[30px]">Find a Network Provider</h1>
        <h3 className="text-[21px] leading-[1.3em] font-arial mt-4">Blue Specialty Care Network Providers</h3>
        <p className="leading-[1.6] mb-4">
          Blue Specialty Care Network providers offer specialized medical services with enhanced coordination of care.
        </p>
        <p>Select &ldquo;Clear Search&rdquo; to start a new search.</p>

        {showErrorMessage && (
          <div className="bg-[#fff1f1] border-l-[3px] border-[#e4002b] p-4 mt-4">
            <h3 className="mt-0 mb-4">Error Finding Providers</h3>
            <p className="mb-4">There was an error finding providers. Please try again later.</p>
          </div>
        )}

        {blueSpecialtyCareProviders.length === 0 && showSuccessMessage && (
          <div className="bg-[#f2fcff] border-l-[3px] border-[#0590e8] p-4 mt-4">
            <h3 className="mt-0 mb-4">No Providers Found</h3>
            <p className="mb-4">Your search found no Blue Specialty Care Network Providers. You may want to:</p>
            <ul>
              <li><p>Check the spelling of a name or location.</p></li>
              <li><p>Change the search max distance.</p></li>
              <li><p>Check the zip code you entered.</p></li>
            </ul>
            <p>Select &ldquo;Clear Search&rdquo; to start new search.</p>
          </div>
        )}

        {showSuccessMessage && blueSpecialtyCareProviders.length > 0 && (
          <div id="results">
            <div className="mt-8">
              <div className="flex flex-row justify-between items-center mb-8 pb-4 border-b border-gray-300">
                <p>
                  <span className="font-bold">{blueSpecialtyCareProviders.length} </span>
                  Location{blueSpecialtyCareProviders.length > 1 ? 's' : ''} found
                </p>
              </div>

              <div className="mt-4">
                {blueSpecialtyCareProviders.map((item, index) => (
                  <div key={index} className="mb-8 p-6 border border-gray-300 rounded-lg bg-white shadow-sm">
                    <a className="text-xl font-bold text-[#00a0df] no-underline block mb-4">{item.location.locationName}</a>
                    <div className="flex flex-row justify-between items-start max-sm:flex-col" id={`result${index}`}>
                      <div className="flex-1 max-sm:w-full" id="provider-info">
                        <p className="text-gray-600 mb-2">{item.location.phone}</p>
                        <span className="flex flex-row text-gray-600 mb-4 items-center gap-1">
                          <span className="material-icons text-base">location_on</span>
                          <p>{item.location.addressLine1}</p>
                          <p>{item.location.city},</p>
                          <p>{item.location.state}</p>
                          <p>{item.location.zip}</p>
                        </span>

                        {item.location.providerNames && item.location.providerNames.length > 0 && (
                          <div className="mt-4">
                            <p className="font-bold">Providers:</p>
                            <ul className="my-2 pl-6">
                              {item.location.providerNames.map((name, nameIndex) => (
                                <li key={nameIndex}>{name}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-row items-center gap-4 max-sm:flex-col max-sm:w-full max-sm:items-stretch" id="button-container">
                        <div className="flex flex-col items-end max-sm:items-stretch">
                          <PrimaryButton
                            style="outline"
                            onClick={() => search(item.location.locationName)}
                          >
                            Search Location on Google
                          </PrimaryButton>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlueSpecialtyCareProviders;
