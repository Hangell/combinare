import { test } from 'node:test';
import assert from 'node:assert/strict';
import { runCli } from '../../src/cli/runner';

function run(args: string[]) {
  let stdout = '';
  let stderr = '';
  const status = runCli(
    args,
    {
      stdout: (value) => {
        stdout += value;
      },
      stderr: (value) => {
        stderr += value;
      },
    },
    '2.0.0'
  );
  return { stdout, stderr, status };
}
test('help, version and every command', () => {
  assert.match(run([]).stdout, /Usage:/);
  assert.match(run(['--help']).stdout, /numbers/);
  assert.equal(run(['--version']).stdout, '2.0.0\n');
  const fixtures: [string[], unknown][] = [
    [
      ['cartesian', '[[1,2],[3]]'],
      [
        [1, 3],
        [2, 3],
      ],
    ],
    [
      ['combinations', '[1,2,3]', '2'],
      [
        [1, 2],
        [1, 3],
        [2, 3],
      ],
    ],
    [
      ['permutations', '[1,2]'],
      [
        [1, 2],
        [2, 1],
      ],
    ],
    [
      ['permutations', '[1,2]', '1'],
      [[1], [2]],
    ],
    [
      ['objects', '[{"a":1},{"a":2}]'],
      [{ a: 1 }, { a: 2 }],
    ],
    [
      ['sort', '[{"a":2},{"a":1}]', 'a'],
      [{ a: 1 }, { a: 2 }],
    ],
    [
      ['sort', '[{"a":1},{"a":2}]', 'a', 'desc'],
      [{ a: 2 }, { a: 1 }],
    ],
    [['numbers', '3', '3', '1'], [[1, 2, 3]]],
    [
      ['combinations', '[1,2]', '1', '--max-results', '2'],
      [[1], [2]],
    ],
  ];
  for (const [args, expected] of fixtures) {
    const result = run(args);
    assert.equal(result.status, 0, result.stderr);
    assert.equal(result.stderr, '');
    assert.deepEqual(JSON.parse(result.stdout), expected);
  }
  assert.equal(
    run(['count', '100', '50']).stdout,
    '100891344545564193334812497256\n'
  );
});
test('bad arguments fail with stderr and no partial stdout', () => {
  for (const args of [
    ['nope'],
    ['--help', 'extra'],
    ['count', '2'],
    ['count', '2', '1', 'extra'],
    ['count', '-1', '1'],
    ['count', '1.2', '1'],
    ['count', '999999999999999999', '1'],
    ['cartesian', 'null'],
    ['cartesian', '[1]'],
    ['cartesian', 'bad-json'],
    ['objects', '[null]'],
    ['objects', '[[]]'],
    ['sort', '[]', 'a', 'wrong'],
    ['numbers', '2', '1', '3'],
    ['combinations', '[1,2]', '1', '--max-results', '1'],
    ['permutations', '[]', '--max-results'],
    ['objects'],
    ['combinations', '[]', '0', '--max-results', '1', '--max-results', '2'],
    ['cartesian', '["' + 'x'.repeat(1_048_576) + '"]'],
  ]) {
    const result = run(args);
    assert.equal(result.status, 1, args[0]);
    assert.equal(result.stdout, '');
    assert.match(result.stderr, /^combinare: /);
  }
});
