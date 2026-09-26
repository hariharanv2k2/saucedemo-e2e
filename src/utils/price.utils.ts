export function parsePrice(text: string): number {
  const match = text.match(/\$?([\d.]+)/);
  if (!match) {
    throw new Error(`Could not parse price from: "${text}"`);
  }
  return parseFloat(match[1]);
}
