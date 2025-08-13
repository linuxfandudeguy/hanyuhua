// netlify/functions/ip-for-gdpr-ccpa.ts

export async function handler(event, context) {
  const forwarded = event.headers['x-forwarded-for'];
  const ip = forwarded ? forwarded.split(',')[0] : event.requestContext?.identity?.sourceIp || 'Unknown';

  return {
    statusCode: 200,
    body: JSON.stringify({ ip }),
  };
}
