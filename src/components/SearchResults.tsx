'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useMainStore } from '@/store/useMainStore';
import PrimaryButton from '@/components/BCBSMS/buttons/PrimaryButton';
import { Provider, CenterOfExcellenceProviders } from '@/types/ServiceModels';

interface HeaderText {
  providerType: string;
  paragraphs: string[];
}

const SearchResults: React.FC = () => {
  const {
    providerList,
    showErrorMessage,
    showSuccessMessage,
    selectedProviderType
  } = useMainStore();

  const [sortedArray, setSortedArray] = useState<Provider[]>([]);
  const [sortedHospitalArray] = useState<CenterOfExcellenceProviders[]>([]);
  const [selectedSort, setSelectedSort] = useState('Distance');
  const [sorted, setSorted] = useState(false);
  const [textFound, setTextFound] = useState(false);

  const sortOptions = ['Distance', 'Name A-Z', 'Name Z-A'];

  const headerText = React.useMemo<HeaderText[]>(() => [
    {
      providerType: "Network Providers",
      paragraphs: [
        "These providers have agreed to provide services to Blue Cross & Blue Shield of Mississippi members at negotiated rates."
      ]
    },
    {
      providerType: "Blue Primary Care Providers",
      paragraphs: [
        "Blue Primary Care providers offer comprehensive primary care services and have met specific quality standards."
      ]
    }
    // Add more header text as needed
  ], []);

  const webstatic = process.env.NEXT_PUBLIC_WEBSTATIC || '';
  const dotCom = process.env.NEXT_PUBLIC_DOTCOM || '';

  const getSortedArray = React.useCallback(() => {
    const sorted = [...providerList];

    switch (selectedSort) {
      case 'Name A-Z':
        sorted.sort((a, b) => a.provider.name.localeCompare(b.provider.name));
        break;
      case 'Name Z-A':
        sorted.sort((a, b) => b.provider.name.localeCompare(a.provider.name));
        break;
      case 'Distance':
      default:
        // Distance sorting would require additional logic based on coordinates
        break;
    }

    setSortedArray(sorted);
    setSorted(true);
  }, [providerList, selectedSort]);

  useEffect(() => {
    if (providerList.length > 0) {
      getSortedArray();
    }
  }, [providerList, selectedSort, getSortedArray]);

  useEffect(() => {
    const foundText = headerText.some(text => text.providerType === selectedProviderType);
    setTextFound(foundText);
  }, [selectedProviderType, headerText]);



  const search = (providerName: string) => {
    const searchQuery = encodeURIComponent(providerName);
    window.open(`https://www.google.com/search?q=${searchQuery}`, '_blank');
  };

  const showBSDImage = (item: { hospital?: { isCardiacCert?: boolean; isKneeAndHipCert?: boolean; isSpineCert?: boolean } }) => {
    // Logic to determine if BSD image should be shown
    return item.hospital?.isCardiacCert || item.hospital?.isKneeAndHipCert || item.hospital?.isSpineCert;
  };

  const getImage = (item: { hospital?: { isCardiacCert?: boolean; isKneeAndHipCert?: boolean; isSpineCert?: boolean } }) => {
    // Logic to get the appropriate image
    if (item.hospital?.isCardiacCert) return 'cardiac-cert.png';
    if (item.hospital?.isKneeAndHipCert) return 'knee-hip-cert.png';
    if (item.hospital?.isSpineCert) return 'spine-cert.png';
    return '';
  };

  return (
    <div id="searchResults" className="w-[65%] m-8 p-8 max-sm:w-[90%] max-sm:mx-auto max-sm:mt-8">
      <div>
        <h1 className="text-[35px] leading-6 font-arial mt-4 max-sm:text-[30px]">Find a Network Provider</h1>

        {textFound && headerText.map((text, index) => (
          selectedProviderType === text.providerType && (
            <div key={index}>
              <h3 className="text-[21px] leading-[1.3em] font-arial mt-4">{text.providerType}</h3>
              {text.paragraphs.map((paragraph, pIndex) => (
                <p key={pIndex} className="leading-[1.6] mb-4" dangerouslySetInnerHTML={{ __html: paragraph }} />
              ))}
            </div>
          )
        ))}

        {!textFound && (
          <h3 className="text-[21px] leading-[1.3em] font-arial mt-4">{selectedProviderType}</h3>
        )}

        <p>Select &ldquo;Clear Search&rdquo; to start a new search.</p>

        {showErrorMessage && selectedProviderType !== 'Blue Specialty Care Network Providers' && (
          <div className="bg-[#fff1f1] border-l-[3px] border-[#e4002b] p-4 mt-4">
            <h3 className="mt-0 mb-4">Error Finding Providers</h3>
            <p className="mb-4">There was an error finding providers. Please try again later.</p>
          </div>
        )}

        {sortedArray.length === 0 && showSuccessMessage && selectedProviderType !== 'Blue Specialty Care Network Providers' && (
          <div className="bg-[#f2fcff] border-l-[3px] border-[#0590e8] p-4 mt-4">
            <h3 className="mt-0 mb-4">No Providers Found</h3>
            <p className="mb-4">Your search found no Network Providers. You may want to:</p>
            <ul>
              <li><p>Check the spelling of a name or location.</p></li>
              <li><p>Change the search max distance.</p></li>
              <li><p>Check the zip code you entered.</p></li>
            </ul>
            <p>Select &ldquo;Clear Search&rdquo; to start new search.</p>
          </div>
        )}

        {showSuccessMessage && sorted && selectedProviderType !== 'Blue Specialty Care Network Providers' && sortedArray.length > 0 && (
          <div id="results">
            <div className="mt-8">
              <div className="flex flex-row justify-between items-center mb-8 pb-4 border-b border-gray-300">
                {sortedArray.length > 0 && (
                  <p>
                    <span className="font-bold">{sortedArray.length} </span>
                    Provider{sortedArray.length > 1 ? 's' : ''} found
                  </p>
                )}
                <div className="flex flex-row">
                  <p>Sort By:</p>
                  <select
                    name="sortOptions"
                    id="sortOptions"
                    className="py-1"
                    value={selectedSort}
                    onChange={(e) => setSelectedSort(e.target.value)}
                  >
                    {sortOptions.map((sort, index) => (
                      <option key={index} value={sort}>
                        {sort}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Network Hospitals Results */}
              {selectedProviderType === 'Network Hospitals' && (
                <div className="mt-4">
                  {sortedHospitalArray.length > 0 && sortedHospitalArray.map((item, index) => (
                    <div key={index} className="mb-8 p-6 border border-gray-300 rounded-lg bg-white shadow-sm">
                      <a className="text-xl font-bold text-[#00a0df] no-underline block mb-4">{item.hospital.name}</a>
                      <div className="flex flex-row justify-between items-end max-sm:flex-col" id={`result${index}`}>
                        <div className="flex-1 max-sm:w-full" id="hospital-info">
                          <p className="font-bold text-gray-800 mb-2">{item.hospital.telephone}</p>
                          <span className="flex flex-row text-gray-600 mb-4 items-center gap-1">
                            <span className="material-icons text-base">location_on</span>
                            <p>{item.hospital.address.addressLineOne}</p>
                            <p>{item.hospital.address.city},</p>
                            <p>{item.hospital.address.state}</p>
                            <p>{item.hospital.address.zip}</p>
                          </span>
                        </div>
                        <div className="mx-4 flex items-center max-sm:w-1/2 max-sm:mt-4" id="distinction-logo-div">
                          {showBSDImage(item) && (
                            <Image
                              className="max-w-[100px] max-h-[100px] object-contain"
                              src={`${dotCom}/content-assets/im-a-member/find-a-network-provider/${getImage(item)}`}
                              alt="BDC"
                              width={100}
                              height={100}
                            />
                          )}
                        </div>
                        <div className="flex flex-row items-center gap-4 max-sm:flex-col max-sm:w-full max-sm:items-stretch" id="button-container">
                          <div className="mr-4 flex items-center">
                            {item.hospital.extendedHoursFlag && (
                              <Image
                                className="max-w-[80px] max-h-[40px] object-contain"
                                src={`${webstatic}/images/ext_hrs_logo_black.png`}
                                title="Extended Hours"
                                alt="Extended Hours"
                                width={80}
                                height={40}
                              />
                            )}
                          </div>
                          <div className="flex flex-col items-end max-sm:items-stretch">
                            <PrimaryButton
                              style="outline"
                              onClick={() => search(item.hospital.name)}
                            >
                              Search Provider on Google
                            </PrimaryButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Regular Provider Results */}
              {selectedProviderType !== 'Network Hospitals' && (
                <div className="mt-4">
                  {sortedArray.map((item, index) => (
                    <div key={index} className="mb-8 p-6 border border-gray-300 rounded-lg bg-white shadow-sm">
                      <a className="text-xl font-bold text-[#00a0df] no-underline block mb-4">{item.provider.name}</a>
                      <div className="flex flex-row justify-between items-start max-sm:flex-col" id={`result${index}`}>
                        <div className="flex-1 max-sm:w-full" id="provider-info">
                          <p className="font-bold text-gray-800 mb-2">{item.provider.specialty}</p>
                          <p className="text-gray-600 mb-2">{item.provider.telephone}</p>
                          <span className="flex flex-row text-gray-600 mb-4 items-center gap-1">
                            <span className="material-icons text-base">location_on</span>
                            <p>{item.provider.address.addressLineOne}</p>
                            <p>{item.provider.address.city},</p>
                            <p>{item.provider.address.state}</p>
                            <p>{item.provider.address.zip}</p>
                          </span>

                          {item.provider.acceptsNewPatientsDescription && (
                            <p className="mb-2 text-sm">
                              <span className="font-bold">Accepts New Patients:</span> {item.provider.acceptsNewPatientsDescription}
                            </p>
                          )}

                          {item.provider.averageWaitTimeDescription && (
                            <p className="mb-2 text-sm">
                              <span className="font-bold">Average Wait Time:</span> {item.provider.averageWaitTimeDescription}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-row items-center gap-4 max-sm:flex-col max-sm:w-full max-sm:items-stretch" id="button-container">
                          <div className="mr-4 flex items-center">
                            {item.provider.extendedHoursFlag && (
                              <Image
                                className="max-w-[80px] max-h-[40px] object-contain"
                                src={`${webstatic}/images/ext_hrs_logo_black.png`}
                                title="Extended Hours"
                                alt="Extended Hours"
                                width={80}
                                height={40}
                              />
                            )}
                          </div>
                          <div className="flex flex-col items-end max-sm:items-stretch">
                            <PrimaryButton
                              style="outline"
                              onClick={() => search(item.provider.name)}
                            >
                              Search Provider on Google
                            </PrimaryButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
