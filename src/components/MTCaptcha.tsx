'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    mtcaptcha: any;
    mtcaptchaConfig: any;
  }
}

type MTCaptchaProps = {
  onVerified?: (token: string) => void;
  sitekey?: string;                 // defaults to NEXT_PUBLIC_MTCAPTCHA_SITEKEY
  className?: string;
  theme?: 'light' | 'dark' | 'highcontrast';
};

export default function MTCaptcha({
  onVerified,
  sitekey = "MTPublic-1EOemHdES",
  className = '',
  theme = 'highcontrast',
}: MTCaptchaProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Configure BEFORE the script executes
  useEffect(() => {
    window.mtcaptchaConfig = {
      sitekey,
      theme,
      // fires after successful verification
      'verified-callback': function (captchaInfo: any) {
        const token = captchaInfo?.verifiedToken;
        if (token) onVerified?.(token);
      },
    };

    // If script is already on the page, (re)render the widget
    if (window.mtcaptcha?.render && containerRef.current) {
      // clear and re-render to avoid duplicates on key/theme changes
      containerRef.current.innerHTML = '';
      window.mtcaptcha.render(containerRef.current);
    }
  }, [sitekey, theme, onVerified]);

  return (
    <>
      <Script
        src="https://service.mtcaptcha.com/mtcv1/client/mtcaptcha.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (window.mtcaptcha && containerRef.current) {
            window.mtcaptcha.render(containerRef.current);
          }
        }}
        onError={(e) => {
          // Helpful when SANDT blocks the domain or CSP is too strict
          console.error('MTCaptcha failed to load', e);
        }}
      />
      <div
        ref={containerRef}
        className={`mtcaptcha ${className || ''}`}
        data-sitekey={sitekey}
        data-theme={theme}
      />
    </>
  );
}
