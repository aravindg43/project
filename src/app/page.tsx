'use client';

import { useEffect } from 'react';
import { useMainStore } from '@/store/useMainStore';
import SearchForm from '@/components/SearchForm';
import SearchResults from '@/components/SearchResults';
import BlueSpecialtyCareProviders from '@/components/BlueSpecialtyCareProviders';
import CenterOfExcellenceProviders from '@/components/CenterOfExcellenceProviders';
import LoadingSpinner from '@/components/BCBSMS/loadingOptions/LoadingSpinner';

export default function Home() {
  const {
    loading,
    selectedProviderType,
    showSuccessMessage,
    showErrorMessage
  } = useMainStore();

  const dev = process.env.NODE_ENV === 'development' ? 'dev' : 'prod';

  useEffect(() => {
    // Add dynamic styles for icons and fonts
    const webstatic = process.env.NEXT_PUBLIC_WEBSTATIC || '';

    const newStyle = document.createElement('style');
    newStyle.appendChild(document.createTextNode(`
      .error-icon {
        content: url(${webstatic}/images/icons/warning-icon.png);
        margin-right: 0.5em;
        object-fit: contain;
      }
      :root { --sprite: url(${webstatic}/images/icons/mbm-sprite.png) }
      @font-face {
        font-family: "Material Icons";
        font-style: normal;
        font-weight: 400;
        src: url("${webstatic}/images/icons/iconfont/MaterialIcons-Regular.eot");
        src: url("${webstatic}/images/icons/iconfont/MaterialIcons-Regular.woff2") format("woff2"),
          url("${webstatic}/images/icons/iconfont/MaterialIcons-Regular.woff") format("woff"),
          url("${webstatic}/images/icons/iconfont/MaterialIcons-Regular.ttf") format("truetype");
      }
    `));
    document.head.appendChild(newStyle);

    // MTCaptcha configuration for development
    if (process.env.NODE_ENV === 'development') {
      (window as typeof window & { mtcaptchaConfig?: unknown }).mtcaptchaConfig = {
        "sitekey": "MTPublic-1EOemHdES",
        "theme": "highcontrast",
        "renderQueue": ['captcha-1'],
        "loadAnimation": "true",
        "lowFrictionInvisible": "force-visible",
        "verified-callback": (captchaInfo: unknown) => {
          const windowWithCallback = window as typeof window & { updateCaptchaValid?: (info: unknown) => void };
          if (typeof windowWithCallback.updateCaptchaValid === 'function') {
            windowWithCallback.updateCaptchaValid(captchaInfo);
          }
        },
      };

      const mt_service = document.createElement('script');
      mt_service.async = true;
      mt_service.src = 'https://service.mtcaptcha.com/mtcv1/client/mtcaptcha.min.js?v=2';
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(mt_service);
    }

    return () => {
      // Cleanup
      document.head.removeChild(newStyle);
    };
  }, []);

  return (
    <div className="font-arial antialiased text-[#2c3e50] text-base w-[1200px] mx-auto bg-white relative max-w-full sm:w-full">
      <div className={`flex flex-row ${loading || (dev === 'dev' && !(showSuccessMessage || showErrorMessage)) ? 'justify-end' : ''} max-sm:flex-col-reverse`}>
        {loading && (
          <LoadingSpinner>
            Searching for Providers....
          </LoadingSpinner>
        )}

        {selectedProviderType === 'Centers of Excellence' && (
          <CenterOfExcellenceProviders />
        )}

        {selectedProviderType === 'Blue Specialty Care Network Providers' && (
          <BlueSpecialtyCareProviders />
        )}

        {(showSuccessMessage || showErrorMessage) &&
         selectedProviderType !== 'Blue Specialty Care Network Providers' &&
         selectedProviderType !== 'Centers of Excellence' && (
          <SearchResults />
        )}

        <SearchForm />
      </div>
    </div>
  );
}
