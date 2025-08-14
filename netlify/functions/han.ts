
export async function handler(event, context) {
  const START = 0x4E00;
  const END = 0x9FFF;
  const TOTAL = END - START + 1;

  // 1️⃣ Get today's date as a number (e.g., days since epoch)
  const today = new Date();
  const daysSinceEpoch = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));

  // 2️⃣ Use it to pick a consistent index
  const index = daysSinceEpoch % TOTAL;

  // 3️⃣ Convert to character
  const character = String.fromCharCode(START + index);

  return {
    statusCode: 200,
    body: JSON.stringify({ character }),
  };
}