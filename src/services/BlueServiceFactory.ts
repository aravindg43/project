import type { AxiosResponse } from "axios";
import { apiClient } from "./SessionTokenServiceFactory";
import type { SearchPayload } from "@/types/ServiceModels";

const API_KEY = "API-KEY";
const DOT_COM = "x-client-token";

const BlueServiceFactory = {
  fetchSpecialties(type: string): Promise<AxiosResponse> | null {
    let returnedPromise: Promise<AxiosResponse> | null = null;
    // Documents need to be uploaded as a different content-type
    if (process.env.NEXT_PUBLIC_BUILD_ENV !== 'dev') {
      returnedPromise = apiClient.get("/networkProvider/specialties?type=" + type,
        {
          headers: {
            [API_KEY]: 'DOTCOM-WEB',
          }
        })
    }
    else if (process.env.NEXT_PUBLIC_BUILD_ENV == 'dev') {
      returnedPromise = apiClient.get("/fetchSpecialties");
    }
    return returnedPromise;
  },

  fetchProviderOptions(): Promise<AxiosResponse> | null {
    let returnedPromise: Promise<AxiosResponse> | null = null;
    if (process.env.NEXT_PUBLIC_BUILD_ENV !== 'dev') {
      returnedPromise = apiClient.get("/jsapps/vue/find-provider/providerOptions.json",
        {
          baseURL: process.env.NEXT_PUBLIC_DOTCOM,
          headers: {
            [API_KEY]: 'DOTCOM-WEB',
          }
        })
    }
    else if (process.env.NEXT_PUBLIC_BUILD_ENV == 'dev') {
      returnedPromise = apiClient.get("/providerOptions");
    }
    return returnedPromise;
  },

  search(payload: SearchPayload): Promise<AxiosResponse> | null {
    let returnedPromise: Promise<AxiosResponse> | null = null;
    // Documents need to be uploaded as a different content-type
    if (process.env.NEXT_PUBLIC_BUILD_ENV !== 'dev') {
      returnedPromise = apiClient.get("/" + payload.searchType + "/address?distance=" + payload.distance + '&providerType=' + payload.providerType + '&providerLastName=' + payload.providerLastName + '&city=' + payload.city + '&zip=' + payload.zip + '&county=' + payload.county + '&v1Token=' + payload.token,
        {
          headers: {
            [API_KEY]: 'DOTCOM-WEB',
          }
        })
    }
    else if (process.env.NEXT_PUBLIC_BUILD_ENV == 'dev') {
    returnedPromise = apiClient.post("/search", payload);
  }
    return returnedPromise;
  },

  uploadDocumentation(payload: object, key: string): Promise<AxiosResponse> | null {
    let returnedPromise: Promise<AxiosResponse> | null = null;
    // Documents need to be uploaded as a different content-type
    if (process.env.NEXT_PUBLIC_BUILD_ENV !== 'dev') {
      returnedPromise = apiClient.post("/BlueLand/services/rest/prior/authorization/uploadDocumentation", payload,
        {
          baseURL: process.env.NEXT_PUBLIC_BLUELAND,
          headers: {
            [API_KEY]: key,
            [DOT_COM]: "dotcom"
          }
        })
    }
    else if (process.env.NEXT_PUBLIC_BUILD_ENV == 'dev') {
      returnedPromise = apiClient.get("/uploadDocumentation", payload);
    }
    return returnedPromise;
  },

  generateFaxCoverSheet(id: string, key: string): Promise<AxiosResponse> | null {
    let returnedPromise: Promise<AxiosResponse> | null = null;
    // Documents need to be uploaded as a different content-type
    if (process.env.NEXT_PUBLIC_BUILD_ENV !== 'dev') {
      returnedPromise = apiClient.get("/BlueLand/services/rest/prior/authorization/generateFaxCoverSheet/" + id,
        {
          baseURL: process.env.NEXT_PUBLIC_BLUELAND,
          headers: {
            [API_KEY]: key,
            [DOT_COM]: "dotcom"
          }
        })
    }
    else if (process.env.NEXT_PUBLIC_BUILD_ENV == 'dev') {
      returnedPromise = apiClient.get("/faxSheet");
    }
    return returnedPromise;
  },
};

export default BlueServiceFactory;
