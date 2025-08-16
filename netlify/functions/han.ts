export async function handler(event, context) {
  const START = 0x4E00;
  const END = 0x9FFF;
  const TOTAL = END - START + 1;

  // Generate a random index each time
  const index = Math.floor(Math.random() * TOTAL);
  const character = String.fromCharCode(START + index);

  return {
    statusCode: 200,
    body: JSON.stringify({ character }),
  };
}
