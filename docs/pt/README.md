# 🧩 Combinare

<p align="center">
  <img src="../../assets/logo.png" alt="Logo do Combinare">
  <br />
  <strong>Uma biblioteca JavaScript/TypeScript versátil para combinações, permutações e produtos cartesianos com segurança de tipos.</strong>
  <br />
  Transforme dados simples em variantes de produtos, cenários de testes e novas possibilidades, na aplicação ou no terminal.
</p>

[![npm version](https://img.shields.io/npm/v/combinare)](https://www.npmjs.com/package/combinare)
[![CI](https://github.com/Hangell/combinare/actions/workflows/ci.yml/badge.svg)](https://github.com/Hangell/combinare/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](https://github.com/Hangell/combinare/blob/main/LICENSE)

[🇺🇸 English](https://github.com/Hangell/combinare/blob/main/README.md) · **🇧🇷 Português (Brasil)** · [🇪🇸 Español](https://github.com/Hangell/combinare/blob/main/docs/es/README.md) · [🇷🇺 Русский](https://github.com/Hangell/combinare/blob/main/docs/ru/README.md) · [🇨🇳 简体中文](https://github.com/Hangell/combinare/blob/main/docs/zh/README.md) · [🇮🇳 हिन्दी](https://github.com/Hangell/combinare/blob/main/docs/hi/README.md)

**Transforme seus dados em possibilidades.** Combinare é uma biblioteca TypeScript/JavaScript para combinações, permutações e produtos cartesianos, com CLI opcional no mesmo pacote npm. Use para gerar variantes de produtos, criar matrizes de testes, selecionar grupos, explorar sequências ou produzir amostras numéricas sem escrever novos loops aninhados para cada tarefa.

[Escolha a operação certa](#choose-an-operation) · [Primeiros passos](#quick-start) · [Visão geral da API](#api-reference) · [CLI opcional](#cli) · [Limites e tratamento de erros](#limits)

<a id="why-combinare"></a>

## Por que usar Combinare?

- **Um conjunto de ferramentas para vários problemas:** selecione um grupo, organize sua ordem ou escolha um valor de cada dimensão independente.
- **Suporte a TypeScript:** resultados genéricos, arrays readonly, opções exportadas e chaves de ordenação tipadas.
- **Sem dependências em runtime:** use funções nomeadas ou a fachada estática `Combinare`.
- **Gere apenas o necessário:** iteradores permitem processar algumas linhas de um espaço grande e parar cedo.
- **Limites explícitos e comportamento previsível:** geradores que retornam arrays limitam seus resultados; pedidos numéricos inválidos falham sem loops infinitos.
- **Biblioteca ou terminal:** integre a API à aplicação ou execute comandos JSON pelo shell.

<a id="choose-an-operation"></a>

## Escolha a operação certa

| Seu objetivo                                                | Use                            | Exemplo                                         |
| ----------------------------------------------------------- | ------------------------------ | ----------------------------------------------- |
| Selecionar um grupo em que a ordem não importa              | `combinations`                 | Grupos de 2 entre 3 pessoas: 3 grupos           |
| Selecionar ou organizar itens em que a ordem importa        | `permutations`                 | Pares ordenados entre 3 itens: 6 linhas         |
| Escolher um valor de cada lista independente                | `cartesianProduct`             | 2 tamanhos × 2 cores: 4 variantes               |
| Recombinar valores observados em atributos de objetos       | `objectCombinations`           | Combinações de tamanho/cor a partir de amostras |
| Pedir uma quantidade limitada de linhas numéricas distintas | `generateCombinationsNumerics` | 5 amostras de 6 números entre 1 e 49            |
| Contar seleções sem ordem sem alocar resultados             | `countCombinations`            | C(100, 50) exato como BigInt                    |
| Ordenar registros existentes por uma chave                  | `sortByObjectForAttribute`     | Produtos por preço ou disponibilidade           |

<a id="installation"></a>

## Instalação

Requer **Node.js 22.14+**. A biblioteca também pode ser empacotada para browsers modernos com ES2022 e BigInt. Importe a entrada principal do pacote no build do browser; o CLI usa Node.js e tem uma entrada separada.

```sh
npm install combinare
# yarn add combinare
# pnpm add combinare
```

<a id="quick-start"></a>

## Primeiros passos

Comece com imports nomeados. Combinações selecionam itens de uma lista; produtos cartesianos escolhem um item de cada lista.

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

CommonJS também funciona. Todas as funções públicas estão disponíveis como métodos estáticos de `Combinare`; escolha o estilo de importação que combina com seu projeto.

```js
const { Combinare, combinations } = require('combinare');
console.log(Combinare.countCombinations(4, 2).toString()); // '6'
console.log(combinations([1, 2, 3], 2)); // [[1, 2], [1, 3], [2, 3]]
```

<a id="cartesian-products"></a>

## Crie variantes de produtos e matrizes de testes

Quando as dimensões são independentes, o produto cartesiano descreve todas as configurações possíveis. Isso ajuda com variantes de catálogo, opções de funcionalidades e testes parametrizados. Neste exemplo, dois papéis × dois dispositivos × dois temas geram oito cenários.

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

A última dimensão varia mais rápido. Cada linha contém exatamente um valor de cada lista de entrada. Transforme as linhas em objetos do seu domínio e envie ao seu test runner ou à aplicação.

<a id="combinations-and-permutations"></a>

## Selecione grupos ou explore ordenações

Use combinações para equipes, pacotes de itens ou subconjuntos: `[A, B]` e `[B, A]` representam a mesma seleção. Use permutações para sequências e atribuições: mudar a ordem cria outro resultado.

```ts
import { combinations, permutations } from 'combinare';

console.log(combinations(['A', 'B', 'C'], 2));
// [['A', 'B'], ['A', 'C'], ['B', 'C']]

console.log(permutations(['A', 'B', 'C'], 2));
// [['A', 'B'], ['A', 'C'], ['B', 'A'], ['B', 'C'], ['C', 'A'], ['C', 'B']]

console.log(permutations(['A', 'B']));
// [['A', 'B'], ['B', 'A']]
```

As duas funções selecionam sem reutilizar uma posição da entrada. Omita o tamanho da permutação para ordenar todos os itens; informe um tamanho menor para gerar seleções ordenadas.

<a id="object-combinations"></a>

## Combine atributos de objetos

Já tem objetos de exemplo? Gere variantes dos atributos compartilhados sem extrair cada lista de valores manualmente. Os valores distintos de cada chave são coletados e recombinados.

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

**Os atributos são combinados independentemente.** O resultado pode conter combinações ausentes nas amostras; aplique suas regras de negócio quando determinados valores não puderem coexistir. Participam apenas as chaves string próprias listadas por `Object.keys` no primeiro objeto e presentes em todos os objetos. A função nova retorna objetos diretamente; o método legado mantém cada objeto dentro de um array.

<a id="numeric-samples"></a>

## Gere amostras numéricas distintas

Peça uma quantidade específica de linhas distintas no intervalo `1..total`. Cada linha tem o comprimento solicitado, não repete números e está ordenada de forma crescente. Use para simulações ou dados de exemplo quando não precisar enumerar todo o espaço numérico.

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

A fonte padrão é `Math.random`; injete `random: () => number` para testes reproduzíveis. A função deve retornar um valor finito em `[0, 1)`. A geração termina mesmo com uma fonte constante. A amostragem de ranks tem precisão de 53 bits e **não é criptográfica nem uniformemente exata**, especialmente em espaços grandes. Use para dados de exemplo, não para tokens de segurança ou sorteios regulamentados.

<a id="sorting"></a>

## Ordene sem modificar seus dados

Ordene registros por uma chave tipada e preserve a ordem do array original. Números e strings aceitam ordem crescente/decrescente; booleanos seguem `false < true`. A ordem padrão é `asc`.

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

A ordenação é estável quando os valores são iguais. Prefira valores válidos e do mesmo tipo na chave escolhida: tipos mistos, não suportados e `NaN` são comparados como iguais. Strings usam comparação lexicográfica JavaScript, sem collation por idioma. Os objetos do array retornado mantêm suas referências originais.

<a id="exact-counts"></a>

## Conte antes de gerar

Espaços combinatórios crescem rapidamente. Conte as seleções sem ordem antes de decidir entre coletar tudo ou processar um iterador. O resultado é um `bigint` exato: contagens grandes não perdem precisão ao serem representadas por um `number` JavaScript.

```ts
import { countCombinations } from 'combinare';

const total = countCombinations(100, 50);
console.log(total); // 100891344545564193334812497256n
console.log(JSON.stringify({ total: total.toString() }));
// {"total":"100891344545564193334812497256"}
```

`countCombinations` calcula C(total, size), não a quantidade de permutações ou produtos cartesianos. Retorna `0n` quando size excede total e `1n` para tamanho zero. BigInt não pode ser serializado diretamente em JSON; use `.toString()`. A contagem exata não tem limite de trabalho; tamanhos extremamente grandes podem custar bastante processamento.

<a id="iterators"></a>

## Processe espaços grandes com iteradores

Use uma função que retorna array quando quiser todos os resultados imediatamente. Use um iterador para processar uma linha por vez, parar após alguns resultados ou evitar alocar todo o espaço. O exemplo consome apenas três das 75.287.520 seleções possíveis de cinco itens.

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

Iteradores não têm limite automático de linhas e não fazem amostragem aleatória. Você controla quando parar. Usar `Array.from()` aloca todos os resultados e contorna os limites dos geradores que retornam arrays. Não altere arrays e objetos de entrada durante a iteração; a validação ocorre na primeira chamada de `next()`.

<a id="limits"></a>

## Limites e tratamento de erros

A geração que retorna arrays permite **100.000 linhas** por padrão. Resultados acima de `maxResults` lançam `RangeError`, sem truncamento silencioso. Aumente o limite quando houver recursos para o resultado inteiro ou escolha um iterador.

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

| Limite                                   | Valor / regra                                        |
| ---------------------------------------- | ---------------------------------------------------- |
| Linhas nos geradores que retornam arrays | 100.000 por padrão; configurável com `maxResults`    |
| Intervalo numérico (`total`)             | Até 1.000.000                                        |
| Comprimento de uma linha numérica        | Até 1.000; não pode exceder total                    |
| Células da saída numérica                | comprimento × quantidade ≤ 10.000.000                |
| Quantidade de amostras numéricas         | Não pode exceder maxResults ou C(total, comprimento) |
| Argumentos numéricos e maxResults        | Inteiros seguros não negativos                       |
| JSON de entrada do CLI                   | Até 1 MiB                                            |

Limitar linhas não garante o consumo total de memória: a quantidade de colunas e o tamanho dos valores também importam. `maxResults` igual a zero aceita somente saídas sem linhas. Pedidos numéricos negativos, fracionários, não finitos, fora da precisão segura ou impossíveis falham imediatamente.

<a id="typescript"></a>

## Integração com TypeScript

Todos os arrays de entrada aceitam readonly. Os genéricos acompanham os valores; informe uma união explícita quando as dimensões do produto cartesiano tiverem tipos diferentes. Os tipos exportados são `GenerationOptions`, `NumericOptions`, `RandomSource` e `SortOrder`.

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

`GenerationOptions` contém `maxResults?: number`; `NumericOptions` adiciona `random?: RandomSource`. `SortOrder` é `'asc' | 'desc'`. As chaves de ordenação são restritas a `keyof T`, permitindo detectar propriedades inválidas antes da execução.

<a id="api-reference"></a>

## Visão geral da API

As funções abaixo são exports nomeados e métodos estáticos de `Combinare`. `T` é inferido a partir dos valores; funções de objetos exigem `T extends object`. As opções são opcionais, salvo indicação contrária.

| Função                                                                                   | Retorno          | Finalidade                               |
| ---------------------------------------------------------------------------------------- | ---------------- | ---------------------------------------- |
| `combinations(items, size, options?)`                                                    | `T[][]`          | Seleções posicionais sem ordem           |
| `permutations(items, size = items.length, options?)`                                     | `T[][]`          | Seleções posicionais ordenadas           |
| `cartesianProduct(arrays, options?)`                                                     | `T[][]`          | Um item por dimensão                     |
| `objectCombinations(objects, options?)`                                                  | `T[]`            | Atributos compartilhados recombinados    |
| `generateCombinationsNumerics(total, combinationLength, numberOfCombinations, options?)` | `number[][]`     | Amostras numéricas distintas e ordenadas |
| `countCombinations(total, size)`                                                         | `bigint`         | Contagem exata de seleções sem ordem     |
| `sortByObjectForAttribute(items, attribute, order = 'asc')`                              | `T[]`            | Cópia ordenada de forma estável          |
| `iterateCombinations(items, size)`                                                       | `Generator<T[]>` | Seleções sem ordem sob demanda           |
| `iteratePermutations(items, size = items.length)`                                        | `Generator<T[]>` | Seleções ordenadas sob demanda           |
| `iterateCartesianProduct(arrays)`                                                        | `Generator<T[]>` | Linhas cartesianas sob demanda           |

### Nomes dos métodos originais

- `Combinare.generateCombinationsArrays(arrays, options?)` é um alias de `cartesianProduct` e retorna `T[][]`.
- `Combinare.generateCombinationsObjects(objects, options?)` envolve cada resultado de `objectCombinations` em um array e retorna `T[][]`.
- `Combinare.generateCombinationsNumerics(...)` e `Combinare.sortByObjectForAttribute(...)` mantêm os nomes originais.

Consulte a [referência detalhada da API, em inglês](https://github.com/Hangell/combinare/blob/main/docs/API.md) para validação, igualdade e contratos de tipos, e o [guia de arquitetura](https://github.com/Hangell/combinare/blob/main/docs/ARCHITECTURE.md) para as responsabilidades dos módulos.

<a id="cli"></a>

## CLI opcional

Use o mesmo pacote diretamente no terminal. Importar a biblioteca não executa o CLI. Os comandos JSON produzem dados que podem ser redirecionados para arquivos ou usados por outro programa.

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

| Comando                                                    | Saída                                                   |
| ---------------------------------------------------------- | ------------------------------------------------------- |
| `combinare numbers <total> <length> <amount>`              | Linhas numéricas distintas e ordenadas                  |
| `combinare combinations <json-array> <length>`             | Seleções sem ordem em JSON                              |
| `combinare permutations <json-array> [length]`             | Seleções ordenadas em JSON; tamanho completo por padrão |
| `combinare cartesian <json-array-of-arrays>`               | Linhas cartesianas em JSON                              |
| `combinare objects <json-array-of-objects>`                | Objetos recombinados diretamente em JSON                |
| `combinare sort <json-array-of-objects> <key> [asc\|desc]` | Registros ordenados em JSON; asc por padrão             |
| `combinare count <total> <length>`                         | Inteiro exato como texto decimal                        |
| `combinare --help`                                         | Uso e exemplos                                          |
| `combinare --version`                                      | Versão instalada do pacote                              |

Comandos bem-sucedidos escrevem em **stdout** e terminam com código **0**. Erros escrevem em **stderr**, retornam código **1** e não produzem stdout parcial. `--max-results <integer>` define o limite de linhas da geração que retorna arrays. Não há prompt interativo nem leitura de arquivos/stdin; passe JSON como argumento. Os exemplos usam aspas POSIX; adapte ao seu terminal. No desenvolvimento, execute `npm run build` e `node dist/cli.js --help`. Esta documentação descreve o código 2.x; `npx` usa a versão disponível no npm.

<a id="behavior"></a>

## Entradas vazias, duplicatas e referências

| Entrada ou comportamento                      | Resultado                                                                                    |
| --------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `combinations([], 0)` / `permutations([], 0)` | `[[]]`: uma seleção vazia                                                                    |
| `cartesianProduct([])`                        | `[[]]`: um produto vazio                                                                     |
| Produto cartesiano com um fator vazio         | `[]`: nenhuma linha possível                                                                 |
| Tamanho de seleção maior que a entrada        | `[]` para combinações/permutações; geração numérica lança erro                               |
| `objectCombinations([])`                      | `[]`                                                                                         |
| Objetos não vazios sem chaves compartilhadas  | `[{}]`                                                                                       |
| Valores duplicados em combinações/permutações | Posições são distintas; linhas com valores iguais podem se repetir                           |
| Valores duplicados nos fatores cartesianos    | Preservados                                                                                  |
| Valores dos atributos de objetos              | Deduplicados com `Set` / SameValueZero; objetos comparam por referência                      |
| Mutação da entrada                            | Nenhuma; linhas/arrays retornados são novos, mas valores internos não recebem clone profundo |

<a id="migration"></a>

## Migração da versão 1.x

Os nomes da fachada original continuam disponíveis, mas **a versão 2.0 muda alguns comportamentos**:

- Atribua o retorno de `sortByObjectForAttribute`: o array original não é mais ordenado no lugar.
- Importe `Combinare` explicitamente. Imports não atribuem `window.Combinare` ou `global.Combinare`.
- Substitua o uso direto do bundle antigo `dist/combinare.min.js` por imports do pacote no seu bundler.
- Use `maxResults` ou iteradores ao gerar mais de 100.000 linhas.
- Trate `RangeError` em pedidos numéricos inválidos ou impossíveis.
- A geração de objetos usa chaves próprias compartilhadas e igualdade de `Set`; use `objectCombinations` para resultados diretos ou a fachada legada para resultados envolvidos em arrays.

As notas completas estão no [CHANGELOG](https://github.com/Hangell/combinare/blob/main/CHANGELOG.md). O código está preparado como 2.0.0; atualizar documentação não publica uma versão.

<a id="development"></a>

## Desenvolvimento e contribuições

Use Node.js 22.14+ ou 24 e npm. `check` executa ESLint, Prettier, TypeScript, cobertura mínima de 90% em linhas, branches e funções, e instalação de tarball para validar CommonJS, imports ESM, declarações e executável npm. Husky executa lint-staged e valida Conventional Commits no desenvolvimento. Veja [CONTRIBUTING](https://github.com/Hangell/combinare/blob/main/CONTRIBUTING.md) para preparação, releases e traduções.

```sh
npm ci
npm run check
npm run build
node dist/cli.js --help
```

<a id="community"></a>

## Comunidade, autor e licença

Contribuições para exemplos, documentação, testes e APIs são bem-vindas. Siga o [Código de Conduta](https://github.com/Hangell/combinare/blob/main/CODE_OF_CONDUCT.md), relate bugs comuns pelas [issues do GitHub](https://github.com/Hangell/combinare/issues) e reporte vulnerabilidades em privado conforme a [Política de Segurança](https://github.com/Hangell/combinare/blob/main/SECURITY.md).

O nome **Combinare** vem do latim e significa “combinar” ou “unir”. Criado por [Rodrigo Rangel / Hangell](https://github.com/Hangell) · [hangell.org](https://hangell.org). Distribuído sob a [Licença MIT](https://github.com/Hangell/combinare/blob/main/LICENSE).

Apoio: PIX `rodrigo@hangell.org` · Cripto/NFT `0xEd4d1be72F807Faa358C966a8eF63367c200130F`.
