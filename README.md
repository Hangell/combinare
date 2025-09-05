# Combinare

<p align="center">
  <a href="https://hangell.org/" target="blank"><img src="https://hangell.org/wp-content/uploads/2022/07/hangell.png" width="200" alt="Combinare Logo" /></a>
</p>

<p align="center">
  <img src="https://img.shields.io/static/v1?label=STATUS&message=IN%20PRODUCTION&color=GREEN&style=for-the-badge"/>
  <img src="https://img.shields.io/static/v1?label=LICENSE&message=MIT&color=BLUE&style=for-the-badge"/>
  <img src="https://img.shields.io/static/v1?label=VERSION&message=1.0.0&color=ORANGE&style=for-the-badge"/>
</p>

## 📚 Table of Contents

- [Description](#-description)
- [Installation](#-installation)
- [Usage](#-usage)
  - [Basic Import](#basic-import)
  - [Generating Unique Combinations of Numbers](#generating-unique-combinations-of-numbers)
  - [Generating Unique Combinations of Arrays](#generating-unique-combinations-of-arrays)
  - [Generating Unique Combinations of Objects](#generating-unique-combinations-of-objects)
  - [Sorting Arrays of Objects](#sorting-arrays-of-objects)
- [API Reference](#-api-reference)
- [Examples](#-examples)
- [About the Name](#-about-the-name-combinare)
- [Contributing](#-contributing)
- [License](#-license)
- [Support](#-support)
- [Author](#-author)

## 📖 Description

**Combinare** is a powerful and versatile TypeScript/JavaScript library designed to simplify the generation of unique combinations across different data types. Whether you're working with numbers, arrays, or objects, Combinare provides efficient methods to create combinations for various use cases.

### Key Features

- 🔢 **Numeric Combinations**: Generate unique number combinations within specified ranges
- 📊 **Array Combinations**: Create Cartesian products from multiple arrays
- 🎯 **Object Combinations**: Generate combinations based on object attributes
- 🔄 **Flexible Sorting**: Sort object arrays by any attribute with customizable order
- 🚀 **TypeScript Support**: Full type safety and IntelliSense support
- 🌐 **Universal**: Works in both browser and Node.js environments

### Use Cases

- **Lottery Systems**: Generate potential number combinations
- **Game Development**: Create unique item combinations and configurations
- **Data Analysis**: Generate test scenarios and data permutations
- **Factory Patterns**: Create combinations of product configurations
- **Algorithm Testing**: Generate comprehensive test data sets

## 🚀 Installation

Install Combinare using your preferred package manager:

```bash
# NPM
npm install combinare

# Yarn
yarn add combinare

# PNPM
pnpm add combinare
```

## 💻 Usage

### Basic Import

```javascript
// CommonJS
const { Combinare } = require('combinare');

// ES Modules
import { Combinare } from 'combinare';
```

### Generating Unique Combinations of Numbers

Perfect for lottery systems, gaming, or any scenario requiring unique numeric combinations.

```javascript
// Generate 10 unique combinations of 15 numbers from 1 to 25
const numericCombinations = Combinare.generateCombinationsNumerics(25, 15, 10);

console.log('Numeric Combinations:', numericCombinations);
// Output:
// [
//   [1, 2, 3, 4, 5, 6, 7, 9, 11, 12, 14, 16, 17, 18, 20],
//   [2, 4, 5, 6, 8, 9, 11, 12, 13, 15, 16, 17, 18, 20, 24],
//   [1, 2, 3, 5, 7, 8, 9, 10, 11, 12, 13, 15, 16, 18, 21],
//   // ... 7 more combinations
// ]
```

### Generating Unique Combinations of Arrays

Create Cartesian products from multiple arrays - ideal for configuration generators and game mechanics.

```javascript
const inputArrays = [
  ['small', 'medium', 'large'],        // sizes
  ['red', 'blue', 'green'],            // colors
  [true, false]                        // availability
];

const arrayCombinations = Combinare.generateCombinationsArrays(inputArrays);

console.log('Array Combinations:', arrayCombinations);
// Output:
// [
//   ['small', 'red', true],
//   ['small', 'red', false],
//   ['small', 'blue', true],
//   ['small', 'blue', false],
//   ['small', 'green', true],
//   ['small', 'green', false],
//   ['medium', 'red', true],
//   // ... all possible combinations
// ]
```

### Generating Unique Combinations of Objects

Generate combinations based on shared object attributes - perfect for data analysis and testing scenarios.

```javascript
const users = [
  { name: 'Alice', age: 25, city: 'New York' },
  { name: 'Bob', age: 30, city: 'London' },
  { name: 'Charlie', age: 35, city: 'Tokyo' }
];

const objectCombinations = Combinare.generateCombinationsObjects(users);

console.log('Object Combinations:', objectCombinations);
// Output:
// [
//   [{ name: 'Alice', age: 25, city: 'New York' }],
//   [{ name: 'Alice', age: 30, city: 'New York' }],
//   [{ name: 'Alice', age: 35, city: 'New York' }],
//   [{ name: 'Bob', age: 25, city: 'New York' }],
//   [{ name: 'Bob', age: 30, city: 'London' }],
//   // ... all combinations of attributes
// ]
```

### Sorting Arrays of Objects

Sort object arrays by any attribute with ascending or descending order.

```javascript
const products = [
  { name: 'Laptop', price: 999, inStock: true },
  { name: 'Mouse', price: 25, inStock: false },
  { name: 'Keyboard', price: 75, inStock: true }
];

// Sort by price (ascending)
const sortedByPrice = Combinare.sortByObjectForAttribute(products, 'price', 'asc');

console.log('Sorted by Price:', sortedByPrice);
// Output:
// [
//   { name: 'Mouse', price: 25, inStock: false },
//   { name: 'Keyboard', price: 75, inStock: true },
//   { name: 'Laptop', price: 999, inStock: true }
// ]

// Sort by stock status (descending - true first)
const sortedByStock = Combinare.sortByObjectForAttribute(products, 'inStock', 'desc');
```

## 📋 API Reference

### `generateCombinationsNumerics(total, combinationLength, numberOfCombinations)`

Generates unique combinations of numbers within a specified range.

**Parameters:**
- `total` (number): Total number of elements available (creates range 1 to total)
- `combinationLength` (number): Length of each combination
- `numberOfCombinations` (number): Number of unique combinations to generate

**Returns:** `number[][]` - Array of unique number combinations

---

### `generateCombinationsArrays<T>(arrays)`

Generates all possible combinations from multiple arrays (Cartesian product).

**Parameters:**
- `arrays` (T[][]): Array of arrays to combine

**Returns:** `T[][]` - Array containing all possible combinations

---

### `generateCombinationsObjects<T>(objects)`

Generates unique combinations of objects based on their shared attributes.

**Parameters:**
- `objects` (T[]): Array of objects with shared properties

**Returns:** `T[][]` - Array of object combinations with all attribute variations

---

### `sortByObjectForAttribute<T>(arr, attribute, order)`

Sorts an array of objects by a specific attribute.

**Parameters:**
- `arr` (T[]): Array of objects to sort
- `attribute` (string): Attribute name to sort by
- `order` ('asc' | 'desc'): Sorting order

**Returns:** `T[]` - New sorted array

**Supported Types:** string, number, boolean

## 🎯 Examples

### Lottery Number Generator

```javascript
// Generate 5 lottery tickets with 6 numbers each (1-49)
const lotteryTickets = Combinare.generateCombinationsNumerics(49, 6, 5);
lotteryTickets.forEach((ticket, index) => {
  console.log(`Ticket ${index + 1}: ${ticket.join(', ')}`);
});
```

### Product Configuration Generator

```javascript
const sizes = ['XS', 'S', 'M', 'L', 'XL'];
const colors = ['Black', 'White', 'Navy', 'Gray'];
const styles = ['Regular', 'Slim', 'Relaxed'];

const productConfigs = Combinare.generateCombinationsArrays([sizes, colors, styles]);
console.log(`Generated ${productConfigs.length} product configurations`);
```

### User Testing Scenarios

```javascript
const testUsers = [
  { role: 'admin', experience: 'beginner', device: 'mobile' },
  { role: 'user', experience: 'expert', device: 'desktop' },
  { role: 'guest', experience: 'intermediate', device: 'tablet' }
];

const testScenarios = Combinare.generateCombinationsObjects(testUsers);
console.log(`Created ${testScenarios.length} test scenarios`);
```

## 🤔 About the Name "Combinare"

The name **"Combinare"** derives from the Latin word meaning "to combine" or "to join together." This perfectly captures the library's essence: bringing together different elements to create unique combinations.

By choosing this Latin root, we emphasize the fundamental mathematical and logical concept of combination that the library implements, making it both memorable and meaningful for developers working with combinatorial problems.

## 🤝 Contributing

We welcome contributions! Here's how you can help improve Combinare:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Add tests for new functionality
- Update documentation as needed
- Ensure backward compatibility
- Follow the existing code style

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 💖 Support

If you find Combinare helpful, consider supporting its development:

**PIX (Brazil):** `rodrigo@hangell.org`

**Cryptocurrency/NFT:** `0xEd4d1be72F807Faa358C966a8eF63367c200130F`

Your support helps maintain and improve this open-source project!

## 👨‍💻 Author

<div align="center">
  <img src="https://hangell.org/wp-content/uploads/2022/04/rodrigorangel.jpeg" width="150" style="border-radius: 50%;" />

**Rodrigo Rangel**

  <div>
    <a href="https://hangell.org" target="_blank">
      <img src="https://img.shields.io/badge/website-000000?style=for-the-badge&logo=About.me&logoColor=white" alt="Website" />
    </a>
    <a href="https://play.google.com/store/apps/dev?id=5606456325281613718" target="_blank">
      <img src="https://img.shields.io/badge/Google_Play-414141?style=for-the-badge&logo=google-play&logoColor=white" alt="Google Play" />
    </a>
    <a href="https://www.youtube.com/channel/UC8_zG7RFM2aMhI-p-6zmixw" target="_blank">
      <img src="https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="YouTube" />
    </a>
    <a href="https://www.facebook.com/hangell.org" target="_blank">
      <img src="https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white" alt="Facebook" />
    </a>
    <a href="https://www.linkedin.com/in/rodrigo-rangel-a80810170" target="_blank">
      <img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
    </a>
  </div>
</div>

---

<div align="center">
  <strong>Made with ❤️ for the developer community</strong>
</div>
