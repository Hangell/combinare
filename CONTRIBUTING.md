# Contribuindo / Contributing

A participação segue o [Código de Conduta](CODE_OF_CONDUCT.md). Relate vulnerabilidades em privado conforme [SECURITY](SECURITY.md).

## Preparação

Use Node.js 22.14+ ou 24 e npm. Faça fork, clone e crie uma branch.

```sh
npm ci
npm run check
```

O `prepare` configura Husky apenas em checkouts Git com dependências de desenvolvimento. O pre-commit executa lint-staged (ESLint e Prettier); commit-msg valida Conventional Commits. Use `HUSKY=0` em CI. Consumidores do pacote não precisam desses hooks. A configuração segue o [Husky oficial](https://typicode.github.io/husky/get-started.html).

| Comando                           | Uso                                                              |
| --------------------------------- | ---------------------------------------------------------------- |
| `npm run build`                   | Limpa e recria JavaScript e declarações em dist                  |
| `npm run typecheck`               | Verifica tipos de biblioteca, CLI e testes                       |
| `npm test`                        | Testes da API e CLI com node:test                                |
| `npm run test:coverage`           | Testes com cobertura mínima de 90% em linhas, branches e funções |
| `npm run test:watch`              | Recompila TypeScript e reexecuta testes ao editar arquivos       |
| `npm run test:package`            | Instala um tarball real e verifica CJS, ESM, tipos e CLI         |
| `npm run lint` / `lint:fix`       | ESLint                                                           |
| `npm run format` / `format:check` | Prettier                                                         |
| `npm run check`                   | Todas as verificações                                            |
| `npm run commit`                  | Assistente git-cz                                                |

## Código e testes

A [arquitetura](docs/ARCHITECTURE.md) separa núcleo, fachada e adaptador CLI. Não adicione dependências runtime sem justificativa. Evite estado global, mutação de inputs e algoritmos sem limite de término. Use tipos estritos, funções pequenas e opções explícitas.

Teste cardinalidade, unicidade, valores inválidos, conjuntos vazios, limites, entrada readonly, duplicatas posicionais, atributos compartilhados e chaves de protótipo. Para mudanças no pacote ou CLI, execute `test:package`. Testes devem validar resultados e contratos públicos. Alterações incompatíveis exigem major version e instruções de migração.

## Commits e PRs

Use `tipo(escopo): descrição`, por exemplo `feat(cli): add count command` ou `fix(numeric): reject impossible requests`. Tipos aceitos incluem feat, fix, docs, test, refactor, perf, build, ci, chore, style e revert. Use `!` e `BREAKING CHANGE:` para quebras. Explique problema, resultado e validação no PR; atualize o README principal em inglês, a referência da API, os READMEs traduzidos (`docs/pt`, `docs/es`, `docs/ru`, `docs/zh`, `docs/hi`) e o CHANGELOG. Português usa a variante brasileira e a bandeira 🇧🇷. Mantenha a mesma estrutura, contratos e exemplos nas traduções; use links completos do GitHub no README principal para funcionar no npm.

## Publicação

Cada push em `main` executa verificações e gera um `.tgz` da raiz, salvo como artefato. Uma versão ausente no npm é publicada automaticamente com `latest` usando o secret existente `KEY_COMBINARE`. Versões já publicadas são puladas; erros de autenticação ou rede falham o workflow. Não há incremento automático.

Atualize versão e lockfile com `npm version minor --no-git-tag-version` (ou patch/major), finalize o changelog, execute `npm run check` e revise `npm pack --dry-run`. `prepack` compila; `prepublishOnly` valida. Não copie package.json para dist e não faça commit do build. Use branch protection para exigir os checks antes de integrar em main.

## English

Use Node.js 22.14+/24 and npm. Fork, clone, create a branch, run `npm ci` and `npm run check`. Respect the Code of Conduct and report vulnerabilities privately.

Source is split into pure core modules, a compatibility facade and a CLI adapter. Preserve public contracts unless a documented major release is intended. Avoid global state, input mutation and unbounded retry loops. Add tests for changed behavior, empty/invalid inputs, cardinality, duplicates, limits and prototype-sensitive keys. Package checks install an actual tarball and exercise CJS, ESM imports, TypeScript and the executable.

Husky uses lint-staged and commitlint for development commits; CI skips hooks with `HUSKY=0`. Use Conventional Commits and update the root English README, API reference, translated READMEs (Brazilian Portuguese, Spanish, Russian, Simplified Chinese and Hindi) and changelog. Keep structure, signatures, examples and behavior consistent across languages. The root README is displayed on npm; documentation links should use complete GitHub URLs.

Pushes to main build and save a tarball, then publish that exact artifact when its version is absent from npm using `KEY_COMBINARE`. Bump version and lockfile explicitly, run checks and inspect the pack contents before pushing. Always publish from the repository root.
