# 🧩 Combinare

<p align="center">
  <img src="../../assets/logo.png" alt="Combinare का लोगो">
  <br />
  <strong>टाइप-सुरक्षित संयोजन, क्रमचय और कार्टेशियन गुणनफल के लिए एक बहुउपयोगी JavaScript/TypeScript लाइब्रेरी।</strong>
  <br />
  साधारण इनपुट से उत्पाद के विकल्प, टेस्ट परिदृश्य और नई संभावनाएँ बनाएँ, अपने ऐप या टर्मिनल में।
</p>

[![npm version](https://img.shields.io/npm/v/combinare)](https://www.npmjs.com/package/combinare)
[![CI](https://github.com/Hangell/combinare/actions/workflows/ci.yml/badge.svg)](https://github.com/Hangell/combinare/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](https://github.com/Hangell/combinare/blob/main/LICENSE)

[🇺🇸 English](https://github.com/Hangell/combinare/blob/main/README.md) · [🇧🇷 Português (Brasil)](https://github.com/Hangell/combinare/blob/main/docs/pt/README.md) · [🇪🇸 Español](https://github.com/Hangell/combinare/blob/main/docs/es/README.md) · [🇷🇺 Русский](https://github.com/Hangell/combinare/blob/main/docs/ru/README.md) · [🇨🇳 简体中文](https://github.com/Hangell/combinare/blob/main/docs/zh/README.md) · **🇮🇳 हिन्दी**

**अपने इनपुट से नई संभावनाएँ बनाएँ।** Combinare, संयोजन, क्रमचय और कार्टेशियन गुणनफल के लिए TypeScript/JavaScript लाइब्रेरी है। उसी npm पैकेज में वैकल्पिक CLI भी मिलता है। हर काम के लिए नए नेस्टेड लूप लिखे बिना उत्पाद के विकल्प बनाएँ, टेस्ट मैट्रिक्स तैयार करें, समूह चुनें, क्रम वाले परिदृश्य तलाशें या संख्यात्मक नमूने बनाएँ।

[सही ऑपरेशन चुनें](#choose-an-operation) · [शुरुआत करें](#quick-start) · [API का सार](#api-reference) · [वैकल्पिक CLI](#cli) · [सीमाएँ और त्रुटि प्रबंधन](#limits)

<a id="why-combinare"></a>

## Combinare क्यों चुनें?

- **अलग कामों के लिए एक टूलकिट:** समूह चुनें, उसका क्रम तय करें या हर स्वतंत्र आयाम से एक मान लें।
- **TypeScript समर्थन:** जेनेरिक परिणाम, readonly ऐरे, एक्सपोर्ट किए गए विकल्प और टाइप किए गए सॉर्टिंग की।
- **कोई रनटाइम निर्भरता नहीं:** नाम वाले फ़ंक्शन या परिचित स्थिर `Combinare` API का उपयोग करें।
- **सिर्फ़ ज़रूरी परिणाम बनाएँ:** इटरेटर से बड़े क्षेत्र की कुछ पंक्तियाँ पढ़कर जल्दी रुक सकते हैं।
- **स्पष्ट सीमाएँ और अनुमानित व्यवहार:** ऐरे लौटाने वाले जेनरेटर परिणामों को सीमित करते हैं; गलत संख्यात्मक अनुरोध अनंत प्रयासों के बजाय त्रुटि देते हैं।
- **लाइब्रेरी या टर्मिनल:** API को ऐप में जोड़ें या शेल से JSON कमांड चलाएँ।

<a id="choose-an-operation"></a>

## सही ऑपरेशन चुनें

| आपका उद्देश्य                                    | फ़ंक्शन                        | उदाहरण                                   |
| ------------------------------------------------ | ------------------------------ | ---------------------------------------- |
| क्रम को नज़रअंदाज़ करके समूह चुनना               | `combinations`                 | 3 लोगों में से 2 की टीमें: 3 समूह        |
| क्रम को ध्यान में रखकर तत्व चुनना या सजाना       | `permutations`                 | 3 तत्वों से क्रम वाले जोड़े: 6 पंक्तियाँ |
| हर स्वतंत्र सूची से एक मान चुनना                 | `cartesianProduct`             | 2 आकार × 2 रंग: 4 विकल्प                 |
| नमूना ऑब्जेक्ट के गुणों के मान फिर से मिलाना     | `objectCombinations`           | नमूने से आकार/रंग के विकल्प              |
| सीमित संख्या में अलग संख्यात्मक पंक्तियाँ माँगना | `generateCombinationsNumerics` | 5 नमूने, हर एक में 1–49 से 6 संख्याएँ    |
| पंक्तियाँ बनाए बिना क्रम रहित चयन गिनना          | `countCombinations`            | BigInt में सटीक C(100, 50)               |
| किसी की के आधार पर रिकॉर्ड क्रमबद्ध करना         | `sortByObjectForAttribute`     | कीमत या उपलब्धता के अनुसार उत्पाद        |

<a id="installation"></a>

## इंस्टॉलेशन

**Node.js 22.14+** आवश्यक है। लाइब्रेरी को ES2022 और BigInt वाले आधुनिक ब्राउज़र के लिए बंडल भी कर सकते हैं। ब्राउज़र बिल्ड में पैकेज का मुख्य एंट्री पॉइंट इंपोर्ट करें; CLI, Node.js का उपयोग करता है और उसका एंट्री पॉइंट अलग है।

```sh
npm install combinare
# yarn add combinare
# pnpm add combinare
```

<a id="quick-start"></a>

## शुरुआत करें

नाम वाले इंपोर्ट से शुरुआत करें। संयोजन एक सूची से तत्व चुनते हैं; कार्टेशियन गुणनफल हर सूची से एक तत्व लेता है।

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

CommonJS भी काम करता है। सभी सार्वजनिक फ़ंक्शन `Combinare` के स्थिर मेथड के रूप में भी उपलब्ध हैं; अपने प्रोजेक्ट के अनुसार इंपोर्ट शैली चुनें।

```js
const { Combinare, combinations } = require('combinare');
console.log(Combinare.countCombinations(4, 2).toString()); // '6'
console.log(combinations([1, 2, 3], 2)); // [[1, 2], [1, 3], [2, 3]]
```

<a id="cartesian-products"></a>

## उत्पाद के विकल्प और टेस्ट मैट्रिक्स बनाएँ

जब आयाम स्वतंत्र हों, कार्टेशियन गुणनफल हर संभव कॉन्फ़िगरेशन दिखाता है। यह कैटलॉग विकल्प, फ़ीचर सेटिंग और पैरामीटर वाले टेस्ट के लिए उपयोगी है। यहाँ दो भूमिकाएँ × दो डिवाइस × दो थीम से आठ परिदृश्य बनते हैं।

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

अंतिम आयाम सबसे तेज़ बदलता है। हर पंक्ति में प्रत्येक इनपुट सूची से ठीक एक मान होता है। पंक्तियों को अपने काम के ऑब्जेक्ट में बदलकर टेस्ट रनर या ऐप को दे सकते हैं।

<a id="combinations-and-permutations"></a>

## समूह चुनें या क्रम तलाशें

टीम, पैकेज या उपसमूह के लिए संयोजन चुनें: `[A, B]` और `[B, A]` एक ही चयन हैं। अनुक्रम और कार्य आवंटन के लिए क्रमचय चुनें: क्रम बदलने पर अलग परिणाम मिलता है।

```ts
import { combinations, permutations } from 'combinare';

console.log(combinations(['A', 'B', 'C'], 2));
// [['A', 'B'], ['A', 'C'], ['B', 'C']]

console.log(permutations(['A', 'B', 'C'], 2));
// [['A', 'B'], ['A', 'C'], ['B', 'A'], ['B', 'C'], ['C', 'A'], ['C', 'B']]

console.log(permutations(['A', 'B']));
// [['A', 'B'], ['B', 'A']]
```

दोनों फ़ंक्शन इनपुट की एक ही स्थिति को दोबारा नहीं चुनते। सभी तत्वों को क्रम देने के लिए क्रमचय का आकार छोड़ दें; छोटे आकार से सीमित लंबाई के क्रम वाले चयन बनते हैं।

<a id="object-combinations"></a>

## ऑब्जेक्ट के गुणों को मिलाएँ

क्या आपके पास नमूना ऑब्जेक्ट हैं? हर मान-सूची अलग से निकाले बिना उनके साझा गुणों से विकल्प बनाएँ। हर की के अलग मान इकट्ठे करके फिर से मिलाए जाते हैं।

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

**गुण स्वतंत्र रूप से मिलाए जाते हैं।** परिणाम में ऐसे विकल्प आ सकते हैं जो मूल नमूने में नहीं थे; कुछ मान साथ नहीं चल सकते तो अपने व्यावसायिक नियम लागू करें। केवल पहले ऑब्जेक्ट के `Object.keys` में शामिल स्वयं के string की, जो हर ऑब्जेक्ट में मौजूद हों, भाग लेते हैं। नया फ़ंक्शन सीधे ऑब्जेक्ट का ऐरे लौटाता है; पुराना मेथड हर ऑब्जेक्ट को अलग एक-तत्व ऐरे में रखता है।

<a id="numeric-samples"></a>

## अलग-अलग संख्यात्मक नमूने बनाएँ

`1..total` से तय संख्या में अलग पंक्तियाँ माँगें। हर पंक्ति की लंबाई तय होती है, उसमें कोई संख्या दोहराई नहीं जाती और वह बढ़ते क्रम में होती है। पूरे संख्यात्मक क्षेत्र को गिनाए बिना सिमुलेशन या नमूना डेटा बनाने के लिए उपयोग करें।

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

डिफ़ॉल्ट स्रोत `Math.random` है; दोहराने योग्य टेस्ट के लिए `random: () => number` दें। फ़ंक्शन को `[0, 1)` में एक सीमित मान लौटाना चाहिए। लगातार एक ही मान देने वाले स्रोत के साथ भी प्रक्रिया समाप्त होती है। रैंक सैंपलिंग 53-बिट सटीकता का उपयोग करती है और **क्रिप्टोग्राफ़िक या पूरी तरह समान वितरण वाली नहीं है**, ख़ासकर बड़े क्षेत्रों में। इसे नमूना डेटा के लिए उपयोग करें, सुरक्षा टोकन या विनियमित ड्रॉ के लिए नहीं।

<a id="sorting"></a>

## मूल डेटा बदले बिना क्रमबद्ध करें

टाइप की गई की से रिकॉर्ड क्रमबद्ध करें और मूल ऐरे का क्रम बनाए रखें। संख्या और string के लिए बढ़ता/घटता क्रम उपलब्ध है; boolean में `false < true` है। डिफ़ॉल्ट क्रम `asc` है।

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

समान मानों के लिए सॉर्टिंग स्थिर रहती है। चुनी गई की में वैध और एक ही प्रकार के मान रखें: मिले-जुले प्रकार, असमर्थित प्रकार और `NaN` बराबर माने जाते हैं। Strings का क्रम JavaScript की lexical तुलना से तय होता है, भाषा-आधारित collation से नहीं। लौटे ऐरे के ऑब्जेक्ट अपने मूल संदर्भ रखते हैं।

<a id="exact-counts"></a>

## बनाने से पहले गिनें

संयोजन क्षेत्र तेज़ी से बढ़ते हैं। सभी परिणाम इकट्ठे करने या इटरेटर चुनने से पहले क्रम रहित चयन गिनें। परिणाम सटीक `bigint` है, इसलिए बड़ी गिनती को JavaScript `number` में रखने से होने वाली सटीकता की हानि से बचते हैं।

```ts
import { countCombinations } from 'combinare';

const total = countCombinations(100, 50);
console.log(total); // 100891344545564193334812497256n
console.log(JSON.stringify({ total: total.toString() }));
// {"total":"100891344545564193334812497256"}
```

`countCombinations`, C(total, size) निकालता है, क्रमचय या कार्टेशियन गुणनफल की गिनती नहीं। size, total से बड़ा हो तो `0n`; आकार शून्य हो तो `1n` मिलता है। BigInt सीधे JSON में नहीं बदलता; `.toString()` उपयोग करें। सटीक गिनती में काम की कोई सीमा नहीं है; बहुत बड़े आकार महँगे हो सकते हैं।

<a id="iterators"></a>

## इटरेटर से बड़े संयोजन क्षेत्र सँभालें

सभी परिणाम तुरंत चाहिए तो ऐरे लौटाने वाला फ़ंक्शन चुनें। एक समय में एक पंक्ति पढ़ने, जल्दी रुकने या पूरे क्षेत्र के लिए मेमोरी न रखने के लिए इटरेटर चुनें। यह उदाहरण पाँच तत्वों के 75,287,520 संभावित चयनों में से केवल तीन पढ़ता है।

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

इटरेटर की स्वतः पंक्ति सीमा नहीं होती और वह यादृच्छिक सैंपलिंग नहीं करता। आप तय करते हैं कब रुकना है। `Array.from()` सभी परिणामों के लिए मेमोरी लेता है और ऐरे जेनरेटर की सीमाओं को पार कर देता है। इटरेशन के दौरान इनपुट ऐरे और ऑब्जेक्ट न बदलें; जाँच पहली `next()` कॉल पर होती है।

<a id="limits"></a>

## सीमाएँ और त्रुटि प्रबंधन

ऐरे लौटाने वाली जनरेशन की डिफ़ॉल्ट सीमा **100,000 पंक्तियाँ** है। `maxResults` से अधिक परिणाम पर `RangeError` मिलता है; परिणाम चुपचाप काटे नहीं जाते। पूरे परिणाम के लिए संसाधन हों तभी सीमा बढ़ाएँ, अन्यथा इटरेटर चुनें।

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

| सीमा                          | मान / नियम                                     |
| ----------------------------- | ---------------------------------------------- |
| ऐरे जेनरेटर की पंक्तियाँ      | डिफ़ॉल्ट 100,000; `maxResults` से बदल सकते हैं |
| संख्यात्मक क्षेत्र (`total`)  | अधिकतम 1,000,000                               |
| संख्यात्मक पंक्ति की लंबाई    | अधिकतम 1,000; total से अधिक नहीं               |
| संख्यात्मक आउटपुट के सेल      | लंबाई × संख्या ≤ 10,000,000                    |
| संख्यात्मक नमूनों की संख्या   | maxResults या C(total, लंबाई) से अधिक नहीं     |
| संख्यात्मक तर्क और maxResults | गैर-ऋणात्मक सुरक्षित पूर्णांक                  |
| CLI का JSON इनपुट             | अधिकतम 1 MiB                                   |

पंक्ति सीमा कुल मेमोरी की गारंटी नहीं है: कॉलम और मानों का आकार भी मायने रखते हैं। शून्य `maxResults` सिर्फ़ बिना पंक्ति वाला परिणाम स्वीकार करता है। ऋणात्मक, भिन्नात्मक, अनंत/NaN, असुरक्षित या असंभव संख्यात्मक अनुरोध तुरंत विफल होते हैं।

<a id="typescript"></a>

## TypeScript के साथ उपयोग

सभी इनपुट ऐरे readonly स्वीकार करते हैं। जेनेरिक टाइप आपके मानों के अनुसार चलते हैं; कार्टेशियन आयामों के टाइप अलग हों तो स्पष्ट union दें। एक्सपोर्ट किए गए टाइप हैं `GenerationOptions`, `NumericOptions`, `RandomSource` और `SortOrder`।

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

`GenerationOptions` में `maxResults?: number` है; `NumericOptions`, `random?: RandomSource` जोड़ता है। `SortOrder`, `'asc' | 'desc'` है। सॉर्टिंग की, `keyof T` तक सीमित हैं, जिससे गलत प्रॉपर्टी नाम चलाने से पहले पकड़े जा सकते हैं।

<a id="api-reference"></a>

## API का सार

ये फ़ंक्शन नाम वाले एक्सपोर्ट और `Combinare` के स्थिर मेथड दोनों हैं। `T` मानों से तय होता है; ऑब्जेक्ट फ़ंक्शन के लिए `T extends object` चाहिए। अलग से न बताया हो तो options वैकल्पिक हैं।

| फ़ंक्शन                                                                                  | रिटर्न           | उद्देश्य                         |
| ---------------------------------------------------------------------------------------- | ---------------- | -------------------------------- |
| `combinations(items, size, options?)`                                                    | `T[][]`          | स्थिति-आधारित क्रम रहित चयन      |
| `permutations(items, size = items.length, options?)`                                     | `T[][]`          | स्थिति-आधारित क्रम वाले चयन      |
| `cartesianProduct(arrays, options?)`                                                     | `T[][]`          | हर आयाम से एक तत्व               |
| `objectCombinations(objects, options?)`                                                  | `T[]`            | साझा गुणों का पुनर्संयोजन        |
| `generateCombinationsNumerics(total, combinationLength, numberOfCombinations, options?)` | `number[][]`     | अलग और क्रमबद्ध संख्यात्मक नमूने |
| `countCombinations(total, size)`                                                         | `bigint`         | क्रम रहित चयनों की सटीक गिनती    |
| `sortByObjectForAttribute(items, attribute, order = 'asc')`                              | `T[]`            | स्थिर क्रमबद्ध कॉपी              |
| `iterateCombinations(items, size)`                                                       | `Generator<T[]>` | ज़रूरत पर क्रम रहित चयन          |
| `iteratePermutations(items, size = items.length)`                                        | `Generator<T[]>` | ज़रूरत पर क्रम वाले चयन          |
| `iterateCartesianProduct(arrays)`                                                        | `Generator<T[]>` | ज़रूरत पर कार्टेशियन पंक्तियाँ   |

### मूल मेथड के नाम

- `Combinare.generateCombinationsArrays(arrays, options?)`, `cartesianProduct` का दूसरा नाम है और `T[][]` लौटाता है।
- `Combinare.generateCombinationsObjects(objects, options?)` हर `objectCombinations` परिणाम को ऐरे में रखता है और `T[][]` लौटाता है।
- `Combinare.generateCombinationsNumerics(...)` और `Combinare.sortByObjectForAttribute(...)` अपने पुराने नाम रखते हैं।

जाँच, समानता और टाइप अनुबंध के लिए [अंग्रेज़ी में विस्तृत API संदर्भ](https://github.com/Hangell/combinare/blob/main/docs/API.md), और मॉड्यूल की जिम्मेदारियों के लिए [आर्किटेक्चर गाइड](https://github.com/Hangell/combinare/blob/main/docs/ARCHITECTURE.md) देखें।

<a id="cli"></a>

## वैकल्पिक CLI

उसी पैकेज को सीधे टर्मिनल से उपयोग करें। लाइब्रेरी इंपोर्ट करने से CLI नहीं चलता। JSON कमांड का डेटा फ़ाइल में भेज सकते हैं या दूसरे प्रोग्राम को दे सकते हैं।

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

| कमांड                                                      | आउटपुट                                      |
| ---------------------------------------------------------- | ------------------------------------------- |
| `combinare numbers <total> <length> <amount>`              | अलग और क्रमबद्ध संख्यात्मक पंक्तियाँ        |
| `combinare combinations <json-array> <length>`             | JSON में क्रम रहित चयन                      |
| `combinare permutations <json-array> [length]`             | JSON में क्रम वाले चयन; डिफ़ॉल्ट पूरी लंबाई |
| `combinare cartesian <json-array-of-arrays>`               | JSON में कार्टेशियन पंक्तियाँ               |
| `combinare objects <json-array-of-objects>`                | JSON में सीधे पुनर्संयोजित ऑब्जेक्ट         |
| `combinare sort <json-array-of-objects> <key> [asc\|desc]` | JSON में क्रमबद्ध रिकॉर्ड; डिफ़ॉल्ट asc     |
| `combinare count <total> <length>`                         | दशमलव टेक्स्ट में सटीक पूर्णांक             |
| `combinare --help`                                         | उपयोग और उदाहरण                             |
| `combinare --version`                                      | इंस्टॉल किए पैकेज का संस्करण                |

सफल कमांड **stdout** में लिखते हैं और कोड **0** से समाप्त होते हैं। त्रुटियाँ **stderr** में लिखी जाती हैं, कोड **1** मिलता है और अधूरा stdout नहीं होता। `--max-results <integer>` ऐरे लौटाने वाली जनरेशन की पंक्ति सीमा तय करता है। इंटरैक्टिव प्रॉम्प्ट या फ़ाइल/stdin पढ़ना उपलब्ध नहीं है; JSON को तर्क में दें। उदाहरण POSIX उद्धरण उपयोग करते हैं; अपने टर्मिनल के लिए उन्हें बदलें। डेवलपमेंट में `npm run build`, फिर `node dist/cli.js --help` चलाएँ। यह दस्तावेज़ 2.x स्रोत का वर्णन करता है; `npx`, npm पर उपलब्ध संस्करण का उपयोग करता है।

<a id="behavior"></a>

## खाली इनपुट, दोहराव और संदर्भ

| इनपुट या व्यवहार                              | परिणाम                                                                     |
| --------------------------------------------- | -------------------------------------------------------------------------- |
| `combinations([], 0)` / `permutations([], 0)` | `[[]]`: एक खाली चयन                                                        |
| `cartesianProduct([])`                        | `[[]]`: एक खाली गुणनफल                                                     |
| खाली फ़ैक्टर वाला कार्टेशियन गुणनफल           | `[]`: कोई संभव पंक्ति नहीं                                                 |
| चयन का आकार इनपुट से बड़ा                     | संयोजन/क्रमचय में `[]`; संख्यात्मक जनरेशन में त्रुटि                       |
| `objectCombinations([])`                      | `[]`                                                                       |
| बिना साझा की वाला गैर-खाली ऑब्जेक्ट इनपुट     | `[{}]`                                                                     |
| संयोजन/क्रमचय में दोहराए मान                  | स्थितियाँ अलग हैं; समान मानों की पंक्तियाँ दोहरा सकती हैं                  |
| कार्टेशियन फ़ैक्टर में दोहराए मान             | बने रहते हैं                                                               |
| ऑब्जेक्ट के गुणों के मान                      | `Set` / SameValueZero से दोहराव हटता है; ऑब्जेक्ट संदर्भ से तुलना करते हैं |
| इनपुट में बदलाव                               | नहीं; लौटे ऐरे/पंक्तियाँ नए हैं, लेकिन भीतर के मानों की डीप कॉपी नहीं होती |

<a id="migration"></a>

## 1.x से माइग्रेशन

मूल स्थिर API नाम उपलब्ध हैं, लेकिन **2.0 में कुछ व्यवहार बदलते हैं**:

- `sortByObjectForAttribute` का परिणाम सँभालें: मूल ऐरे अब वहीं क्रमबद्ध नहीं होता।
- `Combinare` को स्पष्ट रूप से इंपोर्ट करें। इंपोर्ट, `window.Combinare` या `global.Combinare` सेट नहीं करता।
- पुराने `dist/combinare.min.js` ब्राउज़र बंडल की जगह अपने बंडलर में पैकेज इंपोर्ट करें।
- 100,000 से अधिक पंक्तियाँ बनाने पर `maxResults` या इटरेटर उपयोग करें।
- गलत या असंभव संख्यात्मक अनुरोधों के लिए `RangeError` सँभालें।
- ऑब्जेक्ट जनरेशन साझा स्वयं के की और `Set` समानता उपयोग करता है; सीधे परिणाम के लिए `objectCombinations`, और ऐरे में लिपटे परिणाम के लिए पुराना API चुनें।

पूरी माइग्रेशन जानकारी [CHANGELOG](https://github.com/Hangell/combinare/blob/main/CHANGELOG.md) में है। स्रोत 2.0.0 के रूप में तैयार है; दस्तावेज़ बदलने से रिलीज़ प्रकाशित नहीं होती।

<a id="development"></a>

## डेवलपमेंट और योगदान

Node.js 22.14+ या 24 और npm उपयोग करें। `check`, ESLint, Prettier, TypeScript, लाइन/ब्रांच/फ़ंक्शन में कम से कम 90% कवरेज, और वास्तविक tarball इंस्टॉलेशन से CommonJS, ESM इंपोर्ट, घोषणाएँ तथा npm कमांड जाँचता है। Husky, डेवलपमेंट कमिट में lint-staged और Conventional Commits जाँच चलाता है। तैयारी, रिलीज़ और अनुवादों के लिए [CONTRIBUTING](https://github.com/Hangell/combinare/blob/main/CONTRIBUTING.md) देखें।

```sh
npm ci
npm run check
npm run build
node dist/cli.js --help
```

<a id="community"></a>

## समुदाय, लेखक और लाइसेंस

उदाहरण, दस्तावेज़, टेस्ट और API में योगदान का स्वागत है। [आचार संहिता](https://github.com/Hangell/combinare/blob/main/CODE_OF_CONDUCT.md) का पालन करें, सामान्य बग [GitHub issues](https://github.com/Hangell/combinare/issues) में बताएँ और कमज़ोरियाँ [सुरक्षा नीति](https://github.com/Hangell/combinare/blob/main/SECURITY.md) के अनुसार निजी रूप से भेजें।

**Combinare** नाम लैटिन क्रिया से आया है, जिसका अर्थ “मिलाना” या “जोड़ना” है। निर्माता: [Rodrigo Rangel / Hangell](https://github.com/Hangell) · [hangell.org](https://hangell.org)। [MIT लाइसेंस](https://github.com/Hangell/combinare/blob/main/LICENSE) के अंतर्गत उपलब्ध।

सहयोग: PIX `rodrigo@hangell.org` · क्रिप्टो/NFT `0xEd4d1be72F807Faa358C966a8eF63367c200130F`।
