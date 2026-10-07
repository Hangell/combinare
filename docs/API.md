# API reference

All functions below are named exports and static methods on `Combinare`, except the two facade-only aliases generateCombinationsArrays and generateCombinationsObjects. All array inputs accept readonly arrays. Generation leaves inputs unchanged and copies outer result arrays; object values remain shared references.

| Function                                                                                 | Result           | Contract                                               |
| ---------------------------------------------------------------------------------------- | ---------------- | ------------------------------------------------------ |
| `countCombinations(total, size)`                                                         | `bigint`         | Exact C(n,k); zero when k > n; C(0,0) = 1              |
| `combinations(items, size, options?)`                                                    | `T[][]`          | Lexicographic index order, without replacement         |
| `permutations(items, size = items.length, options?)`                                     | `T[][]`          | Ordered selections without replacement                 |
| `cartesianProduct(arrays, options?)`                                                     | `T[][]`          | One value per factor; last factor varies fastest       |
| `objectCombinations(objects, options?)`                                                  | `T[]`            | Cartesian product of distinct shared own-key values    |
| `iterateCombinations(items, size)`                                                       | `Generator<T[]>` | Lazy combinations                                      |
| `iteratePermutations(items, size?)`                                                      | `Generator<T[]>` | Lazy permutations                                      |
| `iterateCartesianProduct(arrays)`                                                        | `Generator<T[]>` | Lazy Cartesian product                                 |
| `generateCombinationsNumerics(total, combinationLength, numberOfCombinations, options?)` | `number[][]`     | Distinct sorted rows from 1..total                     |
| `sortByObjectForAttribute(items, attribute, order = 'asc')`                              | `T[]`            | Stable copied array; key is keyof T; order is asc/desc |

Legacy facade methods: `Combinare.generateCombinationsArrays` aliases cartesianProduct; `Combinare.generateCombinationsObjects` wraps each objectCombinations result in a singleton array. `generateCombinationsNumerics` and sorting retain their existing names. No globals are registered.

## Parameters by operation

### combinations and permutations

- `items: readonly T[]`: source positions; the source array is not modified.
- `size: number`: how many positions to select. Required for combinations; defaults to items.length for permutations.
- `options?: GenerationOptions`: the eager row budget.

Both select without replacement. Combinations emit increasing input-index selections; permutations distinguish each order. The functions do not remove equal input values: `combinations([1, 1], 1)` returns `[[1], [1]]`. Use a deduplicated input if equal primitive values should represent one choice.

### cartesianProduct

- `arrays: readonly (readonly T[])[]`: one list per independent dimension.
- `options?: GenerationOptions`: the eager row budget.

Each row chooses one value from every dimension. The last dimension varies fastest. For dimensions containing different types, use an explicit union such as `cartesianProduct<string | number>([['S', 'L'], [1, 2]])`. The row count is the product of dimension lengths; it is not a binomial coefficient.

### objectCombinations

- `objects: readonly T[]`, with `T extends object`: sample objects whose observed values will be recombined.
- `options?: GenerationOptions`: the eager row budget.

Keys come from `Object.keys` of the first object, filtered to keys present as own properties on every object. Symbols and inherited properties are excluded. Values are deduplicated with Set. Attributes vary independently, so outputs may not be valid domain configurations even if the sample objects were valid. Apply domain validation yourself, including when attributes have correlated types or values. Objects and nested values are not deep-cloned.

The flat function returns `T[]`; `Combinare.generateCombinationsObjects` returns singleton wrappers, `T[][]`.

### generateCombinationsNumerics

- `total: number`: upper bound of the integer range 1..total.
- `combinationLength: number`: number of distinct values in each row.
- `numberOfCombinations: number`: number of distinct rows to request.
- `options?: NumericOptions`: maxResults and an optional random source.

Rows are distinct, sorted ascending internally, and emitted in sampling order. Impossible requests throw before sampling. For example, total = 4 and length = 2 allow at most six distinct rows. The empty combination is valid: total = 0, length = 0 and amount = 1 return `[[]]`.

### countCombinations

- `total: number`: number of available positions.
- `size: number`: number of positions in an unordered selection.

Returns the exact binomial coefficient C(total, size) as bigint without generating rows. It counts combinations, not permutations or Cartesian products. Convert to decimal text with `.toString()` before JSON serialization; converting a large result to Number may lose precision. No generation row limit applies to counting, so very large sizes can require substantial work.

