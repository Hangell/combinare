import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  Combinare,
  combinations,
  countCombinations,
  cartesianProduct,
  iterateCartesianProduct,
  iterateCombinations,
  iteratePermutations,
  permutations,
  objectCombinations,
  sortByObjectForAttribute,
  generateCombinationsNumerics,
} from '../../src';
import { Utils } from '../../src/utils';

test('legacy names preserve result shapes and new functions agree', () => {
  assert.deepEqual(Combinare.generateCombinationsArrays([[1, 2], [3]]), [
    [1, 3],
    [2, 3],
  ]);
  const objects = [
    { a: 1, b: 'x' },
    { a: 2, b: 'y' },
  ];
  assert.deepEqual(
    Combinare.generateCombinationsObjects(objects),
    objectCombinations(objects).map((value) => [value])
  );
  assert.equal(Combinare.combinations, combinations);
  assert.equal(Combinare.permutations, permutations);
  assert.equal(Combinare.countCombinations, countCombinations);
  assert.equal(Object.hasOwn(globalThis, 'Combinare'), false);
});

test('Cartesian product handles empty identity, empty factors and preserves duplicates', () => {
  assert.deepEqual(cartesianProduct([]), [[]]);
  assert.deepEqual(cartesianProduct([[1], []]), []);
  assert.deepEqual(cartesianProduct([[1, 1], [2]]), [
    [1, 2],
    [1, 2],
  ]);
  const inputs = Object.freeze([Object.freeze([1, 2]), Object.freeze([3, 4])]);
  assert.deepEqual(cartesianProduct(inputs), [
    [1, 3],
    [1, 4],
    [2, 3],
    [2, 4],
  ]);
  assert.deepEqual(
    Array.from(iterateCartesianProduct(inputs)),
    cartesianProduct(inputs)
  );
});

test('exact counts and combinations follow binomial identities', () => {
  assert.equal(countCombinations(100, 50), 100891344545564193334812497256n);
  for (let n = 0; n <= 8; n++)
    for (let k = 0; k <= n + 1; k++) {
      const items = Array.from({ length: n }, (_, i) => i);
      const result = combinations(items, k);
      assert.equal(BigInt(result.length), countCombinations(n, k));
      assert.equal(
        new Set(result.map((row) => row.join(','))).size,
        result.length
      );
      assert(
        result.every(
          (row) =>
            row.length === k && row.every((v, i) => i === 0 || v > row[i - 1]!)
        )
      );
      assert.deepEqual(Array.from(iterateCombinations(items, k)), result);
    }
  assert.deepEqual(combinations(['a', 'b', 'c'], 2), [
    ['a', 'b'],
    ['a', 'c'],
    ['b', 'c'],
  ]);
  assert.deepEqual(combinations([1, 1], 1), [[1], [1]]);
});

test('permutations preserve positions and match factorial counts', () => {
  assert.deepEqual(permutations([1, 2]), [
    [1, 2],
    [2, 1],
  ]);
  assert.deepEqual(permutations([], 0), [[]]);
  assert.deepEqual(permutations([1], 2), []);
  assert.deepEqual(permutations([1, 1]), [
    [1, 1],
    [1, 1],
  ]);
  for (let n = 0; n <= 6; n++)
    for (let k = 0; k <= n; k++) {
      const items = Object.freeze(Array.from({ length: n }, (_, i) => i));
      const rows = permutations(items, k);
      let expected = 1;
      for (let i = 0; i < k; i++) expected *= n - i;
      assert.equal(rows.length, expected);
      assert.equal(new Set(rows.map((row) => row.join(','))).size, rows.length);
      assert(rows.every((row) => new Set(row).size === k));
      assert.deepEqual(Array.from(iteratePermutations(items, k)), rows);
    }
});

test('iterators allow bounded consumption without eager expansion or recursion', () => {
  const iterator = iterateCartesianProduct(
    Array.from({ length: 10_000 }, () => [1])
  );
  assert.equal(iterator.next().value?.length, 10_000);
  iterator.return(undefined);
  const perm = iteratePermutations(Array.from({ length: 1000 }, (_, i) => i));
  assert.equal(perm.next().value?.length, 1000);
  perm.return(undefined);
});

test('numeric sampling terminates with constant sources, exhausts small spaces and respects ranges', () => {
  for (let n = 0; n <= 7; n++)
    for (let k = 0; k <= n; k++) {
      const expected = combinations(Utils.generateArray(n), k);
      for (const random of [() => 0, () => 0.5, () => 0.9999999999999999]) {
        const rows = generateCombinationsNumerics(n, k, expected.length, {
          random,
        });
        assert.deepEqual(
          rows.map((row) => row.join(',')).sort(),
          expected.map((row) => row.join(',')).sort()
        );
      }
    }
  const rows = Combinare.generateCombinationsNumerics(49, 6, 20);
  assert.equal(new Set(rows.map((row) => row.join(','))).size, 20);
  assert(
    rows.every(
      (row) =>
        row.length === 6 &&
        row.every((v, i) => v >= 1 && v <= 49 && (i === 0 || v > row[i - 1]!))
    )
  );
  assert.deepEqual(generateCombinationsNumerics(10, 2, 0), []);
  assert.equal(
    generateCombinationsNumerics(1_000_000, 2, 1, { random: () => 0.5 })[0]
      ?.length,
    2
  );
});

