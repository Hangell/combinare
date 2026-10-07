import { Combinare } from '../index';
import { integer } from '../core/validation';

export interface CliIO {
  stdout: (text: string) => void;
  stderr: (text: string) => void;
}

const help = `Combinare — combinations for the command line

Usage: combinare <command> <arguments> [--max-results <integer>]

  numbers <total> <length> <amount>      Unique random numeric combinations
  cartesian <json-array-of-arrays>      Cartesian product
  combinations <json-array> <length>   Positional combinations
  permutations <json-array> [length]   Positional permutations
  objects <json-array-of-objects>       Shared-attribute combinations
  sort <json-array-of-objects> <key> [asc|desc]
  count <total> <length>                Exact count (decimal text)
  --help                               Show help
  --version                            Show version

JSON commands print a JSON array. Errors go to stderr with exit code 1.
Default max-results: 100000; exceeding the limit fails without partial output.
Numeric generation uses Math.random and is not cryptographically secure.
Example: combinare combinations '[1,2,3]' 2
`;

function number(text: string | undefined, name: string): number {
  if (text === undefined || !/^\d+$/.test(text))
    throw new Error(`${name} must be a non-negative integer`);
  const value = Number(text);
  integer(value, name);
  return value;
}
function array(text: string | undefined): unknown[] {
  if (text === undefined) throw new Error('Missing JSON array');
  if (Buffer.byteLength(text) > 1_048_576)
    throw new Error('JSON input exceeds 1 MiB');
  const value: unknown = JSON.parse(text);
  if (!Array.isArray(value)) throw new Error('Input must be a JSON array');
  return value;
}
function objects(text: string | undefined): Record<string, unknown>[] {
  const value = array(text);
  if (
    !value.every(
      (item) =>
        item !== null && typeof item === 'object' && !Array.isArray(item)
    )
  )
    throw new Error('Input must contain objects');
  return value as Record<string, unknown>[];
}
function arity(args: string[], minimum: number, maximum = minimum): void {
  if (args.length < minimum || args.length > maximum)
    throw new Error('Unexpected arguments; use --help');
}

export function runCli(
  argv: readonly string[],
  io: CliIO,
  version: string
): number {
  try {
    const args = [...argv];
    if (args.length === 0 || (args.length === 1 && args[0] === '--help')) {
      io.stdout(help);
      return 0;
    }
    if (args.length === 1 && args[0] === '--version') {
      io.stdout(`${version}\n`);
      return 0;
    }
    const option = args.indexOf('--max-results');
    let maxResults = 100_000;
    if (option !== -1) {
      maxResults = number(args[option + 1], 'max-results');
      args.splice(option, 2);
    }
    const command = args.shift();
    const options = { maxResults };
    let result: unknown;
    switch (command) {
      case 'numbers':
        arity(args, 3);
        result = Combinare.generateCombinationsNumerics(
          number(args[0], 'total'),
          number(args[1], 'length'),
          number(args[2], 'amount'),
          options
        );
        break;
      case 'cartesian': {
        arity(args, 1);
        const input = array(args[0]);
        if (!input.every(Array.isArray))
          throw new Error('Input must contain arrays');
        result = Combinare.cartesianProduct(input as unknown[][], options);
        break;
      }
      case 'combinations':
        arity(args, 2);
        result = Combinare.combinations(
          array(args[0]),
          number(args[1], 'length'),
          options
        );
        break;
      case 'permutations': {
        arity(args, 1, 2);
        const input = array(args[0]);
        result = Combinare.permutations(
          input,
          args[1] === undefined ? input.length : number(args[1], 'length'),
          options
        );
        break;
      }
      case 'objects':
        arity(args, 1);
        result = Combinare.objectCombinations(objects(args[0]), options);
        break;
      case 'sort': {
        arity(args, 2, 3);
        const order = args[2] ?? 'asc';
        if (order !== 'asc' && order !== 'desc')
          throw new Error('order must be asc or desc');
        result = Combinare.sortByObjectForAttribute(
          objects(args[0]),
          args[1]!,
          order
        );
        break;
      }
      case 'count':
        arity(args, 2);
        io.stdout(
          `${Combinare.countCombinations(number(args[0], 'total'), number(args[1], 'length'))}\n`
        );
        return 0;
      default:
        throw new Error(`Unknown command: ${command}; use --help`);
    }
    io.stdout(`${JSON.stringify(result)}\n`);
    return 0;
  } catch (error) {
    io.stderr(
      `combinare: ${error instanceof Error ? error.message : 'Command failed'}\n`
    );
    return 1;
  }
}
