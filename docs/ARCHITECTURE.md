# Architecture / Arquitetura

## Boundaries

`src/index.ts` exports the public API and types. `src/combinare.ts` is a thin static facade preserving the original names and legacy singleton object wrappers. Named functions support direct imports. There is no initialization, registered global, singleton state or runtime dependency.

`src/core/` contains validation, exact counting, positional generators, bounded numeric sampling and object operations. Iterators use explicit indices/stacks instead of recursion. Eager functions collect iterators with an explicit row budget. Numeric sampling uses Floyd's algorithm on BigInt ranks with lexicographic unranking by binary search; it never retries duplicates indefinitely.

`src/cli/runner.ts` parses arguments, validates JSON and delegates to the same public API. Injected output functions let tests check output and status without invoking process exits. `src/cli.ts` is the optional executable adapter: it reads the root package version, wires stdout/stderr and sets exitCode. The library entry point does not import the executable.

`src/utils.ts` retains validated legacy deep-import helpers. Tests exercise public behavior and compatibility, then install a packed archive into a temporary consumer to validate exports, declarations and executable wiring.

## Packaging

TypeScript produces CommonJS and declarations in dist. Node ESM consumers can import the named exports from this CommonJS package; the integration check validates that interoperability. This is not a dual ESM/CJS build. Browser bundlers consume the library entry without importing Node CLI modules. sideEffects is false because importing the library performs no external mutation. Package files are explicitly allowlisted.

The GitHub workflow validates the checkout, generates an archive from the root, saves it and publishes that same archive if the version is absent. Version bumps are manual. Hooks are development-only. Generated files, local credentials and tests stay outside the npm artifact.

## Português

A API pública e os tipos ficam em index.ts. Combinare é uma fachada estática sobre funções do núcleo, sem estado global. O CLI é um adaptador separado e só executa quando chamado pelo usuário. Iteradores evitam materializar espaços grandes; funções eager aplicam limite de linhas. A geração numérica amostra ranks BigInt em quantidade fixa de passos, sem loop de rejeição de duplicatas.

O build gera CommonJS e declarações; imports ESM no Node são verificados por interoperabilidade. Bibliotecas de browser precisam de bundler e suporte a ES2022/BigInt. Os testes do pacote instalam um tarball real e verificam consumidor CommonJS, ESM, TypeScript e executável npm. Publicação continua automática em main com KEY_COMBINARE, após os checks, usando o pacote gerado da raiz.
