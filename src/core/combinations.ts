import { collect, integer, limit } from './validation';
import type { GenerationOptions } from '../types';

/** Exact binomial coefficient. Zero when size > total. */
export function countCombinations(total: number, size: number): bigint {
  integer(total, 'total');
  integer(size, 'size');
  if (size > total) return 0n;
  const k = Math.min(size, total - size);
  let count = 1n;
  for (let i = 1; i <= k; i++) {
    count = (count * BigInt(total - k + i)) / BigInt(i);
  }
  return count;
}

/** Positional combinations: duplicate input values remain distinct positions. */
export function* iterateCombinations<T>(
  items: readonly T[],
  size: number
): Generator<T[]> {
  integer(size, 'size');
  if (size > items.length) return;
  if (size === 0) {
    yield [];
    return;
  }
  const indices = Array.from({ length: size }, (_, i) => i);
  while (true) {
    yield indices.map((i) => items[i]!);
    let cursor = size - 1;
    while (cursor >= 0 && indices[cursor] === items.length - size + cursor)
      cursor--;
    if (cursor < 0) return;
    indices[cursor] = indices[cursor]! + 1;
    for (let i = cursor + 1; i < size; i++) indices[i] = indices[i - 1]! + 1;
  }
}

export function combinations<T>(
  items: readonly T[],
  size: number,
  options?: GenerationOptions
): T[][] {
  return collect(iterateCombinations(items, size), limit(options));
}

export function* iterateCartesianProduct<T>(
  arrays: readonly (readonly T[])[]
): Generator<T[]> {
  if (arrays.some((array) => array.length === 0)) return;
  const indices = arrays.map(() => 0);
  while (true) {
    yield arrays.map((array, i) => array[indices[i]!]!);
    let cursor = arrays.length - 1;
    while (cursor >= 0) {
      indices[cursor] = indices[cursor]! + 1;
      if (indices[cursor]! < arrays[cursor]!.length) break;
      indices[cursor] = 0;
      cursor--;
    }
    if (cursor < 0) return;
  }
}

export function cartesianProduct<T>(
  arrays: readonly (readonly T[])[],
  options?: GenerationOptions
): T[][] {
  return collect(iterateCartesianProduct(arrays), limit(options));
}

/** Depth-first iteration with an explicit stack; no recursion or input mutation. */
export function* iteratePermutations<T>(
  items: readonly T[],
  size = items.length
): Generator<T[]> {
  integer(size, 'size');
  if (size > items.length) return;
  if (size === 0) {
    yield [];
    return;
  }
  const indices: number[] = [];
  const next = [0];
  const used = new Set<number>();
  let depth = 0;
  while (depth >= 0) {
    if (depth === size) {
      yield indices.map((i) => items[i]!);
      depth--;
      used.delete(indices.pop()!);
      continue;
    }
    let candidate = next[depth]!;
    while (candidate < items.length && used.has(candidate)) candidate++;
    if (candidate === items.length) {
      next[depth] = 0;
      depth--;
      if (depth >= 0) used.delete(indices.pop()!);
    } else {
      next[depth] = candidate + 1;
      indices.push(candidate);
      used.add(candidate);
      depth++;
      next[depth] = 0;
    }
  }
}

export function permutations<T>(
  items: readonly T[],
  size = items.length,
  options?: GenerationOptions
): T[][] {
  return collect(iteratePermutations(items, size), limit(options));
}
