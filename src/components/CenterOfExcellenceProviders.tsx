'use client';

import React from 'react';
import Image from 'next/image';
import { useMainStore } from '@/store/useMainStore';
import PrimaryButton from '@/components/BCBSMS/buttons/PrimaryButton';
import { HospitalData } from '@/types/ServiceModels';

const CenterOfExcellenceProviders: React.FC = () => {
  const { centerOfExcellenceProviders, showSuccessMessage, showErrorMessage } = useMainStore();

  const webstatic = process.env.NEXT_PUBLIC_WEBSTATIC || '';
  const dotCom = process.env.NEXT_PUBLIC_DOTCOM || '';

  const search = (hospitalName: string) => {
    const searchQuery = encodeURIComponent(hospitalName);
    window.open(`https://www.google.com/search?q=${searchQuery}`, '_blank');
  };

  const showBSDImage = (item: { hospital: HospitalData }) => {
    return item.hospital?.isCardiacCert ||
           item.hospital?.isKneeAndHipCert ||
           item.hospital?.isSpineCert ||
           item.hospital?.isColonoscopy ||
           item.hospital?.isMaternityCare ||
           item.hospital?.isOrthopaedic;
  };

  const getImage = (item: { hospital: HospitalData }) => {
    if (item.hospital?.isCardiacCert) return 'cardiac-cert.png';
    if (item.hospital?.isKneeAndHipCert) return 'knee-hip-cert.png';
    if (item.hospital?.isSpineCert) return 'spine-cert.png';
    if (item.hospital?.isColonoscopy) return 'colonoscopy-cert.png';
    if (item.hospital?.isMaternityCare) return 'maternity-cert.png';
    if (item.hospital?.isOrthopaedic) return 'orthopaedic-cert.png';
    return '';
  };

  const getCertifications = (hospital: HospitalData) => {
    const certs = [];
    if (hospital.isCardiacCert) certs.push('Cardiac Care');
    if (hospital.isKneeAndHipCert) certs.push('Knee & Hip');
    if (hospital.isSpineCert) certs.push('Spine Care');
    if (hospital.isColonoscopy) certs.push('Colonoscopy');
    if (hospital.isMaternityCare) certs.push('Maternity Care');
    if (hospital.isOrthopaedic) certs.push('Orthopaedic');
    return certs;
  };

  return (
    <div id="searchResults" className="w-[65%] m-8 p-8 max-sm:w-[90%] max-sm:mx-auto max-sm:mt-8">
      <div>
        <h1 className="text-[35px] leading-6 font-arial mt-4 max-sm:text-[30px]">Find a Network Provider</h1>
        <h3 className="text-[21px] leading-[1.3em] font-arial mt-4">Centers of Excellence</h3>
        <p className="leading-[1.6] mb-4">
          Centers of Excellence are hospitals that have demonstrated superior clinical outcomes and patient satisfaction in specific areas of care.
        </p>
        <p>Select &ldquo;Clear Search&rdquo; to start a new search.</p>

        {showErrorMessage && (
          <div className="bg-[#fff1f1] border-l-[3px] border-[#e4002b] p-4 mt-4">
            <h3 className="mt-0 mb-4">Error Finding Providers</h3>
            <p className="mb-4">There was an error finding providers. Please try again later.</p>
          </div>
        )}

        {centerOfExcellenceProviders.length === 0 && showSuccessMessage && (
          <div className="bg-[#f2fcff] border-l-[3px] border-[#0590e8] p-4 mt-4">
            <h3 className="mt-0 mb-4">No Centers of Excellence Found</h3>
            <p className="mb-4">Your search found no Centers of Excellence. You may want to:</p>
            <ul>
              <li><p>Check the spelling of a name or location.</p></li>
              <li><p>Change the search max distance.</p></li>
              <li><p>Check the zip code you entered.</p></li>
            </ul>
            <p>Select &ldquo;Clear Search&rdquo; to start new search.</p>
          </div>
        )}

        {showSuccessMessage && centerOfExcellenceProviders.length > 0 && (
          <div id="results">
            <div className="mt-8">
              <div className="flex flex-row justify-between items-center mb-8 pb-4 border-b border-gray-300">
                <p>
                  <span className="font-bold">{centerOfExcellenceProviders.length} </span>
                  Center{centerOfExcellenceProviders.length > 1 ? 's' : ''} of Excellence found
                </p>
              </div>

              <div className="mt-4">
                {centerOfExcellenceProviders.map((item, index) => (
                  <div key={index} className="mb-8 p-6 border border-gray-300 rounded-lg bg-white shadow-sm">
                    <a className="text-xl font-bold text-[#00a0df] no-underline block mb-4">{item.hospital.name}</a>
                    <div className="flex flex-row justify-between items-end max-sm:flex-col" id={`result${index}`}>
                      <div className="flex-1 max-sm:w-[17rem]" id="COEprovider-info">
                        <p className="font-bold text-gray-800 mb-2">{item.hospital.telephone}</p>
                        <span className="flex flex-row text-gray-600 mb-4 items-center gap-1">
                          <span className="material-icons text-base">location_on</span>
                          <p>{item.hospital.address.addressLineOne}</p>
                          <p>{item.hospital.address.city},</p>
                          <p>{item.hospital.address.state}</p>
                          <p>{item.hospital.address.zip}</p>
                        </span>

                        {getCertifications(item.hospital).length > 0 && (
                          <div className="mt-4">
                            <p className="font-bold">Specialties:</p>
                            <ul className="my-2 pl-6">
                              {getCertifications(item.hospital).map((cert, certIndex) => (
                                <li key={certIndex}>{cert}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <div className="mx-4 flex items-center max-sm:w-1/2 max-sm:mt-4" id="distinction-logo-div">
                        {showBSDImage(item) && (
                          <Image
                            className="max-w-[100px] max-h-[100px] object-contain"
                            src={`${dotCom}/content-assets/im-a-member/find-a-network-provider/${getImage(item)}`}
                            alt="Center of Excellence Certification"
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
                            Search Hospital on Google
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

export default CenterOfExcellenceProviders;
