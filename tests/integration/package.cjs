const { execFileSync, spawnSync } = require('node:child_process');
const { mkdtempSync, writeFileSync, rmSync } = require('node:fs');
const { tmpdir } = require('node:os');
const path = require('node:path');
const assert = require('node:assert/strict');

const temporary = mkdtempSync(path.join(tmpdir(), 'combinare-package-'));
const npm = (args, cwd) =>
  execFileSync(process.execPath, [process.env.npm_execpath, ...args], {
    cwd,
    encoding: 'utf8',
    env: { ...process.env, HUSKY: '0' },
  });
try {
  const packed = JSON.parse(
    npm(
      ['pack', '--json', '--ignore-scripts', '--pack-destination', temporary],
      process.cwd()
    )
  )[0];
  const files = packed.files.map((file) => file.path);
  for (const expected of [
    'dist/index.js',
    'dist/index.d.ts',
    'dist/cli.js',
    'dist/core/numeric.js',
    'README.md',
    'LICENSE',
    'SECURITY.md',
    'CODE_OF_CONDUCT.md',
  ])
    assert(files.includes(expected), `Missing ${expected}`);
  assert(
    !files.some((file) =>
      /^(?:src|tests|config|scripts|node_modules|coverage|\.github)\/|^dist\/package.json$|\.test\./.test(
        file
      )
    )
  );
  writeFileSync(path.join(temporary, 'package.json'), '{"private":true}');
  npm(
    [
      'install',
      '--no-audit',
      '--no-fund',
      path.join(temporary, packed.filename),
    ],
    temporary
  );
  execFileSync(
    process.execPath,
    [
      '-e',
      `
    const assert = require('node:assert/strict');
    const { Combinare, combinations } = require('combinare');
    assert.deepEqual(Combinare.generateCombinationsArrays([[1],[2]]), [[1,2]]);
    assert.deepEqual(combinations([1,2,3],2), [[1,2],[1,3],[2,3]]);
    assert.equal(Object.hasOwn(globalThis,'Combinare'),false);
  `,
    ],
    { cwd: temporary }
  );
  execFileSync(
    process.execPath,
    [
      '--input-type=module',
      '-e',
      `import { Combinare, combinations } from 'combinare'; if (Combinare.countCombinations(4,2) !== 6n || combinations([1],1).length !== 1) throw Error('ESM import failed');`,
    ],
    { cwd: temporary }
  );
  const cli = path.join(temporary, 'node_modules/combinare/dist/cli.js');
  assert.equal(
    execFileSync(process.execPath, [cli, 'combinations', '[1,2,3]', '2'], {
      encoding: 'utf8',
    }).trim(),
    '[[1,2],[1,3],[2,3]]'
  );
  const bad = spawnSync(process.execPath, [cli, 'numbers', '2', '1', '3'], {
    encoding: 'utf8',
  });
  assert.equal(bad.status, 1);
  assert.equal(bad.stdout, '');
  assert.match(bad.stderr, /^combinare: /);
  assert.equal(
    npm(
      ['exec', '--offline', '--', 'combinare', '--version'],
      temporary
    ).trim(),
    require('../../package.json').version
  );
  writeFileSync(
    path.join(temporary, 'consumer.ts'),
    `
    import { Combinare, combinations, permutations, cartesianProduct, countCombinations, iterateCombinations, iteratePermutations, iterateCartesianProduct, objectCombinations, sortByObjectForAttribute, NumericOptions, GenerationOptions, RandomSource, SortOrder } from 'combinare';
    const items: readonly number[] = [1,2,3];
    const rows: number[][] = combinations(items,2);
    const random: RandomSource = () => 0.5;
    const options: NumericOptions = {random,maxResults:10};
    const generation: GenerationOptions = options;
    const order: SortOrder = 'desc';
    const count: bigint = countCombinations(50,5);
    const iterator: Generator<number[]> = iterateCombinations(items,2);
    permutations(items); iteratePermutations(items); iterateCartesianProduct([items]); cartesianProduct([items],generation);
    Combinare.generateCombinationsNumerics(10,2,3,options);
    const objects = [{id:1,name:'a'}];
    objectCombinations(objects); Combinare.generateCombinationsObjects(objects);
    sortByObjectForAttribute(objects,'id',order);
    // @ts-expect-error Key must exist on objects
    sortByObjectForAttribute(objects,'missing');
    // @ts-expect-error Order is asc or desc
    sortByObjectForAttribute(objects,'id','wrong');
    void [rows,count,iterator];
  `
  );
  execFileSync(
    process.execPath,
    [
      require.resolve('typescript/bin/tsc'),
      '--noEmit',
      '--strict',
      '--skipLibCheck',
      '--target',
      'ES2022',
      '--module',
      'commonjs',
      path.join(temporary, 'consumer.ts'),
    ],
    { cwd: temporary, stdio: 'inherit' }
  );
  console.log(
    'Package verified: CommonJS, ESM import, declarations, CLI and npm executable.'
  );
} finally {
  rmSync(temporary, { recursive: true, force: true });
}
