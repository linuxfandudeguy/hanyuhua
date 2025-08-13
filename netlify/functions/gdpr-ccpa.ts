
const EU_COUNTRIES = [
  'AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE'
];

export async function handler(event, context) {
  let ip = '';
  let countryCode = '';

  // 1️⃣ Get IP and country from wtfismyip
  try {
    const wtfRes = await fetch('https://wtfismyip.com/json');
    const wtfData = await wtfRes.json();
    ip = wtfData.YourFuckingIPAddress || '';
    countryCode = wtfData.YourFuckingCountryCode || '';
  } catch (err) {
    console.error('WTFIP fetch failed:', err);
  }

  // 2️⃣ Feed IP to ip-api.com for more info via uncors
  let geoData: any = {};
  if (ip) {
    try {
      const apiRes = await fetch(
        `https://uncors.vercel.app/?url=http://ip-api.com/json/${ip}?fields=status,country,regionName,city,timezone,query`
      );
      geoData = await apiRes.json();
    } catch (err) {
      console.error('IP-API fetch failed:', err);
    }
  }

  const country = geoData.country || 'Unknown';
  const region = geoData.regionName || 'Unknown';

  // 3️⃣ Normalize for GDPR/CCPA checks
  const gdpr = EU_COUNTRIES.includes(countryCode.toUpperCase());
  const ccpa = region.trim().toLowerCase() === 'california'; // normalized

  return {
    statusCode: 200,
    body: JSON.stringify({
      ip: geoData.query || ip || 'Unknown',
      countryCode: countryCode || geoData.countryCode || 'Unknown',
      country,
      region,
      city: geoData.city || 'Unknown',
      timezone: geoData.timezone || 'Unknown',
      gdpr,
      ccpa
    }),
  };
}
