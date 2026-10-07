# 🧩 Combinare

<p align="center">
  <img src="./assets/logo.png" alt="Combinare Logo">
  <br />
  <strong>A versatile JavaScript/TypeScript library for type-safe combinations, permutations and Cartesian products.</strong>
  <br />
  Turn simple inputs into product variants, test scenarios and new possibilities, in your app or your terminal.
</p>

[![npm version](https://img.shields.io/npm/v/combinare)](https://www.npmjs.com/package/combinare)
[![CI](https://github.com/Hangell/combinare/actions/workflows/ci.yml/badge.svg)](https://github.com/Hangell/combinare/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](https://github.com/Hangell/combinare/blob/main/LICENSE)

**🇺🇸 English** · [🇧🇷 Português (Brasil)](https://github.com/Hangell/combinare/blob/main/docs/pt/README.md) · [🇪🇸 Español](https://github.com/Hangell/combinare/blob/main/docs/es/README.md) · [🇷🇺 Русский](https://github.com/Hangell/combinare/blob/main/docs/ru/README.md) · [🇨🇳 简体中文](https://github.com/Hangell/combinare/blob/main/docs/zh/README.md) · [🇮🇳 हिन्दी](https://github.com/Hangell/combinare/blob/main/docs/hi/README.md)

**Turn your inputs into possibilities.** Combinare is a TypeScript/JavaScript library for combinations, permutations and Cartesian products, with an optional CLI in the same npm package. Use it to generate product variants, build test matrices, select groups, explore ordered scenarios or create numeric samples without writing nested loops for every task.

[Choose the right operation](#choose-an-operation) · [Quick start](#quick-start) · [API at a glance](#api-reference) · [Optional CLI](#cli) · [Limits and error handling](#limits)

<a id="why-combinare"></a>

## Why Combinare?

- **One toolkit for different problems:** select a group, arrange its order, or choose one value from each independent dimension.
- **TypeScript support:** generic results, readonly array inputs, exported options and typed sorting keys.
- **No runtime dependencies:** use named functions or the familiar static `Combinare` facade.
- **Generate only what you need:** iterators let you process a few rows from a large space and stop early.
- **Explicit limits and predictable behavior:** eager generators cap their results; invalid numeric requests fail instead of retrying forever.
- **Library or terminal:** integrate the API into your application or run JSON commands from a shell.

<a id="choose-an-operation"></a>

## Choose the right operation

| Your goal                                                       | Choose                         | Example                                     |
| --------------------------------------------------------------- | ------------------------------ | ------------------------------------------- |
| Select a group where order does not matter                      | `combinations`                 | Teams of 2 from 3 people: 3 groups          |
| Select or arrange items where order matters                     | `permutations`                 | Ordered pairs from 3 items: 6 rows          |
| Choose one value from each independent list                     | `cartesianProduct`             | 2 sizes × 2 colors: 4 variants              |
| Recombine values observed in object attributes                  | `objectCombinations`           | Size/color combinations from sample objects |
| Request a limited number of distinct numeric rows               | `generateCombinationsNumerics` | 5 samples, each with 6 numbers from 1–49    |
| Know the number of unordered selections without allocating rows | `countCombinations`            | Exact C(100, 50) as BigInt                  |
| Order existing records by a key                                 | `sortByObjectForAttribute`     | Products ordered by price or availability   |

<a id="installation"></a>

## Installation

Requires **Node.js 22.14+**. The library can also be bundled for modern browsers supporting ES2022 and BigInt. Import the package entry point in your browser build; the CLI uses Node.js and is a separate entry point.

```sh
npm install combinare
# yarn add combinare
# pnpm add combinare
```

<a id="quick-start"></a>

## Quick start

Start with named imports. Combinations select items from one list; Cartesian products take one item from each list.

```ts
import { combinations, cartesianProduct } from 'combinare';

const pairs = combinations(['Alice', 'Bob', 'Carol'], 2);
console.log(pairs);
// [['Alice', 'Bob'], ['Alice', 'Carol'], ['Bob', 'Carol']]

const variants = cartesianProduct([
  ['S', 'L'],
  ['red', 'blue'],
]);
console.log(variants);
// [['S', 'red'], ['S', 'blue'], ['L', 'red'], ['L', 'blue']]
```

CommonJS works too. All public functions are also available as static methods on `Combinare`, so you can choose the import style that fits your project.

```js
const { Combinare, combinations } = require('combinare');
console.log(Combinare.countCombinations(4, 2).toString()); // '6'
console.log(combinations([1, 2, 3], 2)); // [[1, 2], [1, 3], [2, 3]]
```

<a id="cartesian-products"></a>

## Build product variants and test matrices

When dimensions are independent, a Cartesian product describes every possible configuration. This is useful for catalog variants, feature settings and parameterized tests. Here, two roles × two devices × two themes produce eight scenarios.

```ts
import { cartesianProduct } from 'combinare';

const scenarios = cartesianProduct([
  ['admin', 'member'],
  ['desktop', 'mobile'],
  ['light', 'dark'],
]).map(([role, device, theme]) => ({ role, device, theme }));

console.log(scenarios.length); // 8
console.log(scenarios[0]);
// { role: 'admin', device: 'desktop', theme: 'light' }
```

The last dimension varies fastest. Every row contains exactly one value from each input list. You can map these rows into domain objects and pass them to your own test runner or application.

<a id="combinations-and-permutations"></a>

## Select groups or explore orderings

Use combinations for teams, item bundles or subsets: `[A, B]` and `[B, A]` represent the same selection. Use permutations for sequences and assignments: changing the order creates a different result.

```ts
import { combinations, permutations } from 'combinare';

console.log(combinations(['A', 'B', 'C'], 2));
// [['A', 'B'], ['A', 'C'], ['B', 'C']]

console.log(permutations(['A', 'B', 'C'], 2));
// [['A', 'B'], ['A', 'C'], ['B', 'A'], ['B', 'C'], ['C', 'A'], ['C', 'B']]

console.log(permutations(['A', 'B']));
// [['A', 'B'], ['B', 'A']]
```

Both functions select without reusing an input position. Omit permutation size to arrange the full input. Pass a smaller size to generate ordered selections instead.

<a id="object-combinations"></a>

## Combine object attributes

Already have sample objects? Build variants from their shared attributes without extracting each value list yourself. Distinct values are collected per key and then recombined.

```ts
import { objectCombinations, Combinare } from 'combinare';

const samples = [
  { size: 'S', color: 'red' },
  { size: 'L', color: 'blue' },
];

console.log(objectCombinations(samples));
// [{ size: 'S', color: 'red' }, { size: 'S', color: 'blue' },
//  { size: 'L', color: 'red' }, { size: 'L', color: 'blue' }]

console.log(Combinare.generateCombinationsObjects([{ a: 1 }, { a: 2 }]));
// [[{ a: 1 }], [{ a: 2 }]]
```

**Attributes are combined independently.** The result may contain combinations that were not present in the samples; apply your own business rules when some values cannot be used together. Only own string keys listed by `Object.keys` on the first object and present on every object participate. The new function returns flat objects; the legacy method keeps singleton array wrappers.

<a id="numeric-samples"></a>

## Generate distinct numeric samples

Request a specific number of distinct rows from the range `1..total`. Every row has the requested length, contains no repeated number and is sorted ascending. Use this for simulations or sample data when enumerating the full numeric space is unnecessary.

```ts
import { generateCombinationsNumerics, countCombinations } from 'combinare';

const samples = generateCombinationsNumerics(49, 6, 5);
console.log(samples.length); // 5
console.log(samples.every((row) => row.length === 6)); // true
console.log(countCombinations(49, 6).toString()); // '13983816'

const repeatable = generateCombinationsNumerics(4, 2, 3, {
  random: () => 0.5,
});
console.log(repeatable); // [[1, 4], [2, 4], [2, 3]]
```

The default source is `Math.random`; you can inject `random: () => number` for reproducible tests. The source must return a finite value in `[0, 1)`. Generation terminates even with a constant source. Rank sampling has 53-bit precision and is **not cryptographic or uniformly exact**, especially in large spaces. Use it for sample data, not security tokens or regulated draws.

<a id="sorting"></a>

## Sort without changing your input

Sort records by a typed key and keep the original array order. Numeric and string values support ascending/descending order; booleans use `false < true`. The default order is `asc`.

```ts
import { sortByObjectForAttribute } from 'combinare';

const products = [
  { name: 'Keyboard', price: 75, inStock: true },
  { name: 'Mouse', price: 25, inStock: false },
];

const affordableFirst = sortByObjectForAttribute(products, 'price', 'asc');
console.log(affordableFirst[0]?.name); // 'Mouse'
console.log(products[0]?.name); // 'Keyboard'

const availableFirst = sortByObjectForAttribute(products, 'inStock', 'desc');
console.log(availableFirst[0]?.name); // 'Keyboard'
```

Sorting is stable for equal values. Prefer homogeneous, valid values for the selected key: mixed types, unsupported types and `NaN` compare equal. Strings use JavaScript lexical comparison, not locale collation. Objects inside the returned array retain their original references.

<a id="exact-counts"></a>

## Count before you generate

Combinatorial spaces grow quickly. Count unordered selections before deciding whether to collect everything or process an iterator. The result is an exact `bigint`, so large counts do not lose precision through a JavaScript `number`.

```ts
import { countCombinations } from 'combinare';

const total = countCombinations(100, 50);
console.log(total); // 100891344545564193334812497256n
console.log(JSON.stringify({ total: total.toString() }));
// {"total":"100891344545564193334812497256"}
```

`countCombinations` computes C(total, size), not the count of permutations or Cartesian products. It returns `0n` when size exceeds total and `1n` for size zero. BigInt is not directly JSON-serializable: use `.toString()` for JSON payloads. Exact counting has no workload cap; extremely large sizes can be expensive.

<a id="iterators"></a>

## Process large spaces with iterators

Use an eager function when you want an array now. Use an iterator when you want to process one row at a time, stop after a few results or avoid allocating the entire space. This example consumes just three of the 75,287,520 possible five-item selections.

```ts
import {
  iterateCombinations,
  iteratePermutations,
  iterateCartesianProduct,
} from 'combinare';

const items = Array.from({ length: 100 }, (_, i) => i + 1);
let processed = 0;
for (const row of iterateCombinations(items, 5)) {
  console.log(row);
  if (++processed === 3) break;
}

const firstOrder = iteratePermutations(['A', 'B', 'C']).next().value;
console.log(firstOrder); // ['A', 'B', 'C']

const firstVariant = iterateCartesianProduct([
  [1, 2],
  [3, 4],
]).next().value;
console.log(firstVariant); // [1, 3]
```

Iterators have no automatic row cap and do not sample randomly. You control when to stop. Collecting them with `Array.from()` allocates all results and bypasses eager limits. Keep input arrays and objects unchanged while iterating; validation occurs on the first `next()` call.

<a id="limits"></a>

## Limits and error handling

Eager generation defaults to **100,000 rows**. A result exceeding `maxResults` throws `RangeError`; it is never silently truncated. Raise the limit only when you can accommodate the full result, or choose an iterator.

```ts
import { cartesianProduct } from 'combinare';

const values = Array.from({ length: 400 }, (_, i) => i);
const rows = cartesianProduct([values, values], { maxResults: 200_000 });
console.log(rows.length); // 160000

try {
  cartesianProduct(
    [
      [1, 2],
      [3, 4],
    ],
    { maxResults: 3 }
  );
} catch (error) {
  console.log(error instanceof RangeError); // true
}
```

| Limit                            | Value / rule                                       |
| -------------------------------- | -------------------------------------------------- |
| Eager row count                  | 100,000 by default; configurable with `maxResults` |
| Numeric range (`total`)          | At most 1,000,000                                  |
| Numeric row length               | At most 1,000; cannot exceed total                 |
| Numeric output cells             | length × amount ≤ 10,000,000                       |
| Numeric sample count             | Cannot exceed maxResults or C(total, length)       |
| Numeric arguments and maxResults | Non-negative safe integers                         |
| CLI JSON input                   | At most 1 MiB                                      |

A row cap is not a total memory guarantee: column counts and value sizes also matter. A `maxResults` of zero only accepts outputs with no rows. Negative, fractional, non-finite, unsafe or impossible numeric requests fail promptly.

<a id="typescript"></a>

## TypeScript integration

All array inputs accept readonly arrays. Generic types follow your item values; use an explicit union when Cartesian dimensions contain different types. Exported types are `GenerationOptions`, `NumericOptions`, `RandomSource` and `SortOrder`.

```ts
import {
  cartesianProduct,
  generateCombinationsNumerics,
  sortByObjectForAttribute,
  type GenerationOptions,
  type NumericOptions,
  type RandomSource,
  type SortOrder,
} from 'combinare';

const options: GenerationOptions = { maxResults: 1_000 };
const mixed = cartesianProduct<string | number>(
  [
    ['S', 'L'],
    [1, 2],
  ],
  options
);

const random: RandomSource = () => 0.5;
const numeric: NumericOptions = { ...options, random };
generateCombinationsNumerics(10, 2, 3, numeric);

const products = [{ price: 20 }, { price: 10 }];
const order: SortOrder = 'asc';
sortByObjectForAttribute(products, 'price', order);
// @ts-expect-error: 'missing' is not a key of the product type
sortByObjectForAttribute(products, 'missing', order);
```

`GenerationOptions` contains `maxResults?: number`; `NumericOptions` adds `random?: RandomSource`. `SortOrder` is `'asc' | 'desc'`. Sorting keys are constrained to `keyof T`, so invalid property names can be caught before execution.

<a id="api-reference"></a>

## API at a glance

These are named exports and static methods on `Combinare`. `T` is inferred from your values; object functions require `T extends object`. Options are optional unless shown otherwise.

| Function                                                                                 | Returns          | Purpose                              |
| ---------------------------------------------------------------------------------------- | ---------------- | ------------------------------------ |
| `combinations(items, size, options?)`                                                    | `T[][]`          | Unordered positional selections      |
| `permutations(items, size = items.length, options?)`                                     | `T[][]`          | Ordered positional selections        |
| `cartesianProduct(arrays, options?)`                                                     | `T[][]`          | One item per dimension               |
| `objectCombinations(objects, options?)`                                                  | `T[]`            | Recombined shared attributes         |
| `generateCombinationsNumerics(total, combinationLength, numberOfCombinations, options?)` | `number[][]`     | Distinct sorted numeric samples      |
| `countCombinations(total, size)`                                                         | `bigint`         | Exact number of unordered selections |
| `sortByObjectForAttribute(items, attribute, order = 'asc')`                              | `T[]`            | A stable sorted copy                 |
| `iterateCombinations(items, size)`                                                       | `Generator<T[]>` | Lazy unordered selections            |
| `iteratePermutations(items, size = items.length)`                                        | `Generator<T[]>` | Lazy ordered selections              |
| `iterateCartesianProduct(arrays)`                                                        | `Generator<T[]>` | Lazy Cartesian rows                  |

### Original method names

- `Combinare.generateCombinationsArrays(arrays, options?)` aliases `cartesianProduct` and returns `T[][]`.
- `Combinare.generateCombinationsObjects(objects, options?)` wraps each `objectCombinations` result in an array and returns `T[][]`.
- `Combinare.generateCombinationsNumerics(...)` and `Combinare.sortByObjectForAttribute(...)` keep their original names.

See the [detailed API reference](https://github.com/Hangell/combinare/blob/main/docs/API.md) for validation, equality and type contracts, and the [architecture guide](https://github.com/Hangell/combinare/blob/main/docs/ARCHITECTURE.md) for module responsibilities.

<a id="cli"></a>

## Optional CLI

Use the same package directly from your terminal. Importing the library does not execute the CLI. JSON commands produce data you can redirect into files or pass to another program.

```sh
npx combinare --help
npx combinare combinations '[1,2,3]' 2
# [[1,2],[1,3],[2,3]]
npx combinare cartesian '[["S","L"],["red","blue"]]'
npx combinare permutations '["A","B","C"]' 2
npx combinare objects '[{"a":1},{"a":2}]'
npx combinare numbers 49 6 5
npx combinare sort '[{"price":20},{"price":10}]' price asc
npx combinare count 100 50
npx combinare cartesian '[[1,2],[3,4]]' --max-results 4
```

```sh
npm install --global combinare
combinare --version
combinare combinations '[1,2,3]' 2 > pairs.json
```

| Command                                                    | Output                                             |
| ---------------------------------------------------------- | -------------------------------------------------- |
| `combinare numbers <total> <length> <amount>`              | Distinct sorted numeric rows                       |
| `combinare combinations <json-array> <length>`             | Unordered selections as JSON                       |
| `combinare permutations <json-array> [length]`             | Ordered selections as JSON; full length by default |
| `combinare cartesian <json-array-of-arrays>`               | Cartesian rows as JSON                             |
| `combinare objects <json-array-of-objects>`                | Flat recombined objects as JSON                    |
| `combinare sort <json-array-of-objects> <key> [asc\|desc]` | Sorted records as JSON; asc by default             |
| `combinare count <total> <length>`                         | Exact integer as decimal text                      |
| `combinare --help`                                         | Usage and examples                                 |
| `combinare --version`                                      | Installed package version                          |

Successful commands write to **stdout** and exit with code **0**. Errors write to **stderr**, exit with code **1** and produce no partial stdout. `--max-results <integer>` sets the eager generation row limit. There is no interactive prompt or file/stdin input; pass JSON as a command argument. Examples use POSIX shell quoting; adapt quotes for your terminal. During development, use `npm run build` then `node dist/cli.js --help`. These docs describe the 2.x source; `npx` uses the version available on npm.

<a id="behavior"></a>

## Empty inputs, duplicates and references

| Input or behavior                             | Result                                                                         |
| --------------------------------------------- | ------------------------------------------------------------------------------ |
| `combinations([], 0)` / `permutations([], 0)` | `[[]]`: one empty selection                                                    |
| `cartesianProduct([])`                        | `[[]]`: one empty product                                                      |
| Cartesian product containing an empty factor  | `[]`: no possible row                                                          |
| Selection size greater than input length      | `[]` for combinations/permutations; numeric generation throws                  |
| `objectCombinations([])`                      | `[]`                                                                           |
| Nonempty object input with no shared keys     | `[{}]`                                                                         |
| Duplicate values in combinations/permutations | Positions are distinct; equal-valued rows can repeat                           |
| Duplicate values in Cartesian factors         | Preserved                                                                      |
| Object attribute values                       | Deduplicated with `Set` / SameValueZero; object references compare by identity |
| Input mutation                                | None; returned rows/arrays are new, but nested values are not deep-cloned      |

<a id="migration"></a>

## Migrating from 1.x

The original facade names remain, but **2.0 changes some behaviors**:

- Assign the result of `sortByObjectForAttribute`: the source array is no longer sorted in place.
- Import `Combinare` explicitly. Imports no longer assign `window.Combinare` or `global.Combinare`.
- Replace direct use of the old `dist/combinare.min.js` browser bundle with a package import in your bundler.
- Use `maxResults` or iterators when generating more than 100,000 rows.
- Handle `RangeError` for invalid or impossible numeric requests.
- Object generation uses shared own keys and `Set` equality; use `objectCombinations` for flat results or the legacy facade for wrapped results.

The full migration notes are in [CHANGELOG](https://github.com/Hangell/combinare/blob/main/CHANGELOG.md). The source is prepared as 2.0.0; documentation updates do not publish a release.

<a id="development"></a>

## Development and contributions

Use Node.js 22.14+ or 24 and npm. `check` runs ESLint, Prettier, TypeScript, coverage checks (90% minimum for lines, branches and functions) and an installed-tarball consumer check for CommonJS, ESM imports, declarations and the npm executable. Husky runs lint-staged and Conventional Commits validation for development commits. See [CONTRIBUTING](https://github.com/Hangell/combinare/blob/main/CONTRIBUTING.md) for setup, releases and translation updates.

```sh
npm ci
npm run check
npm run build
node dist/cli.js --help
```

<a id="community"></a>

## Community, author and license

Contributions to examples, documentation, tests and APIs are welcome. Follow the [Code of Conduct](https://github.com/Hangell/combinare/blob/main/CODE_OF_CONDUCT.md), report ordinary bugs through [GitHub issues](https://github.com/Hangell/combinare/issues), and report vulnerabilities privately according to the [Security Policy](https://github.com/Hangell/combinare/blob/main/SECURITY.md).

The name **Combinare** comes from the Latin verb meaning “to combine” or “to join together”. Created by [Rodrigo Rangel / Hangell](https://github.com/Hangell) · [hangell.org](https://hangell.org). Released under the [MIT License](https://github.com/Hangell/combinare/blob/main/LICENSE).

Support: PIX `rodrigo@hangell.org` · Crypto/NFT `0xEd4d1be72F807Faa358C966a8eF63367c200130F`.
