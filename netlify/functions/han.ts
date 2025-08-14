// api/random-character.ts
export async function handler(event, context) {
  // Main CJK Unified Ideographs range
  const START = 0x4E00;
  const END = 0x9FFF;

  // Generate a random code point
  const codePoint = Math.floor(Math.random() * (END - START + 1)) + START;

  // Convert to character
  const character = String.fromCharCode(codePoint);

  return {
    statusCode: 200,
    body: JSON.stringify({ character }),
  };
}