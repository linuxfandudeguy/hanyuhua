export async function handler(event, context) {
  const START = 0x4E00;
  const END = 0x9FFF;
  const TOTAL = END - START + 1;

  // Get days since epoch in UTC
  const now = new Date();
  const daysSinceEpochUTC = Math.floor(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate()
  ) / (1000 * 60 * 60 * 24));

  const index = daysSinceEpochUTC % TOTAL;
  const character = String.fromCharCode(START + index);

  return {
    statusCode: 200,
    body: JSON.stringify({ character }),
  };
}