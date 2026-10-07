import { countCombinations } from './combinations';
import { integer, limit } from './validation';
import type { NumericOptions, RandomSource } from '../types';

function randomBelow(maximum: bigint, random: RandomSource): bigint {
  const value = random();
  if (!Number.isFinite(value) || value < 0 || value >= 1) {
    throw new RangeError('random must return a finite number in [0, 1)');
  }
  // Bounded sampling even for constant random sources. 53-bit precision.
  return (BigInt(Math.floor(value * 2 ** 53)) * maximum) / (1n << 53n);
}

function unrank(total: number, size: number, rank: bigint): number[] {
  const result: number[] = [];
  let start = 1;
  for (let remaining = size; remaining > 0; remaining--) {
    const block = countCombinations(total - start + 1, remaining);
    // Binary search cumulative lexicographic blocks instead of walking the range.
    let low = start;
    let high = total - remaining + 1;
    while (low < high) {
      const middle = Math.floor((low + high + 1) / 2);
      const skipped = block - countCombinations(total - middle + 1, remaining);
      if (skipped <= rank) low = middle;
      else high = middle - 1;
    }
    rank -= block - countCombinations(total - low + 1, remaining);
    result.push(low);
    start = low + 1;
  }
  return result;
}

export function generateCombinationsNumerics(
  total: number,
  size: number,
  amount: number,
  options: NumericOptions = {}
): number[][] {
  integer(total, 'total');
  integer(size, 'combinationLength');
  integer(amount, 'numberOfCombinations');
  if (size > total)
    throw new RangeError('combinationLength cannot exceed total');
  if (total > 1_000_000 || size > 1_000)
    throw new RangeError(
      'Numeric generation supports total <= 1000000 and length <= 1000'
    );
  const maximum = limit(options);
  if (amount > maximum || BigInt(size) * BigInt(amount) > 10_000_000n)
    throw new RangeError('Numeric result exceeds safety limits');
  const possible = countCombinations(total, size);
  if (BigInt(amount) > possible)
    throw new RangeError('Requested more combinations than exist');
  const random = options.random ?? Math.random;
  const ranks = new Set<bigint>();
  // Floyd sampling: exactly amount iterations, without duplicate retries.
  for (let j = possible - BigInt(amount); j < possible; j++) {
    const rank = randomBelow(j + 1n, random);
    ranks.add(ranks.has(rank) ? j : rank);
  }
  return Array.from(ranks, (rank) => unrank(total, size, rank));
}
