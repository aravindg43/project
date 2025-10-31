export interface SearchPayload {
  searchType: string;
  distance: string;
  providerType: string;
  providerLastName: string;
  city: string;
  zip: string;
  county: string;
  token: string;
}

export interface Address {
  addressLineOne: string;
  addressLineTwo: string;
  city: string;
  latitude: string;
  locationName: string;
  longitude: string;
  state: string;
  zip: string;
}

export interface ProviderData {
  acceptsNewPatientsDescription: string;
  address: Address;
  averageWaitTimeDescription: string;
  bluePrimaryCare: boolean;
  colorMeHealthy: boolean;
  electiveProcedureWaitTimeDescription: string;
  extendedHoursFlag: boolean;
  name: string;
  providerId: string;
  providerRating: string;
  specialty: string;
  telephone: string;
}

export interface Specialties {
  weight: number;
  identity: string;
  value: string;
}

export interface TextIdentityPicklistItem {
  TextIdentityPicklistItem: Specialties;
}

export interface Provider {
  provider: ProviderData;
}

export interface MTCaptchaCallbackState {
  domID?: string;
  element?: HTMLDivElement;
  isVerified: boolean;
  isVisible: boolean;
  statusCode?: string;
  statusDesc?: string;
  verifiedToken?: string | null;
}

export interface Distances {
  value: string;
  description: string;
}

export interface BlueSpecialtyCareProviders {
  location: LocationData;
}

export interface LocationData {
  addressLine1: string;
  city: string;
  locationName: string;
  phone: string;
  providerNames: Array<string>;
  state: string;
  zip: string;
}

export interface CenterOfExcellenceProviders {
  hospital: HospitalData;
}

export interface HospitalData {
  address: Address;
  extendedHoursFlag: boolean;
  isCardiacCert: boolean;
  isColonoscopy: boolean;
  isKneeAndHipCert: boolean;
  isMaternityCare: boolean;
  isOrthopaedic: boolean;
  isSpineCert: boolean;
  name: string;
  providerId: string | null;
  specialty: string | null;
  telephone: string;
}

export interface ProviderOptions {
  type: string;
  searchType: string;
  searchResultKey: string;
}
