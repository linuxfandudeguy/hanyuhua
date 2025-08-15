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

  const insertGTM = () => {
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
  };

  useEffect(() => {
    const consentGiven = getCookie('analytics_consent');
    const localConsent = localStorage.getItem('analytics_consent_no_cookie');
    const localDeny = localStorage.getItem('analytics_deny_no_cookie');

    if (consentGiven === 'true' || localConsent === 'true') {
      insertGTM();
      return;
    } else if (consentGiven === 'false' || localDeny === 'true') {
      return; // tracking denied
    }

    fetch('/.netlify/functions/gdpr-ccpa')
      .then(res => res.json())
      .then(data => {
        if (data.gdpr || data.ccpa) {
          setShowBanner(true);
        } else {
          insertGTM();
          setCookie('analytics_consent', 'true', 365);
        }
      })
      .catch(err => {
        console.error('Error fetching GDPR/CCPA status:', err);
        insertGTM();
        setCookie('analytics_consent', 'true', 365);
      });
  }, []);

  const handleConsentCookie = () => {
    setCookie('analytics_consent', 'true', 365);
    insertGTM();
    setShowBanner(false);
  };

  const handleConsentNoCookie = () => {
    localStorage.setItem('analytics_consent_no_cookie', 'true');
    insertGTM();
    setShowBanner(false);
  };

  const handleDenyCookie = () => {
    setCookie('analytics_consent', 'false', 365);
    setShowBanner(false);
  };

  const handleDenyNoCookie = () => {
    localStorage.setItem('analytics_deny_no_cookie', 'true');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-yellow-100 border-t border-yellow-300 p-4 z-50 shadow-md">
      <p className="mb-2 text-sm text-gray-800">
        This website uses Google Analytics (Google LLC) to help improve our services.
        We also run on a subdomain of{' '}
        <a href="https://yeet.su/" className="underline">
          yeet.su
        </a>
        , whose domain owner automatically enables Cloudflare (Cloudflare, Inc.) for
        content delivery, security, and performance. Cloudflare may collect and process
        limited technical data (such as your IP address, browser type, and pages visited)
        automatically when you access the site. This Cloudflare processing is essential to
        deliver the website and cannot be disabled from within our site. You can choose
        whether to allow or block Google Analytics tracking below.
      </p>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleConsentCookie}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          I Consent (with cookies)
        </button>
        <button
          onClick={handleConsentNoCookie}
          className="px-4 py-2 bg-yellow-300 text-gray-800 rounded hover:bg-yellow-400"
        >
          I Consent (without cookies)
        </button>
        <button
          onClick={handleDenyCookie}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
        >
          Deny (with cookies)
        </button>
        <button
          onClick={handleDenyNoCookie}
          className="px-4 py-2 bg-gray-400 text-gray-800 rounded hover:bg-gray-500"
        >
          Deny (without cookies)
        </button>
      </div>
    </div>
  );
};
