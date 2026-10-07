# 🧩 Combinare

<p align="center">
  <img src="../../assets/logo.png" alt="Logotipo de Combinare">
  <br />
  <strong>Una biblioteca JavaScript/TypeScript versátil para combinaciones, permutaciones y productos cartesianos con tipos seguros.</strong>
  <br />
  Convierte datos simples en variantes de productos, escenarios de pruebas y nuevas posibilidades, en tu aplicación o en el terminal.
</p>

[![npm version](https://img.shields.io/npm/v/combinare)](https://www.npmjs.com/package/combinare)
[![CI](https://github.com/Hangell/combinare/actions/workflows/ci.yml/badge.svg)](https://github.com/Hangell/combinare/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](https://github.com/Hangell/combinare/blob/main/LICENSE)

[🇺🇸 English](https://github.com/Hangell/combinare/blob/main/README.md) · [🇧🇷 Português (Brasil)](https://github.com/Hangell/combinare/blob/main/docs/pt/README.md) · **🇪🇸 Español** · [🇷🇺 Русский](https://github.com/Hangell/combinare/blob/main/docs/ru/README.md) · [🇨🇳 简体中文](https://github.com/Hangell/combinare/blob/main/docs/zh/README.md) · [🇮🇳 हिन्दी](https://github.com/Hangell/combinare/blob/main/docs/hi/README.md)

**Convierte tus datos en posibilidades.** Combinare es una biblioteca TypeScript/JavaScript para combinaciones, permutaciones y productos cartesianos, con una CLI opcional en el mismo paquete npm. Genera variantes de productos, crea matrices de pruebas, selecciona grupos, explora secuencias o produce muestras numéricas sin escribir nuevos bucles anidados para cada tarea.

[Elige la operación adecuada](#choose-an-operation) · [Primeros pasos](#quick-start) · [Resumen de la API](#api-reference) · [CLI opcional](#cli) · [Límites y gestión de errores](#limits)

<a id="why-combinare"></a>

## ¿Por qué Combinare?

- **Herramientas para diferentes problemas:** selecciona un grupo, organiza su orden o elige un valor de cada dimensión independiente.
- **Soporte TypeScript:** resultados genéricos, arrays readonly, opciones exportadas y claves de ordenación tipadas.
- **Sin dependencias de ejecución:** utiliza funciones con nombre o la fachada estática `Combinare`.
- **Genera solo lo necesario:** los iteradores permiten procesar unas pocas filas de un espacio grande y detenerse pronto.
- **Límites explícitos y comportamiento predecible:** los generadores que devuelven arrays limitan los resultados; las solicitudes numéricas inválidas fallan sin bucles infinitos.
- **Biblioteca o terminal:** integra la API en tu aplicación o ejecuta comandos JSON desde el shell.

<a id="choose-an-operation"></a>

## Elige la operación adecuada

| Tu objetivo                                               | Utiliza                        | Ejemplo                                       |
| --------------------------------------------------------- | ------------------------------ | --------------------------------------------- |
| Seleccionar un grupo sin importar el orden                | `combinations`                 | Grupos de 2 entre 3 personas: 3 grupos        |
| Seleccionar u organizar elementos donde importa el orden  | `permutations`                 | Pares ordenados entre 3 elementos: 6 filas    |
| Elegir un valor de cada lista independiente               | `cartesianProduct`             | 2 tallas × 2 colores: 4 variantes             |
| Recombinar valores observados en atributos de objetos     | `objectCombinations`           | Variantes de talla/color a partir de ejemplos |
| Solicitar un número limitado de filas numéricas distintas | `generateCombinationsNumerics` | 5 muestras de 6 números del 1 al 49           |
| Contar selecciones sin orden sin reservar filas           | `countCombinations`            | C(100, 50) exacto como BigInt                 |
| Ordenar registros existentes por una clave                | `sortByObjectForAttribute`     | Productos por precio o disponibilidad         |

<a id="installation"></a>

## Instalación

Requiere **Node.js 22.14+**. La biblioteca también se puede empaquetar para navegadores modernos con ES2022 y BigInt. Importa la entrada principal del paquete en el build del navegador; la CLI utiliza Node.js y tiene una entrada independiente.

```sh
npm install combinare
# yarn add combinare
# pnpm add combinare
```

<a id="quick-start"></a>

## Primeros pasos

Empieza con imports con nombre. Las combinaciones seleccionan elementos de una lista; los productos cartesianos eligen un elemento de cada lista.

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

CommonJS también funciona. Todas las funciones públicas están disponibles como métodos estáticos de `Combinare`; elige el estilo de importación que encaje con tu proyecto.

```js
const { Combinare, combinations } = require('combinare');
console.log(Combinare.countCombinations(4, 2).toString()); // '6'
console.log(combinations([1, 2, 3], 2)); // [[1, 2], [1, 3], [2, 3]]
```

<a id="cartesian-products"></a>

## Crea variantes de productos y matrices de pruebas

Cuando las dimensiones son independientes, un producto cartesiano describe todas las configuraciones posibles. Resulta útil para variantes de catálogo, opciones de funcionalidades y pruebas parametrizadas. Aquí, dos roles × dos dispositivos × dos temas generan ocho escenarios.

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

La última dimensión varía más rápido. Cada fila contiene exactamente un valor de cada lista de entrada. Puedes convertir las filas en objetos de tu dominio y enviarlas a tu entorno de pruebas o aplicación.

<a id="combinations-and-permutations"></a>

## Selecciona grupos o explora ordenaciones

Utiliza combinaciones para equipos, paquetes o subconjuntos: `[A, B]` y `[B, A]` representan la misma selección. Utiliza permutaciones para secuencias y asignaciones: cambiar el orden crea otro resultado.

```ts
import { combinations, permutations } from 'combinare';

console.log(combinations(['A', 'B', 'C'], 2));
// [['A', 'B'], ['A', 'C'], ['B', 'C']]

console.log(permutations(['A', 'B', 'C'], 2));
// [['A', 'B'], ['A', 'C'], ['B', 'A'], ['B', 'C'], ['C', 'A'], ['C', 'B']]

console.log(permutations(['A', 'B']));
// [['A', 'B'], ['B', 'A']]
```

Ambas funciones seleccionan sin reutilizar una posición de entrada. Omite el tamaño de la permutación para ordenar todos los elementos; indica un tamaño menor para generar selecciones ordenadas.

<a id="object-combinations"></a>

## Combina atributos de objetos

¿Ya tienes objetos de ejemplo? Genera variantes de sus atributos compartidos sin extraer manualmente cada lista de valores. Se recogen los valores distintos de cada clave y se recombinan.

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

**Los atributos se combinan de forma independiente.** El resultado puede incluir combinaciones ausentes en los ejemplos; aplica tus reglas de negocio cuando ciertos valores no puedan coexistir. Solo participan las claves string propias enumeradas por `Object.keys` en el primer objeto y presentes en todos los objetos. La función nueva devuelve objetos directamente; el método antiguo conserva cada objeto dentro de un array.

<a id="numeric-samples"></a>

## Genera muestras numéricas distintas

Solicita una cantidad concreta de filas distintas del intervalo `1..total`. Cada fila tiene la longitud indicada, no repite números y está ordenada de forma ascendente. Úsalo para simulaciones o datos de ejemplo cuando no necesites enumerar todo el espacio numérico.

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

La fuente predeterminada es `Math.random`; puedes inyectar `random: () => number` para pruebas reproducibles. Debe devolver un valor finito en `[0, 1)`. La generación termina incluso con una fuente constante. El muestreo de rangos tiene precisión de 53 bits y **no es criptográfico ni exactamente uniforme**, especialmente en espacios grandes. Úsalo para datos de ejemplo, no para tokens de seguridad ni sorteos regulados.

<a id="sorting"></a>

## Ordena sin modificar los datos originales

Ordena registros por una clave tipada y conserva el orden del array original. Los números y strings admiten orden ascendente/descendente; los booleanos siguen `false < true`. El orden predeterminado es `asc`.

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

La ordenación es estable para valores iguales. Es preferible que los valores de la clave sean válidos y del mismo tipo: tipos mixtos, no compatibles y `NaN` se comparan como iguales. Los strings utilizan comparación lexicográfica JavaScript, no ordenación por configuración regional. Los objetos del array devuelto conservan sus referencias.

<a id="exact-counts"></a>

## Cuenta antes de generar

Los espacios combinatorios crecen rápidamente. Cuenta las selecciones sin orden antes de decidir si recopilar todos los resultados o utilizar un iterador. El resultado es un `bigint` exacto: los recuentos grandes no pierden precisión al representarse como un `number` JavaScript.

```ts
import { countCombinations } from 'combinare';

const total = countCombinations(100, 50);
console.log(total); // 100891344545564193334812497256n
console.log(JSON.stringify({ total: total.toString() }));
// {"total":"100891344545564193334812497256"}
```

`countCombinations` calcula C(total, size), no el número de permutaciones ni de productos cartesianos. Devuelve `0n` si size supera total y `1n` para tamaño cero. BigInt no se puede serializar directamente en JSON; usa `.toString()`. El recuento exacto no tiene un límite de trabajo; tamaños extremadamente grandes pueden ser costosos.

<a id="iterators"></a>

## Procesa espacios grandes con iteradores

Utiliza una función que devuelve un array cuando quieras todos los resultados inmediatamente. Elige un iterador para procesar una fila cada vez, detenerte pronto o evitar reservar todo el espacio. Este ejemplo consume solo tres de las 75.287.520 selecciones posibles de cinco elementos.

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

Los iteradores no tienen un límite automático de filas ni realizan muestreo aleatorio. Tú decides cuándo parar. `Array.from()` reserva todos los resultados y evita los límites de los generadores que devuelven arrays. No modifiques los arrays u objetos de entrada durante la iteración; la validación ocurre en la primera llamada a `next()`.

<a id="limits"></a>

## Límites y gestión de errores

La generación que devuelve arrays permite **100.000 filas** por defecto. Si el resultado supera `maxResults`, se lanza `RangeError`; nunca se trunca silenciosamente. Aumenta el límite solo si puedes procesar todo el resultado, o utiliza un iterador.

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

| Límite                                    | Valor / regla                                      |
| ----------------------------------------- | -------------------------------------------------- |
| Filas en generadores que devuelven arrays | 100.000 por defecto; configurable con `maxResults` |
| Intervalo numérico (`total`)              | Hasta 1.000.000                                    |
| Longitud de una fila numérica             | Hasta 1.000; no puede superar total                |
| Celdas de salida numérica                 | longitud × cantidad ≤ 10.000.000                   |
| Número de muestras numéricas              | No puede superar maxResults ni C(total, longitud)  |
| Argumentos numéricos y maxResults         | Enteros seguros no negativos                       |
| Entrada JSON de la CLI                    | Hasta 1 MiB                                        |

Un límite de filas no garantiza la memoria total: también importan las columnas y el tamaño de los valores. `maxResults` igual a cero solo acepta resultados sin filas. Las solicitudes numéricas negativas, fraccionarias, no finitas, fuera del rango seguro o imposibles fallan inmediatamente.

<a id="typescript"></a>

## Integración con TypeScript

Todos los arrays de entrada admiten readonly. Los genéricos siguen los tipos de los valores; especifica una unión explícita cuando las dimensiones del producto cartesiano tengan tipos diferentes. Los tipos exportados son `GenerationOptions`, `NumericOptions`, `RandomSource` y `SortOrder`.

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

`GenerationOptions` contiene `maxResults?: number`; `NumericOptions` añade `random?: RandomSource`. `SortOrder` es `'asc' | 'desc'`. Las claves de ordenación se restringen a `keyof T`, lo que permite detectar propiedades inválidas antes de ejecutar.

<a id="api-reference"></a>

## Resumen de la API

Estas funciones se exportan con nombre y están disponibles como métodos estáticos de `Combinare`. `T` se infiere de los valores; las funciones de objetos requieren `T extends object`. Las opciones son opcionales salvo indicación contraria.

| Función                                                                                  | Devuelve         | Finalidad                                |
| ---------------------------------------------------------------------------------------- | ---------------- | ---------------------------------------- |
| `combinations(items, size, options?)`                                                    | `T[][]`          | Selecciones posicionales sin orden       |
| `permutations(items, size = items.length, options?)`                                     | `T[][]`          | Selecciones posicionales ordenadas       |
| `cartesianProduct(arrays, options?)`                                                     | `T[][]`          | Un elemento por dimensión                |
| `objectCombinations(objects, options?)`                                                  | `T[]`            | Atributos compartidos recombinados       |
| `generateCombinationsNumerics(total, combinationLength, numberOfCombinations, options?)` | `number[][]`     | Muestras numéricas distintas y ordenadas |
| `countCombinations(total, size)`                                                         | `bigint`         | Número exacto de selecciones sin orden   |
| `sortByObjectForAttribute(items, attribute, order = 'asc')`                              | `T[]`            | Copia ordenada de forma estable          |
| `iterateCombinations(items, size)`                                                       | `Generator<T[]>` | Selecciones sin orden bajo demanda       |
| `iteratePermutations(items, size = items.length)`                                        | `Generator<T[]>` | Selecciones ordenadas bajo demanda       |
| `iterateCartesianProduct(arrays)`                                                        | `Generator<T[]>` | Filas cartesianas bajo demanda           |

### Nombres de los métodos originales

- `Combinare.generateCombinationsArrays(arrays, options?)` es un alias de `cartesianProduct` y devuelve `T[][]`.
- `Combinare.generateCombinationsObjects(objects, options?)` envuelve cada resultado de `objectCombinations` en un array y devuelve `T[][]`.
- `Combinare.generateCombinationsNumerics(...)` y `Combinare.sortByObjectForAttribute(...)` mantienen sus nombres originales.

Consulta la [referencia detallada de la API en inglés](https://github.com/Hangell/combinare/blob/main/docs/API.md) para validación, igualdad y contratos de tipos, y la [guía de arquitectura](https://github.com/Hangell/combinare/blob/main/docs/ARCHITECTURE.md) para las responsabilidades de los módulos.

<a id="cli"></a>

## CLI opcional

Utiliza el mismo paquete directamente desde el terminal. Importar la biblioteca no ejecuta la CLI. Los comandos JSON producen datos que puedes redirigir a archivos o pasar a otro programa.

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

| Comando                                                    | Salida                                                       |
| ---------------------------------------------------------- | ------------------------------------------------------------ |
| `combinare numbers <total> <length> <amount>`              | Filas numéricas distintas y ordenadas                        |
| `combinare combinations <json-array> <length>`             | Selecciones sin orden en JSON                                |
| `combinare permutations <json-array> [length]`             | Selecciones ordenadas en JSON; longitud completa por defecto |
| `combinare cartesian <json-array-of-arrays>`               | Filas cartesianas en JSON                                    |
| `combinare objects <json-array-of-objects>`                | Objetos recombinados sin envoltorios en JSON                 |
| `combinare sort <json-array-of-objects> <key> [asc\|desc]` | Registros ordenados en JSON; asc por defecto                 |
| `combinare count <total> <length>`                         | Entero exacto como texto decimal                             |
| `combinare --help`                                         | Uso y ejemplos                                               |
| `combinare --version`                                      | Versión instalada del paquete                                |

Los comandos correctos escriben en **stdout** y terminan con código **0**. Los errores escriben en **stderr**, devuelven código **1** y no producen stdout parcial. `--max-results <integer>` establece el límite de filas de la generación que devuelve arrays. No hay entrada interactiva ni lectura de archivos/stdin; pasa JSON como argumento. Los ejemplos usan comillas POSIX; adáptalas a tu terminal. Durante el desarrollo, ejecuta `npm run build` y `node dist/cli.js --help`. Estos documentos describen el código 2.x; `npx` utiliza la versión disponible en npm.

<a id="behavior"></a>

## Entradas vacías, duplicados y referencias

| Entrada o comportamiento                           | Resultado                                                                       |
| -------------------------------------------------- | ------------------------------------------------------------------------------- |
| `combinations([], 0)` / `permutations([], 0)`      | `[[]]`: una selección vacía                                                     |
| `cartesianProduct([])`                             | `[[]]`: un producto vacío                                                       |
| Producto cartesiano con un factor vacío            | `[]`: ninguna fila posible                                                      |
| Tamaño de selección mayor que la entrada           | `[]` para combinaciones/permutaciones; la generación numérica lanza un error    |
| `objectCombinations([])`                           | `[]`                                                                            |
| Entrada de objetos no vacía sin claves compartidas | `[{}]`                                                                          |
| Valores duplicados en combinaciones/permutaciones  | Las posiciones son distintas; pueden repetirse filas con valores iguales        |
| Valores duplicados en factores cartesianos         | Se conservan                                                                    |
| Valores de atributos de objetos                    | Se deduplican con `Set` / SameValueZero; los objetos se comparan por referencia |
| Mutación de la entrada                             | Ninguna; filas/arrays nuevos, sin copia profunda de los valores internos        |

<a id="migration"></a>

## Migración desde 1.x

Los nombres de la fachada original siguen disponibles, pero **2.0 cambia algunos comportamientos**:

- Asigna el resultado de `sortByObjectForAttribute`: el array original ya no se ordena in situ.
- Importa `Combinare` explícitamente. Los imports ya no asignan `window.Combinare` ni `global.Combinare`.
- Sustituye el bundle antiguo `dist/combinare.min.js` por imports del paquete en tu empaquetador.
- Usa `maxResults` o iteradores si generas más de 100.000 filas.
- Gestiona `RangeError` para solicitudes numéricas inválidas o imposibles.
- La generación de objetos utiliza claves propias compartidas e igualdad de `Set`; usa `objectCombinations` para resultados directos o la fachada antigua para resultados envueltos en arrays.

Consulta las notas completas en [CHANGELOG](https://github.com/Hangell/combinare/blob/main/CHANGELOG.md). El código está preparado como 2.0.0; actualizar documentación no publica una versión.

<a id="development"></a>

## Desarrollo y contribuciones

Utiliza Node.js 22.14+ o 24 y npm. `check` ejecuta ESLint, Prettier, TypeScript, cobertura mínima del 90% en líneas, ramas y funciones, y una instalación de tarball para validar CommonJS, imports ESM, declaraciones y el ejecutable npm. Husky ejecuta lint-staged y valida Conventional Commits durante el desarrollo. Consulta [CONTRIBUTING](https://github.com/Hangell/combinare/blob/main/CONTRIBUTING.md) para preparación, versiones y traducciones.

```sh
npm ci
npm run check
npm run build
node dist/cli.js --help
```

<a id="community"></a>

## Comunidad, autor y licencia

Las contribuciones a ejemplos, documentación, pruebas y APIs son bienvenidas. Sigue el [Código de Conducta](https://github.com/Hangell/combinare/blob/main/CODE_OF_CONDUCT.md), informa de errores habituales en las [issues de GitHub](https://github.com/Hangell/combinare/issues) y comunica vulnerabilidades en privado según la [Política de Seguridad](https://github.com/Hangell/combinare/blob/main/SECURITY.md).

**Combinare** procede del verbo latino que significa «combinar» o «unir». Creado por [Rodrigo Rangel / Hangell](https://github.com/Hangell) · [hangell.org](https://hangell.org). Distribuido bajo la [Licencia MIT](https://github.com/Hangell/combinare/blob/main/LICENSE).

Apoyo: PIX `rodrigo@hangell.org` · Cripto/NFT `0xEd4d1be72F807Faa358C966a8eF63367c200130F`.
