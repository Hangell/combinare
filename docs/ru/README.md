# 🧩 Combinare

<p align="center">
  <img src="../../assets/logo.png" alt="Логотип Combinare">
  <br />
  <strong>Универсальная библиотека JavaScript/TypeScript для типобезопасных сочетаний, перестановок и декартовых произведений.</strong>
  <br />
  Превратите простые данные в варианты товаров, тестовые сценарии и новые возможности в приложении или терминале.
</p>

[![npm version](https://img.shields.io/npm/v/combinare)](https://www.npmjs.com/package/combinare)
[![CI](https://github.com/Hangell/combinare/actions/workflows/ci.yml/badge.svg)](https://github.com/Hangell/combinare/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](https://github.com/Hangell/combinare/blob/main/LICENSE)

[🇺🇸 English](https://github.com/Hangell/combinare/blob/main/README.md) · [🇧🇷 Português (Brasil)](https://github.com/Hangell/combinare/blob/main/docs/pt/README.md) · [🇪🇸 Español](https://github.com/Hangell/combinare/blob/main/docs/es/README.md) · **🇷🇺 Русский** · [🇨🇳 简体中文](https://github.com/Hangell/combinare/blob/main/docs/zh/README.md) · [🇮🇳 हिन्दी](https://github.com/Hangell/combinare/blob/main/docs/hi/README.md)

**Превратите входные данные в пространство возможностей.** Combinare — библиотека TypeScript/JavaScript для сочетаний, перестановок и декартовых произведений с необязательной CLI в том же npm-пакете. Создавайте варианты товаров, матрицы тестов, группы, упорядоченные сценарии и числовые выборки без новых вложенных циклов для каждой задачи.

[Выберите подходящую операцию](#choose-an-operation) · [Быстрый старт](#quick-start) · [Обзор API](#api-reference) · [Необязательная CLI](#cli) · [Ограничения и обработка ошибок](#limits)

<a id="why-combinare"></a>

## Почему Combinare?

- **Инструменты для разных задач:** выберите группу, задайте порядок или возьмите по одному значению из каждого независимого измерения.
- **Поддержка TypeScript:** обобщённые результаты, readonly-массивы, экспортируемые параметры и типизированные ключи сортировки.
- **Без зависимостей времени выполнения:** используйте именованные функции или статический фасад `Combinare`.
- **Генерируйте только нужное:** итераторы позволяют обработать несколько строк большого пространства и остановиться.
- **Явные ограничения и предсказуемое поведение:** функции, возвращающие массивы, ограничивают результаты; неверные числовые запросы завершаются ошибкой, а не бесконечными попытками.
- **Библиотека или терминал:** встраивайте API в приложение или выполняйте JSON-команды в оболочке.

<a id="choose-an-operation"></a>

## Выберите подходящую операцию

| Задача                                                | Функция                        | Пример                                     |
| ----------------------------------------------------- | ------------------------------ | ------------------------------------------ |
| Выбрать группу без учёта порядка                      | `combinations`                 | Группы по 2 из 3 человек: 3 группы         |
| Выбрать или расположить элементы с учётом порядка     | `permutations`                 | Упорядоченные пары из 3 элементов: 6 строк |
| Взять одно значение из каждого независимого списка    | `cartesianProduct`             | 2 размера × 2 цвета: 4 варианта            |
| Перекомбинировать значения атрибутов образцов         | `objectCombinations`           | Варианты размера/цвета из объектов         |
| Получить ограниченное число различных числовых строк  | `generateCombinationsNumerics` | 5 выборок по 6 чисел от 1 до 49            |
| Посчитать неупорядоченные выборки без выделения строк | `countCombinations`            | Точное C(100, 50) как BigInt               |
| Отсортировать записи по ключу                         | `sortByObjectForAttribute`     | Товары по цене или наличию                 |

<a id="installation"></a>

## Установка

Требуется **Node.js 22.14+**. Библиотеку также можно собрать для современных браузеров с ES2022 и BigInt. В браузерной сборке импортируйте основную точку входа пакета; CLI использует Node.js и имеет отдельную точку входа.

```sh
npm install combinare
# yarn add combinare
# pnpm add combinare
```

<a id="quick-start"></a>

## Быстрый старт

Начните с именованных импортов. Сочетания выбирают элементы одного списка; декартово произведение берёт по одному элементу из каждого списка.

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

CommonJS также поддерживается. Все публичные функции доступны как статические методы `Combinare`; выберите стиль импорта, подходящий вашему проекту.

```js
const { Combinare, combinations } = require('combinare');
console.log(Combinare.countCombinations(4, 2).toString()); // '6'
console.log(combinations([1, 2, 3], 2)); // [[1, 2], [1, 3], [2, 3]]
```

<a id="cartesian-products"></a>

## Варианты товаров и матрицы тестов

Для независимых измерений декартово произведение описывает все возможные конфигурации. Это полезно для вариантов каталога, настроек функций и параметризованных тестов. Здесь две роли × два устройства × две темы дают восемь сценариев.

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

Последнее измерение изменяется быстрее остальных. Каждая строка содержит ровно одно значение из каждого списка. Преобразуйте строки в объекты предметной области и передайте своему тестовому инструменту или приложению.

<a id="combinations-and-permutations"></a>

## Выбор групп и упорядоченных последовательностей

Используйте сочетания для команд, наборов и подмножеств: `[A, B]` и `[B, A]` — одна выборка. Используйте перестановки для последовательностей и распределений: изменение порядка создаёт другой результат.

```ts
import { combinations, permutations } from 'combinare';

console.log(combinations(['A', 'B', 'C'], 2));
// [['A', 'B'], ['A', 'C'], ['B', 'C']]

console.log(permutations(['A', 'B', 'C'], 2));
// [['A', 'B'], ['A', 'C'], ['B', 'A'], ['B', 'C'], ['C', 'A'], ['C', 'B']]

console.log(permutations(['A', 'B']));
// [['A', 'B'], ['B', 'A']]
```

Обе функции выбирают без повторного использования позиции входного массива. Не указывайте размер перестановки для упорядочивания всего массива; меньший размер создаёт упорядоченные выборки.

<a id="object-combinations"></a>

## Комбинирование атрибутов объектов

Уже есть объекты-образцы? Создайте варианты общих атрибутов без ручного извлечения списков значений. Различные значения каждого ключа собираются и перекомбинируются.

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

**Атрибуты комбинируются независимо.** Результат может содержать сочетания, отсутствующие в образцах; применяйте свои бизнес-правила, если некоторые значения несовместимы. Участвуют только собственные строковые ключи, перечисленные `Object.keys` первого объекта и присутствующие во всех объектах. Новая функция возвращает плоский массив объектов; старый метод сохраняет каждый объект внутри отдельного массива.

<a id="numeric-samples"></a>

## Генерация различных числовых выборок

Запросите определённое число различных строк из диапазона `1..total`. Каждая строка имеет заданную длину, не содержит повторных чисел и отсортирована по возрастанию. Используйте это для симуляций и тестовых данных, когда полное перечисление числового пространства не нужно.

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

По умолчанию используется `Math.random`; для воспроизводимых тестов передайте `random: () => number`. Источник должен возвращать конечное значение в `[0, 1)`. Генерация завершается даже с постоянным источником. Выбор рангов имеет точность 53 бита и **не является криптографическим или строго равномерным**, особенно в больших пространствах. Используйте его для примеров данных, а не токенов безопасности или регулируемых розыгрышей.

<a id="sorting"></a>

## Сортировка без изменения исходных данных

Сортируйте записи по типизированному ключу, сохраняя исходный порядок массива. Числа и строки поддерживают возрастание и убывание; логические значения следуют `false < true`. Порядок по умолчанию — `asc`.

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

Сортировка стабильна для равных значений. Лучше использовать корректные значения одного типа: смешанные типы, неподдерживаемые значения и `NaN` сравниваются как равные. Строки сравниваются лексикографически по правилам JavaScript, без языковой сортировки. Объекты в новом массиве сохраняют исходные ссылки.

<a id="exact-counts"></a>

## Сначала посчитайте, затем генерируйте

Комбинаторные пространства быстро растут. Посчитайте неупорядоченные выборки перед тем, как собирать все строки или использовать итератор. Результат — точный `bigint`, поэтому большие числа не теряют точность при представлении как JavaScript `number`.

```ts
import { countCombinations } from 'combinare';

const total = countCombinations(100, 50);
console.log(total); // 100891344545564193334812497256n
console.log(JSON.stringify({ total: total.toString() }));
// {"total":"100891344545564193334812497256"}
```

`countCombinations` вычисляет C(total, size), а не число перестановок или декартовых строк. Возвращает `0n`, если size больше total, и `1n` для нулевого размера. BigInt нельзя напрямую сериализовать в JSON; используйте `.toString()`. Точный подсчёт не ограничивает объём вычислений; очень большие размеры могут быть затратными.

<a id="iterators"></a>

## Обработка больших пространств с итераторами

Выбирайте функцию с массивом, если нужны все результаты сразу. Итератор позволяет обрабатывать по одной строке, остановиться раньше и не выделять память для всего пространства. Пример использует лишь три из 75 287 520 возможных выборок по пять элементов.

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

У итераторов нет автоматического лимита строк, и они не выполняют случайную выборку. Вы сами решаете, когда остановиться. `Array.from()` выделяет все результаты, обходя лимиты функций с массивами. Не меняйте входные массивы и объекты во время итерации; проверка параметров выполняется при первом `next()`.

<a id="limits"></a>

## Ограничения и обработка ошибок

Функции, возвращающие массивы, по умолчанию допускают **100 000 строк**. Превышение `maxResults` вызывает `RangeError` без скрытого усечения. Повышайте лимит только при достаточных ресурсах для полного результата или используйте итератор.

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

| Ограничение                      | Значение / правило                                |
| -------------------------------- | ------------------------------------------------- |
| Число строк при возврате массива | 100 000 по умолчанию; задаётся через `maxResults` |
| Числовой диапазон (`total`)      | Не более 1 000 000                                |
| Длина числовой строки            | Не более 1 000 и не больше total                  |
| Числовые ячейки результата       | длина × количество ≤ 10 000 000                   |
| Количество числовых выборок      | Не больше maxResults или C(total, длина)          |
| Числовые параметры и maxResults  | Неотрицательные безопасные целые числа            |
| JSON-ввод CLI                    | Не более 1 MiB                                    |

Лимит строк не гарантирует общий расход памяти: важны количество столбцов и размер значений. Нулевой `maxResults` допускает только результат без строк. Отрицательные, дробные, неконечные, небезопасные или невозможные числовые запросы сразу завершаются ошибкой.

<a id="typescript"></a>

## Интеграция с TypeScript

Все входные массивы поддерживают readonly. Обобщённые типы следуют значениям; для декартовых измерений разных типов укажите явный union. Экспортируются `GenerationOptions`, `NumericOptions`, `RandomSource` и `SortOrder`.

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

`GenerationOptions` содержит `maxResults?: number`; `NumericOptions` добавляет `random?: RandomSource`. `SortOrder` — `'asc' | 'desc'`. Ключи сортировки ограничены `keyof T`, что помогает обнаружить неверные свойства до выполнения.

<a id="api-reference"></a>

## Обзор API

Эти функции доступны как именованные экспорты и статические методы `Combinare`. `T` выводится из значений; функции объектов требуют `T extends object`. Параметры options необязательны, если не указано иное.

| Функция                                                                                  | Результат        | Назначение                                 |
| ---------------------------------------------------------------------------------------- | ---------------- | ------------------------------------------ |
| `combinations(items, size, options?)`                                                    | `T[][]`          | Неупорядоченные позиционные выборки        |
| `permutations(items, size = items.length, options?)`                                     | `T[][]`          | Упорядоченные позиционные выборки          |
| `cartesianProduct(arrays, options?)`                                                     | `T[][]`          | Один элемент из каждого измерения          |
| `objectCombinations(objects, options?)`                                                  | `T[]`            | Перекомбинированные общие атрибуты         |
| `generateCombinationsNumerics(total, combinationLength, numberOfCombinations, options?)` | `number[][]`     | Различные отсортированные числовые выборки |
| `countCombinations(total, size)`                                                         | `bigint`         | Точное число неупорядоченных выборок       |
| `sortByObjectForAttribute(items, attribute, order = 'asc')`                              | `T[]`            | Стабильно отсортированная копия            |
| `iterateCombinations(items, size)`                                                       | `Generator<T[]>` | Ленивые неупорядоченные выборки            |
| `iteratePermutations(items, size = items.length)`                                        | `Generator<T[]>` | Ленивые упорядоченные выборки              |
| `iterateCartesianProduct(arrays)`                                                        | `Generator<T[]>` | Ленивые декартовы строки                   |

### Исходные имена методов

- `Combinare.generateCombinationsArrays(arrays, options?)` — псевдоним `cartesianProduct`, возвращающий `T[][]`.
- `Combinare.generateCombinationsObjects(objects, options?)` помещает каждый результат `objectCombinations` в массив и возвращает `T[][]`.
- `Combinare.generateCombinationsNumerics(...)` и `Combinare.sortByObjectForAttribute(...)` сохраняют исходные имена.

См. [подробную справку API на английском](https://github.com/Hangell/combinare/blob/main/docs/API.md) для проверки параметров, равенства и контрактов типов, а также [руководство по архитектуре](https://github.com/Hangell/combinare/blob/main/docs/ARCHITECTURE.md) для ответственности модулей.

<a id="cli"></a>

## Необязательная CLI

Используйте тот же пакет прямо из терминала. Импорт библиотеки не запускает CLI. JSON-команды создают данные, которые можно перенаправить в файл или другую программу.

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

| Команда                                                    | Вывод                                                   |
| ---------------------------------------------------------- | ------------------------------------------------------- |
| `combinare numbers <total> <length> <amount>`              | Различные отсортированные числовые строки               |
| `combinare combinations <json-array> <length>`             | Неупорядоченные выборки в JSON                          |
| `combinare permutations <json-array> [length]`             | Упорядоченные выборки в JSON; по умолчанию полная длина |
| `combinare cartesian <json-array-of-arrays>`               | Декартовы строки в JSON                                 |
| `combinare objects <json-array-of-objects>`                | Плоские перекомбинированные объекты в JSON              |
| `combinare sort <json-array-of-objects> <key> [asc\|desc]` | Отсортированные записи в JSON; по умолчанию asc         |
| `combinare count <total> <length>`                         | Точное целое число в десятичном тексте                  |
| `combinare --help`                                         | Использование и примеры                                 |
| `combinare --version`                                      | Установленная версия пакета                             |

Успешные команды пишут в **stdout** и завершаются с кодом **0**. Ошибки пишутся в **stderr**, возвращают код **1** и не создают частичного stdout. `--max-results <integer>` задаёт лимит строк функций, возвращающих массивы. Нет интерактивного ввода или чтения файлов/stdin; передавайте JSON аргументом. Примеры используют кавычки POSIX; адаптируйте их для своей оболочки. При разработке выполните `npm run build`, затем `node dist/cli.js --help`. Документация описывает код 2.x; `npx` использует доступную в npm версию.

<a id="behavior"></a>

## Пустые данные, дубликаты и ссылки

| Ввод или поведение                            | Результат                                                                     |
| --------------------------------------------- | ----------------------------------------------------------------------------- |
| `combinations([], 0)` / `permutations([], 0)` | `[[]]`: одна пустая выборка                                                   |
| `cartesianProduct([])`                        | `[[]]`: одно пустое произведение                                              |
| Декартово произведение с пустым множителем    | `[]`: ни одной возможной строки                                               |
| Размер выборки больше длины массива           | `[]` для сочетаний/перестановок; числовая генерация вызывает ошибку           |
| `objectCombinations([])`                      | `[]`                                                                          |
| Непустой список объектов без общих ключей     | `[{}]`                                                                        |
| Повторы в сочетаниях/перестановках            | Позиции различаются; строки с равными значениями могут повторяться            |
| Повторы в декартовых множителях               | Сохраняются                                                                   |
| Значения атрибутов объектов                   | Удаление повторов через `Set` / SameValueZero; объекты сравниваются по ссылке |
| Изменение входных данных                      | Нет; строки/массивы новые, вложенные значения глубоко не копируются           |

<a id="migration"></a>

## Переход с версии 1.x

Имена исходного фасада сохранены, но **версия 2.0 меняет ряд правил**:

- Присваивайте результат `sortByObjectForAttribute`: исходный массив больше не сортируется на месте.
- Импортируйте `Combinare` явно. Импорт не присваивает `window.Combinare` или `global.Combinare`.
- Замените старый браузерный bundle `dist/combinare.min.js` импортом пакета в сборщике.
- Для более чем 100 000 строк используйте `maxResults` или итераторы.
- Обрабатывайте `RangeError` для неверных или невозможных числовых запросов.
- Генерация объектов использует общие собственные ключи и равенство `Set`; `objectCombinations` возвращает плоский результат, старый фасад — обёрнутый в массивы.

Полные заметки о миграции приведены в [CHANGELOG](https://github.com/Hangell/combinare/blob/main/CHANGELOG.md). Код подготовлен как 2.0.0; изменение документации не публикует релиз.

<a id="development"></a>

## Разработка и участие

Используйте Node.js 22.14+ или 24 и npm. `check` запускает ESLint, Prettier, TypeScript, проверку покрытия не ниже 90% строк, ветвей и функций, а также установку tarball для проверки CommonJS, ESM-импортов, деклараций и npm-команды. Husky запускает lint-staged и проверку Conventional Commits при разработке. См. [CONTRIBUTING](https://github.com/Hangell/combinare/blob/main/CONTRIBUTING.md) для подготовки, релизов и переводов.

```sh
npm ci
npm run check
npm run build
node dist/cli.js --help
```

<a id="community"></a>

## Сообщество, автор и лицензия

Приветствуются улучшения примеров, документации, тестов и API. Соблюдайте [Кодекс поведения](https://github.com/Hangell/combinare/blob/main/CODE_OF_CONDUCT.md), сообщайте об обычных ошибках через [GitHub issues](https://github.com/Hangell/combinare/issues), а об уязвимостях — конфиденциально по [Политике безопасности](https://github.com/Hangell/combinare/blob/main/SECURITY.md).

Название **Combinare** происходит от латинского глагола «объединять» или «соединять». Автор: [Rodrigo Rangel / Hangell](https://github.com/Hangell) · [hangell.org](https://hangell.org). [Лицензия MIT](https://github.com/Hangell/combinare/blob/main/LICENSE).

Поддержка: PIX `rodrigo@hangell.org` · Крипто/NFT `0xEd4d1be72F807Faa358C966a8eF63367c200130F`.
