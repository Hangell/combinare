import { integer } from './core/validation';

/** Legacy deep-import helpers; prefer the package's public exports. */
export class Utils {
  static generateArray(total: number): number[] {
    integer(total, 'total');
    if (total > 1_000_000) throw new RangeError('total exceeds 1000000');
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  static getRandomSubset(
    array: readonly number[],
    subsetLength: number
  ): number[] {
    integer(subsetLength, 'subsetLength');
    if (subsetLength > array.length)
      throw new RangeError('subsetLength exceeds array length');
    const copy = [...array];
    for (let i = 0; i < subsetLength; i++) {
      const index = i + Math.floor(Math.random() * (copy.length - i));
      [copy[i], copy[index]] = [copy[index]!, copy[i]!];
    }
    return copy.slice(0, subsetLength);
  }
  static arraysAreEqual(
    left: readonly number[],
    right: readonly number[]
  ): boolean {
    return (
      left.length === right.length &&
      left.every((value, i) => value === right[i])
    );
  }
}
