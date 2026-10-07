import type { GenerationOptions } from '../types';

export function integer(value: number, name: string): void {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new RangeError(`${name} must be a non-negative safe integer`);
  }
}

export function limit(options: GenerationOptions = {}): number {
  const value = options.maxResults ?? 100_000;
  integer(value, 'maxResults');
  return value;
}

export function collect<T>(iterator: Iterable<T>, maximum: number): T[] {
  const results: T[] = [];
  for (const value of iterator) {
    if (results.length >= maximum) {
      throw new RangeError(
        'Result exceeds maxResults; use an iterator or a larger limit'
      );
    }
    results.push(value);
  }
  return results;
}
