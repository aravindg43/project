'use client';

import React, { useState } from 'react';
import mockData from '../../mockData.json';

const SearchForm = ({ onSearch }) => {
  const [formData, setFormData] = useState({
    providerType: {
      type: 'Network Providers',
      searchType: 'networkProvider',
      searchResultKey: 'networkProviderSearchResult'
    },
    specialtyType: '',
    providerLastName: '',
    city: '',
    county: '',
    zip: '',
    distance: '10'
  });

  const [loading, setLoading] = useState(false);
  const [disableInput, setDisableInput] = useState(false);

  // Provider type options
  const providerTypeOptions = [
    { type: 'Blue Primary Care Providers', searchType: 'bluePrimaryCareProvider', searchResultKey: 'bluePrimaryCareProviderSearchResult' },
    { type: 'Healthy You! Network Providers', searchType: 'healthyYouNetworkProvider', searchResultKey: 'healthyYouNetworkProviderSearchResult' },
    { type: 'Network Providers', searchType: 'networkProvider', searchResultKey: 'networkProviderSearchResult' },
    { type: 'Be Tobacco-free Network Providers', searchType: 'beSmokeFreeProvider', searchResultKey: 'beSmokeFreeProviderSearchResult' },
    { type: 'Autism Network Providers', searchType: 'autismNetworkProvider', searchResultKey: 'autismNetworkProviderSearchResult' },
    { type: 'Blue Specialty Care Network Providers', searchType: '', searchResultKey: '' },
    { type: 'Centers of Excellence', searchType: '', searchResultKey: '' },
    { type: 'Network Hospitals', searchType: 'networkHospital', searchResultKey: 'networkHospitalSearchResult' },
    { type: 'Other Network Providers', searchType: 'otherNetworkProvider', searchResultKey: 'otherNetworkProviderSearchResult' }
  ];

  // Distance options
  const distanceOptions = [
    { description: '1 Mile', value: '1' },
    { description: '5 Mile', value: '5' },
    { description: '10 Mile', value: '10' },
    { description: '25 Mile', value: '25' },
    { description: '50 Mile', value: '50' },
    { description: '100 Mile', value: '100' },
    { description: 'Any Distance', value: '900' }
  ];

  // Healthy You specialties
  const healthYouSpecialties = [
    { value: 'All Healthy You! Providers', label: 'All Healthy You! Providers' },
    { value: 'General Practice', label: 'General Practice' },
    { value: 'Internal Medicine', label: 'Internal Medicine' },
    { value: 'Obstetrics and Gynecology', label: 'Obstetrics and Gynecology' },
    { value: 'Pediatrics', label: 'Pediatrics' }
  ];

  // Derived state (dynamic field visibility)
  const providerType = formData.providerType;
  const cityOrCountyRequired = !['Blue Specialty Care Network Providers', 'Centers of Excellence'].includes(providerType.type);
  const isHardCodedData = ['Blue Specialty Care Network Providers', 'Centers of Excellence'].includes(providerType.type);
  const showSpecialty =
    providerType.type === 'Healthy You! Network Providers' ||
    providerType.type === 'Network Providers';
  const networkProviderSpecialties =
    mockData.fetchSpecialties.networkProviderSpecialtiesResult.TextIdentityPicklist;
  const specialties =
    providerType.type === 'Healthy You! Network Providers'
      ? healthYouSpecialties
      : networkProviderSpecialties.map((item) => ({
          value: item.TextIdentityPicklistItem.value,
          label: item.TextIdentityPicklistItem.identity
        }));
  const isNetworkHospital = providerType.type === 'Network Hospitals';
  const showLastName = !['Other Network Providers'].includes(providerType.type);
  const showCity = !['Other Network Providers'].includes(providerType.type);
  const showCounty = !['Other Network Providers'].includes(providerType.type);
  const showZip = true;
  const showDistance = [
    'Network Providers',
    'Be Tobacco-free Network Providers',
    'Autism Network Providers',
    'Blue Primary Care Providers',
    'Network Hospitals',
    'Other Network Providers'
  ].includes(providerType.type);

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === 'providerType') {
      const selectedOption = providerTypeOptions.find((opt) => opt.type === value);
      setFormData((prev) => ({
        ...prev,
        providerType: selectedOption
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.zip || formData.zip.length !== 5) {
      alert('Please enter a valid 5-digit ZIP Code');
      return;
    }

    setLoading(true);
    // Pass form data to parent component
    if (onSearch) {
      onSearch(formData);
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert('Search completed successfully!');
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setFormData({
      providerType: {
        type: 'Network Providers',
        searchType: 'networkProvider',
        searchResultKey: 'networkProviderSearchResult'
      },
      specialtyType: '',
      providerLastName: '',
      city: '',
      county: '',
      zip: '',
      distance: '10'
    });
    if (onSearch) {
      onSearch(null); // Clear results
    }
  };

  const changeSize =
    providerType.type === 'Blue Specialty Care Network Providers' ||
    providerType.type === 'Centers of Excellence'
      ? 'standard-top-margin'
      : '';

  return (
    <div id="providerSearchForm" className={changeSize}>
      <div className="flex-col grey-void">
        <h3>Network Provider Search</h3>

        {cityOrCountyRequired && !isHardCodedData && (
          <p className="disclaimer">
            <span className="asterisk">*</span> City or County or ZIP Code is Required
          </p>
        )}

        {!cityOrCountyRequired && !isHardCodedData && (
          <p className="disclaimer">
            <span className="asterisk">*</span> Required
          </p>
        )}

        <form onSubmit={handleSubmit}>
          {/* Provider Type */}
          <label htmlFor="providerType">Provider Type:</label>
          <select
            id="providerType"
            className="provider-type"
            disabled={disableInput}
            onChange={handleChange}
            value={providerType.type}
          >
            {providerTypeOptions.map((opt, idx) => (
              <option key={idx} value={opt.type}>
                {opt.type}
              </option>
            ))}
          </select>

          {/* Specialty */}
          {showSpecialty && (
            <>
              <label htmlFor="specialtyType">Specialty:</label>
              <select
                id="specialtyType"
                disabled={disableInput}
                value={formData.specialtyType}
                onChange={handleChange}
              >
                {specialties.map((s, idx) => (
                  <option key={idx} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </>
          )}

          {/* Other Fields */}
          {!isNetworkHospital && showLastName && (
            <>
              <label htmlFor="providerLastName">Provider Last Name:</label>
              <input
                type="text"
                id="providerLastName"
                maxLength={60}
                disabled={disableInput}
                value={formData.providerLastName}
                onChange={handleChange}
              />
            </>
          )}

          {!isNetworkHospital && showCity && (
            <>
              <label htmlFor="city">
                City:{cityOrCountyRequired && <span className="asterisk">*</span>}
              </label>
              <input
                type="text"
                id="city"
                maxLength={30}
                disabled={disableInput}
                value={formData.city}
                onChange={handleChange}
              />
            </>
          )}

          {!isNetworkHospital && showCounty && (
            <>
              <label htmlFor="county">
                County:{cityOrCountyRequired && <span className="asterisk">*</span>}
              </label>
              <input
                type="text"
                id="county"
                maxLength={55}
                disabled={disableInput}
                value={formData.county}
                onChange={handleChange}
              />
            </>
          )}

          {/* ZIP */}
          {showZip && (
            <>
              <label htmlFor="zip">
                Zip:<span className="asterisk">*</span>
              </label>
              <input
                className="zip-code"
                id="zip"
                type="text"
                maxLength={5}
                disabled={disableInput}
                value={formData.zip}
                onChange={handleChange}
              />
            </>
          )}

          {/* Distance */}
          {showDistance && (
            <>
              <label htmlFor="distance">
                Max Distance:<span className="asterisk">*</span>
              </label>
              <select
                id="distance"
                disabled={disableInput}
                value={formData.distance}
                onChange={handleChange}
              >
                {distanceOptions.map((dist, idx) => (
                  <option key={idx} value={dist.value}>
                    {dist.description}
                  </option>
                ))}
              </select>
            </>
          )}

          {/* Buttons */}
          <div className="flex-row align-center between" id="search-button-container">
            <button
              style={{ backgroundColor: 'orange', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' }}
              disabled={loading || disableInput}
              type="submit"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
            <button
              style={{ color: 'blue', padding: '10px 20px', border: 'none', background: 'none', cursor: 'pointer' }}
              id="clear-search"
              onClick={clearSearch}
            >
              Clear Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;