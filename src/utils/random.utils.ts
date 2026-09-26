// Seeded PRNG (mulberry32) for reproducible randomness across test runs
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

let currentSeed: number | undefined;

export function getTestSeed(): number {
  if (currentSeed === undefined) {
    currentSeed = Number(process.env.TEST_SEED) || Date.now();
  }
  return currentSeed;
}

export function pickRandom<T>(items: T[], count = 1, seed?: number): T[] {
  const rng = mulberry32(seed ?? getTestSeed());
  const shuffled = [...items].sort(() => rng() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
