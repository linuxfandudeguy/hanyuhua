import React, { useEffect, useState } from 'react';

// Simple cookie helpers
const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date();
  expires.setDate(expires.getDate() + days);
  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
};

const getCookie = (name: string) => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
};

export const GDPRCCPAConsent: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consentGiven = getCookie('analytics_consent');

    if (!consentGiven) {
      fetch('/.netlify/functions/gdpr-ccpa')
        .then(res => res.json())
        .then(data => {
          if (data.gdpr || data.ccpa) {
            setShowBanner(true);
          }
        })
        .catch(err => {
          console.error('Error fetching GDPR/CCPA status:', err);
        });
    }
  }, []);

  const handleConsent = () => {
    // Save consent in cookie for 1 year
    setCookie('analytics_consent', 'true', 365);

    // Insert Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=GTM-TDK5C556';
    document.head.appendChild(script);

    script.onload = () => {
      (window as any).dataLayer = (window as any).dataLayer || [];
      function gtag(...args: any[]) {
        (window as any).dataLayer.push(args);
      }
      gtag('js', new Date());
      gtag('config', 'GTM-TDK5C556');
    };

    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-yellow-100 border-t border-yellow-300 p-4 z-50 shadow-md">
      <p className="mb-2 text-sm text-gray-800">
        If you see this message, you are likely in a region that the GDPR or CCPA laws apply to.
        By clicking "I consent", you agree to have your data tracked by Google LLC through Google
        Analytics so we can improve our website. Your consent will be stored in a cookie named
        <strong> analytics_consent</strong> that will last for <strong>one year</strong>.
      </p>
      <button
        onClick={handleConsent}
        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
      >
        I Consent
      </button>
    </div>
  );
};
