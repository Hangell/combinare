import {
  cartesianProduct,
  combinations,
  countCombinations,
  iterateCartesianProduct,
  iterateCombinations,
  iteratePermutations,
  permutations,
} from './core/combinations';
import { generateCombinationsNumerics } from './core/numeric';
import { objectCombinations, sortByObjectForAttribute } from './core/objects';
import type { GenerationOptions } from './types';

/** Compatibility facade; functions and iterators can also be imported individually. */
export class Combinare {
  static generateCombinationsNumerics = generateCombinationsNumerics;
  static generateCombinationsArrays = cartesianProduct;
  static generateCombinationsObjects<T extends object>(
    objects: readonly T[],
    options?: GenerationOptions
  ): T[][] {
    return objectCombinations(objects, options).map((object) => [object]);
  }
  static sortByObjectForAttribute = sortByObjectForAttribute;
  static combinations = combinations;
  static permutations = permutations;
  static cartesianProduct = cartesianProduct;
  static objectCombinations = objectCombinations;
  static countCombinations = countCombinations;
  static iterateCombinations = iterateCombinations;
  static iteratePermutations = iteratePermutations;
  static iterateCartesianProduct = iterateCartesianProduct;
}