### sortByObjectForAttribute

- `items: readonly T[]`, with `T extends object`: records to order.
- `attribute: keyof T`: sorting key, checked by TypeScript.
- `order: SortOrder`: asc or desc, default asc.

Returns a new outer array and retains the original object references. Equal values keep their order. Matching numbers and strings use JavaScript comparison; booleans use false < true. Mixed/unsupported types and NaN compare equal, so choose homogeneous valid values. String order is lexical, not locale-sensitive.

### Lazy iterators

iterateCombinations, iteratePermutations and iterateCartesianProduct accept the same source arguments as their eager counterparts, without options. They return Generator<T[]> and validate arguments on the first next() call. Each yielded row is a new array. Stop with break, return() or a bounded consumer; do not mutate sources mid-iteration. Array.from() consumes the whole space and does not enforce eager budgets.

## Options and validation

`GenerationOptions = { maxResults?: number }` defaults to 100,000. Eager functions throw RangeError rather than truncate. Limits must be non-negative safe integers; maxResults = 0 accepts only results with no rows. Iterators have no row cap and validate on their first next() call. Consumers control termination. Inputs and objects must stay unchanged while an iterator is in progress.

`NumericOptions` adds `random?: () => number`, returning a finite value in [0,1). Defaults to Math.random. Sampling uses 53-bit rank precision, is not exact uniform sampling and is not cryptographic. Output order is sampling order; values inside each row are ascending. The algorithm terminates even for constant random sources.

Numeric total <= 1,000,000; length <= 1,000; length × amount <= 10,000,000. Amount must not exceed maxResults or C(total,length). Count and size arguments must be non-negative safe integers. The standalone count function has no workload cap: exact counts for enormous k can be expensive.

## Empty inputs and equality

- combinations([], 0), permutations([], 0) and cartesianProduct([]) return `[[]]`.
- A selection larger than the input returns `[]`; numeric generation instead rejects length > total.
- Cartesian products with an empty factor return `[]`.
- objectCombinations([]) returns `[]`; nonempty inputs with no shared keys return `[{}]`.
- Combinations/permutations are positional, so duplicates may repeat rows. Cartesian products preserve duplicates.
- Object values use Set/SameValueZero equality (NaN deduplicates, object references compare by identity). Object.fromEntries safely creates own properties including `__proto__`.
- Sorting compares matching string/number types using `<` and `>`, and booleans using false < true. Other/mixed types and NaN compare equal. Prefer homogeneous, valid values for meaningful order. Strings use JavaScript lexical order, not locale collation.

## TypeScript example

```ts
import {
  combinations,
  cartesianProduct,
  sortByObjectForAttribute,
} from 'combinare';
const values: readonly number[] = [1, 2, 3];
const rows: number[][] = combinations(values, 2);
const mixed = cartesianProduct<string | number>([
  ['a', 'b'],
  [1, 2],
]);
const sorted = sortByObjectForAttribute([{ id: 2 }, { id: 1 }], 'id');
```

## Errors and handling

Invalid size/count/limit values throw RangeError. Numeric generation additionally rejects requests larger than the available space or its fixed safety limits. An eager limit is an error threshold, not a request to return the first N results. For a prefix of a large space, use an iterator and stop early.

```ts
import { combinations, iterateCombinations } from 'combinare';

try {
  combinations([1, 2, 3], 2, { maxResults: 2 });
} catch (error) {
  if (!(error instanceof RangeError)) throw error;
}

const iterator = iterateCombinations([1, 2, 3], 2);
console.log(iterator.next().value); // [1, 2]
iterator.return(undefined);
```

## More examples

The [English README](https://github.com/Hangell/combinare/blob/main/README.md) includes practical recipes, the CLI reference and migration notes. Translations: [🇧🇷 Português (Brasil)](https://github.com/Hangell/combinare/blob/main/docs/pt/README.md), [🇪🇸 Español](https://github.com/Hangell/combinare/blob/main/docs/es/README.md), [🇷🇺 Русский](https://github.com/Hangell/combinare/blob/main/docs/ru/README.md), [🇨🇳 简体中文](https://github.com/Hangell/combinare/blob/main/docs/zh/README.md), [🇮🇳 हिन्दी](https://github.com/Hangell/combinare/blob/main/docs/hi/README.md).
