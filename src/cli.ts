#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { runCli } from './cli/runner';

// Version is read from the published root manifest; never duplicate it in source.
const manifest = JSON.parse(
  readFileSync(join(__dirname, '../package.json'), 'utf8')
) as { version: string };
process.exitCode = runCli(
  process.argv.slice(2),
  {
    stdout: (text) => {
      process.stdout.write(text);
    },
    stderr: (text) => {
      process.stderr.write(text);
    },
  },
  manifest.version
);
