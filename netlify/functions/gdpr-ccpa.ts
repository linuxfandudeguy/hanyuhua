const EU_COUNTRIES = [
  'AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE'
];

export async function handler(event, context) {
  // 1️⃣ Get the visitor IP from headers
  const forwarded = event.headers['x-forwarded-for'];
  const ip = forwarded ? forwarded.split(',')[0] : event.headers['x-nf-client-connection-ip'] || '';

  // 2️⃣ Get location info from ip-api.com
  let geoData: any = {};
  if (ip) {
    try {
      const apiRes = await fetch(
        `http://ip-api.com/json/${ip}?fields=status,countryCode,country,regionName,city,timezone,query`
      );
      geoData = await apiRes.json();
    } catch (err) {
      console.error('IP-API fetch failed:', err);
    }
  }

  // 3️⃣ Normalize for GDPR/CCPA checks
  const gdpr = EU_COUNTRIES.includes((geoData.countryCode || '').toUpperCase());
  const ccpa = (geoData.regionName || '').trim().toLowerCase() === 'california';

  return {
    statusCode: 200,
    body: JSON.stringify({
      ip: geoData.query || ip || 'Unknown',
      countryCode: geoData.countryCode || 'Unknown',
      country: geoData.country || 'Unknown',
      region: geoData.regionName || 'Unknown',
      city: geoData.city || 'Unknown',
      timezone: geoData.timezone || 'Unknown',
      gdpr,
      ccpa
    }),
  };
}