test('invalid requests and eager safety limits fail explicitly', () => {
  for (const value of [-1, 0.1, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1]) {
    assert.throws(() => countCombinations(value, 1), RangeError);
    assert.throws(() => countCombinations(5, value), RangeError);
    assert.throws(() => combinations([], value), RangeError);
    assert.throws(() => permutations([], value), RangeError);
    assert.throws(() => generateCombinationsNumerics(5, 2, value), RangeError);
  }
  assert.throws(() => generateCombinationsNumerics(2, 3, 1), RangeError);
  assert.throws(() => generateCombinationsNumerics(2, 1, 3), RangeError);
  assert.throws(
    () => generateCombinationsNumerics(1_000_001, 2, 1),
    RangeError
  );
  assert.throws(() => generateCombinationsNumerics(2000, 1001, 1), RangeError);
  assert.throws(
    () => generateCombinationsNumerics(2000, 1000, 10_001),
    RangeError
  );
  assert.throws(
    () => generateCombinationsNumerics(20, 1, 2, { maxResults: 1 }),
    RangeError
  );
  for (const value of [-1, 1, NaN, Infinity])
    assert.throws(
      () => generateCombinationsNumerics(4, 2, 1, { random: () => value }),
      RangeError
    );
  assert.throws(
    () => cartesianProduct([[1, 2]], { maxResults: 1 }),
    RangeError
  );
  assert.throws(() => combinations([1, 2], 1, { maxResults: 1 }), RangeError);
  assert.throws(() => permutations([1, 2], 1, { maxResults: 1 }), RangeError);
  assert.throws(
    () => objectCombinations([{ a: 1 }, { a: 2 }], { maxResults: 1 }),
    RangeError
  );
  assert.throws(() => cartesianProduct([], { maxResults: -1 }), RangeError);
  assert.deepEqual(cartesianProduct([[]], { maxResults: 0 }), []);
});

test('object combinations use shared own keys, handle empty objects and prototype keys safely', () => {
  assert.deepEqual(objectCombinations([]), []);
  assert.deepEqual(objectCombinations([{}]), [{}]);
  assert.deepEqual(objectCombinations([{ a: 1, b: 2 }, { a: 3 }]), [
    { a: 1 },
    { a: 3 },
  ]);
  const reference = { value: 1 };
  const cyclic: { self?: unknown } = {};
  cyclic.self = cyclic;
  assert.deepEqual(objectCombinations([{ a: reference }, { a: reference }]), [
    { a: reference },
  ]);
  assert.equal(objectCombinations([{ a: cyclic }])[0]?.a, cyclic);
  const hostile = JSON.parse(
    '{"__proto__":{"polluted":true},"constructor":"safe"}'
  ) as object;
  const row = objectCombinations([hostile])[0]!;
  assert.equal(Object.getPrototypeOf(row), Object.prototype);
  assert.equal(Object.hasOwn(row, '__proto__'), true);
  assert.equal(Object.hasOwn({}, 'polluted'), false);
  const inherited = Object.create({ a: 7 }) as { a: number };
  assert.deepEqual(objectCombinations([{ a: 1 }, inherited]), [{}]);
});

test('sort is stable, typed and immutable for supported values', () => {
  const input = Object.freeze([
    { v: true, id: 1 },
    { v: true, id: 2 },
    { v: false, id: 3 },
  ]);
  assert.deepEqual(
    sortByObjectForAttribute(input, 'v').map((row) => row.id),
    [3, 1, 2]
  );
  assert.deepEqual(
    sortByObjectForAttribute(input, 'v', 'desc').map((row) => row.id),
    [1, 2, 3]
  );
  assert.deepEqual(
    input.map((row) => row.id),
    [1, 2, 3]
  );
  assert.deepEqual(
    sortByObjectForAttribute([{ v: 3 }, { v: 1 }, { v: 1 }], 'v').map(
      (row) => row.v
    ),
    [1, 1, 3]
  );
  assert.deepEqual(
    sortByObjectForAttribute([{ v: 'a' }, { v: 'b' }], 'v', 'desc').map(
      (row) => row.v
    ),
    ['b', 'a']
  );
  assert.deepEqual(sortByObjectForAttribute([{ v: {} }, { v: null }], 'v'), [
    { v: {} },
    { v: null },
  ]);
  assert.deepEqual(sortByObjectForAttribute([{ v: 1 }, { v: 'a' }], 'v'), [
    { v: 1 },
    { v: 'a' },
  ]);
  // @ts-expect-error runtime validation also rejects untyped callers
  assert.throws(() => sortByObjectForAttribute([], 'v', 'invalid'), RangeError);
});

test('legacy Utils validate input and do not mutate arrays', () => {
  assert.deepEqual(Utils.generateArray(3), [1, 2, 3]);
  assert.throws(() => Utils.generateArray(-1), RangeError);
  assert.throws(() => Utils.generateArray(1_000_001), RangeError);
  const array = Object.freeze([1, 2, 3]);
  assert.equal(new Set(Utils.getRandomSubset(array, 3)).size, 3);
  assert.deepEqual(Utils.getRandomSubset(array, 0), []);
  assert.throws(() => Utils.getRandomSubset(array, 4), RangeError);
  assert.throws(() => Utils.getRandomSubset(array, -1), RangeError);
  assert.equal(Utils.arraysAreEqual([1], [1]), true);
  assert.equal(Utils.arraysAreEqual([1], [2]), false);
  assert.equal(Utils.arraysAreEqual([1], []), false);
});
