'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMainStore } from '@/store/useMainStore';
import BlueServiceFactory from '@/services/BlueServiceFactory';
import PrimaryButton from '@/components/BCBSMS/buttons/PrimaryButton';
import MTCaptcha from '@/components/MTCaptcha';
import { ProviderOptions, TextIdentityPicklistItem, Distances } from '@/types/ServiceModels';
import type { SearchPayload } from '@/types/ServiceModels';
import mockData from '../../mockData.json';


// Custom validators
const alphaSpaceDotDashApostrophe = z.string().regex(/^[A-z+\s+\.+\'+\-]+$/, 'Can only contain letters, spaces, dashes, and apostrophes');
const cityName = z.string().regex(/^(?=.{1,30}$)[ A-Z0-9.'\-,]+$/i, 'City can only contain letters, numbers, spaces, dashes, periods, commas, and apostrophes');
const zipCode = z.string().regex(/^\d{5}$/, 'Zip Code must be 5 digits');

// Form schema
const searchFormSchema = z.object({
  providerType: z.object({
    type: z.string(),
    searchType: z.string(),
    searchResultKey: z.string()
  }),
  otherProviderType: z.object({
    weight: z.number(),
    identity: z.string(),
    value: z.string()
  }).optional(),
  specialtyType: z.string().optional(),
  providerLastName: alphaSpaceDotDashApostrophe.optional().or(z.literal('')),
  city: cityName.optional().or(z.literal('')),
  county: alphaSpaceDotDashApostrophe.optional().or(z.literal('')),
  zip: zipCode,
  distance: z.string()
});

type SearchFormData = z.infer<typeof searchFormSchema>;

const SearchForm: React.FC = () => {
  const { setLoading, setSelectedProviderType } = useMainStore();
  const [disableInput] = useState(false);
  const [testing] = useState(process.env.NODE_ENV === 'development');
  const [captchaToken, setCaptchaToken] = useState<string>('');

  // Provider type options
  const providerTypeOptions: ProviderOptions[] = [
    {
      type: "Blue Primary Care Providers",
      searchType: "bluePrimaryCareProvider",
      searchResultKey: "bluePrimaryCareProviderSearchResult"
    },
    {
      type: "Healthy You! Network Providers",
      searchType: "healthyYouNetworkProvider",
      searchResultKey: "healthyYouNetworkProviderSearchResult"
    },
    {
      type: "Network Providers",
      searchType: "networkProvider",
      searchResultKey: "networkProviderSearchResult"
    },
    {
      type: "Be Tobacco-free Network Providers",
      searchType: "beSmokeFreeProvider",
      searchResultKey: "beSmokeFreeProviderSearchResult"
    },
    {
      type: "Autism Network Providers",
      searchType: "autismNetworkProvider",
      searchResultKey: "autismNetworkProviderSearchResult"
    },
    {
      type: "Blue Specialty Care Network Providers",
      searchType: "",
      searchResultKey: ""
    },
    {
      type: "Centers of Excellence",
      searchType: "",
      searchResultKey: ""
    },
    {
      type: "Network Hospitals",
      searchType: "networkHospital",
      searchResultKey: "networkHospitalSearchResult"
    },
    {
      type: "Other Network Providers",
      searchType: "otherNetworkProvider",
      searchResultKey: "otherNetworkProviderSearchResult"
    }
  ];

  // Distance options
  const distanceOptions: Distances[] = [
    { description: '1 Mile', value: '1' },
    { description: '5 Mile', value: '5' },
    { description: '10 Mile', value: '10' },
    { description: '25 Mile', value: '25' },
    { description: '50 Mile', value: '50' },
    { description: '100 Mile', value: '100' },
    { description: 'Any Distance', value: '900' }
  ];

  // Healthy You specialties
  const healthYouSpecialties: TextIdentityPicklistItem[] = [
    {
      TextIdentityPicklistItem: {
        weight: 1,
        identity: "All Healthy You! Providers",
        value: "All Healthy You! Providers"
      }
    },
    {
      TextIdentityPicklistItem: {
        weight: 2,
        identity: "General Practice",
        value: "General Practice"
      }
    },
    {
      TextIdentityPicklistItem: {
        weight: 3,
        identity: "Internal Medicine",
        value: "Internal Medicine"
      }
    },
    {
      TextIdentityPicklistItem: {
        weight: 4,
        identity: "Obstetrics and Gynecology",
        value: "Obstetrics and Gynecology"
      }
    },
    {
      TextIdentityPicklistItem: {
        weight: 5,
        identity: "Pediatrics",
        value: "Pediatrics"
      }
    }
  ];

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isValid }
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      providerType: {
        type: "Network Providers",
        searchType: "networkProvider",
        searchResultKey: "networkProviderSearchResult"
      },
      otherProviderType: {
        weight: 0,
        identity: '',
        value: ''
      },
      specialtyType: '',
      providerLastName: '',
      city: '',
      county: '',
      zip: '',
      distance: '10'
    },
    mode: 'onChange'
  });

  const watchedProviderType = watch('providerType');

  // Helper functions to determine what fields to show
  const cityOrCountyRequired = !['Blue Specialty Care Network Providers', 'Centers of Excellence'].includes(watchedProviderType.type);
  const isHardCodedData = ['Blue Specialty Care Network Providers', 'Centers of Excellence'].includes(watchedProviderType.type);
  const showSpecialty =
  watchedProviderType.type === 'Healthy You! Network Providers' ||
  watchedProviderType.type === 'Network Providers';
  const networkProviderSpecialties =
  mockData.fetchSpecialties.networkProviderSpecialtiesResult.TextIdentityPicklist;
  const specialities =
  watchedProviderType.type === 'Healthy You! Network Providers'
    ? healthYouSpecialties
    : networkProviderSpecialties;
  const isNetworkHospital = watchedProviderType.type === 'Network Hospitals';
  const showLastName = !['Other Network Providers'].includes(watchedProviderType.type);
  const showCity = !['Other Network Providers'].includes(watchedProviderType.type);
  const showCounty = !['Other Network Providers'].includes(watchedProviderType.type);
  const showZip = true;
  const showDistance = ['Network Providers', 'Be Tobacco-free Network Providers', 'Autism Network Providers', 'Blue Primary Care Providers', 'Network Hospitals', 'Other Network Providers'].includes(watchedProviderType.type);

  const handleCaptchaVerified = (token: string) => {
    setCaptchaToken(token);
    console.log('Captcha verified:', token);
  };

  const onSubmit = async (data: SearchFormData) => {
    if (!captchaToken && !testing) {
      alert('Please complete the captcha verification');
      return;
    }

    setLoading(true);
    setSelectedProviderType(data.providerType.type);

    try {
      // Here you would call your search API with captcha token
      console.log('Search data:', { ...data, captchaToken });

      // Simulate API call
      const payload: SearchPayload = {
      searchType: data.providerType.searchType,
      providerType: data.providerType.type,
      providerLastName: data.providerLastName ?? '',
      city: data.city ?? '',
      county: data.county ?? '',
      zip: data.zip,
      distance: data.distance,
      token: captchaToken,
    };
    const response = await BlueServiceFactory.search(payload);
    useMainStore.getState().setProviderList(response?.data ?? []);
    useMainStore.getState().setShowSuccessMessage(true);
    useMainStore.getState().setShowErrorMessage(false);

    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    reset();
    setSelectedProviderType('');
  };

  const changeSize = watchedProviderType.type === 'Blue Specialty Care Network Providers' ||
                    watchedProviderType.type === 'Centers of Excellence' ? 'mt-8' : '';

  return (
    <div id="providerSearchForm" className={`w-[30%] ml-auto mr-0 my-8 max-sm:w-[90%] max-sm:mx-auto max-sm:mt-8 ${changeSize}`}>
      <div className="flex flex-col bg-[#f7f9fb] p-4">
        <h3 className="text-[21px] leading-[1.3em] font-arial m-0 mb-4">Network Provider Search</h3>

        {cityOrCountyRequired && !isHardCodedData && (
          <p className="text-sm italic mb-4">
            <span className="text-red-500">*</span> City or County or ZIP Code is Required
          </p>
        )}

        {!cityOrCountyRequired && !isHardCodedData && (
          <p className="text-sm italic mb-4">
            <span className="text-red-500">*</span> Required
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="providerType" className="block mb-1 font-normal font-arial leading-6 mt-0">Provider Type:</label>
          <select
            id="providerType"
            className="w-fit font-arial text-base py-1 border border-gray-300 mb-1 focus:outline-none focus:border-[#00a0df] max-sm:w-full max-sm:h-8"
            disabled={disableInput}
            onChange={(e) => {
              const selectedOption = providerTypeOptions.find(option => option.type === e.target.value);
              if (selectedOption) {
                setValue('providerType', selectedOption);
              }
            }}
            value={watchedProviderType.type}
          >
            {providerTypeOptions.map((option, index) => (
              <option key={index} value={option.type}>
                {option.type}
              </option>
            ))}
          </select>

          {watchedProviderType.type === 'Other Network Providers' && (
            <>
              <label htmlFor="otherProviderType" className="block mb-1 font-normal font-arial leading-6 mt-2">Other Provider Type:</label>
              <select
                id="otherProviderType"
                className="w-[95%] font-arial text-base py-1 border border-gray-300 mb-1 focus:outline-none focus:border-[#00a0df]"
                disabled={disableInput}
                {...register('otherProviderType.value')}
              >
                {/* Add other provider type options here */}
              </select>
            </>
          )}

          {showSpecialty && (
            <>
              <label htmlFor="specialtyType" className="block mb-1 font-normal font-arial leading-6 mt-2">Specialty:</label>
              <select
                id="specialtyType"
                className="w-fit font-arial text-base py-1 border border-gray-300 mb-1 focus:outline-none focus:border-[#00a0df] max-sm:w-full max-sm:h-8"
                disabled={disableInput}
                {...register('specialtyType')}
              >
                {specialities.map((option, index) => (
                  <option key={index} value={option.TextIdentityPicklistItem.value}>
                    {option.TextIdentityPicklistItem.identity}
                  </option>
                ))}
              </select>
            </>
          )}


          {watchedProviderType.type !== 'Other Network Providers' && (
            <div className="flex flex-col">
              {!isNetworkHospital && showLastName && (
                <>
                  <label htmlFor="provider-last-name" className="block mb-1 font-normal font-arial leading-6 mt-2">Provider Last Name:</label>
                  <input
                    type="text"
                    id="provider-last-name"
                    maxLength={60}
                    className="w-fit font-arial text-base py-1 border border-gray-300 mb-1 focus:outline-none focus:border-[#00a0df] max-sm:w-full max-sm:h-8"
                    disabled={disableInput}
                    {...register('providerLastName')}
                  />
                  {errors.providerLastName && (
                    <div className="text-red-500 mb-1">
                      <p className="m-0 text-sm">{errors.providerLastName.message}</p>
                    </div>
                  )}
                </>
              )}

              {!isNetworkHospital && showCity && (
                <>
                  <label htmlFor="city-field" className="block mb-1 font-normal font-arial leading-6 mt-2">
                    City:{cityOrCountyRequired && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="text"
                    id="city-field"
                    maxLength={30}
                    className="w-fit font-arial text-base py-1 border border-gray-300 mb-1 focus:outline-none focus:border-[#00a0df] max-sm:w-full max-sm:h-8"
                    disabled={disableInput}
                    {...register('city')}
                  />
                  {errors.city && (
                    <div className="text-red-500 mb-1">
                      <p className="m-0 text-sm">{errors.city.message}</p>
                    </div>
                  )}
                </>
              )}

              {!isNetworkHospital && showCounty && (
                <>
                  <label htmlFor="county-field" className="block mb-1 font-normal font-arial leading-6 mt-2">
                    County:{cityOrCountyRequired && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="text"
                    id="county-field"
                    maxLength={55}
                    className="w-fit font-arial text-base py-1 border border-gray-300 mb-1 focus:outline-none focus:border-[#00a0df] max-sm:w-full max-sm:h-8"
                    disabled={disableInput}
                    {...register('county')}
                  />
                  {errors.county && (
                    <div className="text-red-500 mb-1">
                      <p className="m-0 text-sm">{errors.county.message}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {showZip && (
            <>
              <label htmlFor="zip-code" className="block mb-1 font-normal font-arial leading-6 mt-2">
                Zip:<span className="text-red-500" style={{ display: !isHardCodedData ? 'inline' : 'none' }}>*</span>
              </label>
              <input
                className="w-fit font-arial text-base py-1 border border-gray-300 mb-1 focus:outline-none focus:border-[#00a0df] max-sm:w-full max-sm:h-8"
                id="zip-code"
                type="text"
                minLength={5}
                maxLength={5}
                disabled={disableInput}
                {...register('zip')}
              />
              {errors.zip && (
                <div className="text-red-500 mb-1">
                  <p className="m-0 text-sm">{errors.zip.message}</p>
                </div>
              )}
            </>
          )}

          {showDistance && (
            <>
              <label htmlFor="distance" className="block mb-1 font-normal font-arial leading-6 mt-2">Max Distance:<span className="text-red-500">*</span></label>
              <select
                id="distance"
                className="w-fit font-arial text-base py-1 border border-gray-300 mb-1 focus:outline-none focus:border-[#00a0df] max-sm:w-full max-sm:h-8"
                disabled={disableInput}
                {...register('distance')}
              >
                {distanceOptions.map((distance, index) => (
                  <option key={index} value={distance.value}>
                    {distance.description}
                  </option>
                ))}
              </select>
            </>
          )}

          {/* MTCaptcha iframe */}
          <div className="my-4" id="insertCaptcha">
            {!testing && (
              <MTCaptcha
                onVerified={handleCaptchaVerified}
                className="captcha-iframe"
              />
            )}
            {testing && <div className="mt-4" id="captcha-1" />}
          </div>

          <div className="flex flex-row items-center justify-between mt-10 max-sm:flex-col" id="search-button-container">
            <PrimaryButton
              style="orange"
              className="orange"
              disabled={!isValid || disableInput}
              onClick={handleSubmit(onSubmit)}
            >
              Search
            </PrimaryButton>
            <PrimaryButton
              id="clear-search"
              style="anchor"
              className="max-sm:mt-4"
              onClick={clearSearch}
            >
              Clear Search
            </PrimaryButton>
          </div>
        </form>

        {/* {process.env.NODE_ENV === 'development' && (
          <PrimaryButton
            style="orange"
            className="orange"
            onClick={handleSubmit(onSubmit)}
          >
            Search
          </PrimaryButton>
        )} */}
      </div>
    </div>
  );
};

export default SearchForm;
