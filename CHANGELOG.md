# Changelog

## 2.0.0 — pending publication

### Added

- Named functions and static facade methods: combinations, permutations, cartesianProduct, objectCombinations and exact BigInt countCombinations.
- Lazy iterateCombinations, iteratePermutations and iterateCartesianProduct generators.
- Optional combinare CLI with numbers, combinations, permutations, cartesian, objects, sort and count commands.
- Expanded npm-facing English README and complete Brazilian Portuguese, Spanish, Russian, Simplified Chinese and Hindi guides, with practical recipes, API/CLI references and language navigation.
- Strict TypeScript, lint/format hooks, Conventional Commits, unit/CLI/package checks, community policies and root-based npm packaging.

### Fixed

- Numeric requests that cannot be satisfied now fail instead of retrying forever. Rank sampling takes a fixed number of iterations and supports injected random sources.
- Empty object input, shared own properties, cyclic attribute values and prototype-sensitive keys are supported without JSON-stringify deduplication.
- Boolean sorting preserves equality and stable order.
- Publication uses a lockfile, validation and the generated tarball, and skips already published versions.

### Breaking changes and migration

- Node.js 22.14+ is required for development and CLI. Browser consumers need ES2022/BigInt support and a bundler.
- Imports no longer write `global.Combinare` or `window.Combinare`. Use `import { Combinare } from 'combinare'` or `const { Combinare } = require('combinare')`. Applications requiring a global can assign it themselves.
- The old dist/combinare.min.js browser bundle is no longer generated. Import the npm entry point in your browser build.
- sortByObjectForAttribute returns a new array. Assign its return value; the original array remains unchanged.
- Eager generation defaults to 100,000 rows. Use maxResults explicitly or switch to iterators. Numeric generation also caps range, length and output cells.
- Invalid numeric inputs throw RangeError, including length > total and requests exceeding the exact count.
- Object generation combines only own enumerable keys present in every input object. Empty input returns []. The legacy method still returns singleton wrappers (T[][]); the new objectCombinations method returns flat objects (T[]).
- Attribute values use Set equality rather than JSON serialization; distinct object references remain distinct. No deep cloning is performed.
- sortByObjectForAttribute constrains the attribute to keyof T. Unsupported or mixed value types compare equal; numeric NaN also compares equal.

## 1.0.0

Original numeric, array and object combination methods, and object sorting facade.
