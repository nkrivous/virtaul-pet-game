export function getRandomFromList<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}

export function normalizeSum(a: number, b: number): number {
  const result = a + b;

  const min = Math.max(0, result);
  const max = Math.min(100, min);

  return max;
}
