import React, { useEffect, useState } from 'react';

// Cookie helpers
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
    // Save consent for 1 year
    setCookie('analytics_consent', 'true', 365);

    // Insert Google Tag Manager script dynamically
    const script = document.createElement('script');
    script.innerHTML = `
      (function(w,d,s,l){
        w[l]=w[l]||[];
        w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
        var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
        j.async=true;
        j.src='https://www.googletagmanager.com/gtm.js?id=GTM-TDK5C556'+dl;
        f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer');
    `;
    document.head.appendChild(script);

    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-yellow-100 border-t border-yellow-300 p-4 z-50 shadow-md">
      <p className="mb-2 text-sm text-gray-800">
        If you see this message, you are likely in a region that the GDPR or CCPA laws apply to.
        By clicking "I consent", you agree to have your data tracked by Google LLC via Google Tag
        Manager/Google Analytics so we can improve our website. Your consent will be stored in a cookie named
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
