import { iterateCartesianProduct } from './combinations';
import { collect, limit } from './validation';
import type { GenerationOptions, SortOrder } from '../types';

/** Combine own, enumerable keys shared by all input objects. */
export function objectCombinations<T extends object>(
  objects: readonly T[],
  options?: GenerationOptions
): T[] {
  const maximum = limit(options);
  if (objects.length === 0) return [];
  const keys = Object.keys(objects[0]!).filter((key) =>
    objects.every((obj) => Object.hasOwn(obj, key))
  ) as (keyof T & string)[];
  const arrays = keys.map((key) =>
    Array.from(new Set(objects.map((obj) => obj[key])))
  );
  return collect(
    (function* () {
      for (const values of iterateCartesianProduct(arrays)) {
        // fromEntries defines data properties, including __proto__, without setters.
        yield Object.fromEntries(keys.map((key, i) => [key, values[i]])) as T;
      }
    })(),
    maximum
  );
}

export function sortByObjectForAttribute<T extends object>(
  items: readonly T[],
  attribute: keyof T,
  order: SortOrder = 'asc'
): T[] {
  if (order !== 'asc' && order !== 'desc')
    throw new RangeError('order must be asc or desc');
  const direction = order === 'asc' ? 1 : -1;
  return [...items].sort((a, b) => {
    const left = a[attribute];
    const right = b[attribute];
    if (typeof left !== typeof right) return 0;
    if (typeof left === 'boolean' && typeof right === 'boolean')
      return (Number(left) - Number(right)) * direction;
    if (
      (typeof left === 'number' && typeof right === 'number') ||
      (typeof left === 'string' && typeof right === 'string')
    ) {
      return (left < right ? -1 : left > right ? 1 : 0) * direction;
    }
    return 0;
  });
}
