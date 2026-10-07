const { spawn } = require('node:child_process');
const { readdirSync } = require('node:fs');
const { join } = require('node:path');

// The parent script compiles once before starting both watchers.
const compiler = spawn(
  process.execPath,
  [
    require.resolve('typescript/bin/tsc'),
    '-p',
    'config/tsconfig.test.json',
    '--watch',
    '--preserveWatchOutput',
  ],
  { stdio: 'inherit' }
);
const directory = '.test-dist/tests/unit';
const tests = readdirSync(directory)
  .filter((file) => file.endsWith('.test.js'))
  .map((file) => join(directory, file));
const runner = spawn(process.execPath, ['--test', '--watch', ...tests], {
  stdio: 'inherit',
});

let stopping = false;
function stop(code) {
  if (stopping) return;
  stopping = true;
  compiler.kill();
  runner.kill();
  process.exitCode = code;
}
for (const child of [compiler, runner]) {
  child.on('error', (error) => {
    console.error(error.message);
    stop(1);
  });
  child.on('exit', (code) => {
    stop(code ?? 1);
  });
}
process.on('SIGINT', () => stop(0));
process.on('SIGTERM', () => stop(0));
