# Combinare

<p align="center">
  <a href="https://hangell.org/" target="blank"><img src="https://hangell.org/wp-content/uploads/2022/07/hangell.png" width="200" alt="My Bet Logo" /></a>
</p>
<p align="center">
<img src="https://img.shields.io/static/v1?label=STATUS&message=IN%20PRODUCTION&color=RED&style=for-the-badge"/>
<img src="https://img.shields.io/static/v1?label=LICENSE&message=MIT&color=BLUE&style=for-the-badge"/>
<img src="https://img.shields.io/static/v1?label=VERSION&message=1.0.0&color=RED&style=for-the-badge"/>
</p>

# Introduction
* [Description](#Description)
* [Installation](#Installation)
* [Usage](#Usage)
* [Generating Unique Combinations of Numbers](#Generating_Unique_Combinations_of_Numbers)
* [Generating Unique Combinations of Arrays](#Generating_Unique_Combinations_of_Arrays)
* [Generating Unique Combinations of Objects](#Generating_Unique_Combinations_of_Objects)
* [Sorting an Array of Objects](#Sorting_an_Array_of_Objects)
* [Curiosity about the name Combinare](#Curiosity_about_the_name_Combinare)
* [Contributing](#Contributing)
* [License](#License)
* [Donations](#Donations)
* [Created By](#Created By)

## Description


Combinare is a versatile library designed to facilitate the generation of unique combinations, making it a valuable tool in various scenarios. Whether you're looking to estimate possible numbers for a lottery, create combinations for game elements, or use it in the context of factories, Combinare has got you covered.

The library offers a range of functions to generate combinations of numbers, arrays, and objects. With Combinare, you can effortlessly generate unique combinations of numbers within a given range, specifying the desired length and total number of combinations. This feature is particularly useful for tasks like estimating potential lottery numbers.

In addition to numeric combinations, Combinare enables you to generate unique combinations of arrays. By providing input arrays, you can obtain a comprehensive set of combinations that cover all possible arrangements. This functionality is particularly handy for game development, factory simulations, and other scenarios that involve creating and combining elements.

Combinare also supports the generation of combinations with objects based on shared attributes. By supplying an array of objects, you can generate unique combinations that incorporate different attribute values. This capability can be leveraged in a wide range of applications, such as data analysis, algorithmic problem-solving, and more.

Furthermore, Combinare offers a sorting function that allows you to order an array of objects based on a specific attribute. You can choose the sorting order, whether ascending or descending, and ensure your objects are organized according to your criteria.

Overall, Combinare is a powerful library that empowers you to effortlessly generate unique combinations, facilitating tasks such as number estimation, game development, factory simulations, and beyond. Its intuitive functions and versatility make it a valuable asset in a variety of contexts.

## Installation

To install Combinare, run the following command:

```bash
npm install combinare
# or
yarn add combinare
```

## Usage

### Importing Combinare

To import combinare, use the following command:

```js
#js
const {Combinare} = require('combinare');
```

```ts
#ts
import {Combinare} from 'combinare';
```

### Generating Unique Combinations of Numbers

```js
const combinationsNumerics = Combinare.generateCombinationsNumerics(25, 15, 10);
console.log('Numeric Combinations:');
console.log(combinationsNumerics);
```

This function generates unique combinations of numbers within a given range.

* `total` (number): The total number of elements available for generating combinations.
* `combinationLength` (number): The desired length for each combination.
* `numberOfCombinations` (number): The total number of combinations to be generated.
* Returns: An array containing unique combinations of numbers.

The function returns an array containing unique combinations of numbers. Each combination is represented as an array of
numbers.

Example Output:

```js
Numeric
Combinations:
    [
        [1, 2, 3, 4, 5, 6, 7, 9, 11, 12, 14, 16, 17, 18, 20],
        [2, 4, 5, 6, 8, 9, 11, 12, 13, 15, 16, 17, 18, 20, 24],
        [1, 2, 3, 5, 7, 8, 9, 10, 11, 12, 13, 15, 16, 18, 21],
        // More combinations...
    ]
```

Each combination in the output represents a unique set of numbers within the specified range and length.

### Generating Unique Combinations of Arrays

```js
const arrays = [[1, 2], ['a', 'b', 'c'], [true, false]];

const combinationsArrays = Combinare.generateCombinationsArrays(arrays);
console.log('Array Combinations:');
console.log(combinationsArrays);
```

Generates unique combinations of arrays.

* `arrays` (array): The input arrays to generate combinations.
* Returns: An array containing unique combinations of arrays.

Example Output:

```js
Array
Combinations:
    [
        [1, 'a', true],
        [1, 'a', false],
        [1, 'b', true],
        [1, 'b', false],
        [1, 'c', true],
        [1, 'c', false],
        [2, 'a', true],
        [2, 'a', false],
        [2, 'b', true],
        [2, 'b', false],
        [2, 'c', true],
        [2, 'c', false]
    ]
```

### Generating Unique Combinations of Objects

```js
const objects = [
    {name: 'John', age: 25},
    {name: 'Jane', age: 30},
    {name: 'Bob', age: 40}
];

const combinationsObjects = Combinare.generateCombinationsObjects(objects);
console.log('Object Combinations:');
console.log(combinationsObjects);

```

Generates unique combinations of objects based on shared attributes. Only combines attributes existing in the objects.

* `objects` (array): The input objects to generate combinations.
* Returns: An array containing unique combinations of objects.

```js
Object_Combinations:
    [
        [{name: 'John', age: 25}],
        [{name: 'John', age: 30}],
        [{name: 'John', age: 40}],
        [{name: 'Jane', age: 25}],
        [{name: 'Jane', age: 30}],
        [{name: 'Jane', age: 40}],
        [{name: 'Bob', age: 25}],
        [{name: 'Bob', age: 30}],
        [{name: 'Bob', age: 40}]
    ]
```

### Sorting an Array of Objects by an Attribute

```js
const objects = [
    {name: 'John', age: 25},
    {name: 'Jane', age: 30},
    {name: 'Bob', age: 40}
];

const sortedObjects = Combinare.sortByObjectForAttribute(objects, 'age', 'asc');
console.log('Sorted Objects:');
console.log(sortedObjects);

```

Sorts an array of objects by the value of a specific attribute.

* `array` (array): The array of objects to be sorted.
* `attribute` (string): The name of the attribute by which the array should be sorted.
* `order` ('asc' | 'desc'): The sorting order, which can be 'asc' for ascending or 'desc' for descending.
* Returns: A new array with the objects sorted by the specified attribute.

Example Output:

```js
Sorted_Objects:
    [
        {name: 'John', age: 25},
        {name: 'Jane', age: 30},
        {name: 'Bob', age: 40}
    ]
```

## Curiosity about the name Combinare

The name "Combinare" was chosen for this library to reflect its purpose and the concept it embodies. "Combinare" is derived from the Latin word "combinare," which means "to combine" or "to join together."

The essence of this library is to generate unique combinations by combining different elements or arrays. It provides powerful functionalities to generate combinations of numbers, arrays, and objects based on shared attributes.

By using the Latin word "combinare" as the name, the library encapsulates the idea of bringing together elements in various ways to create unique combinations. It highlights the core functionality and purpose of the library, making it intuitive and memorable for users.

The name "Combinare" serves as a reminder of the library's capability to facilitate the generation of combinations and reflects its origin in the concept of combination from the Latin language.

## Contributing

Contributions are welcome! If you have any improvements or new features you'd like to add to Laima, please follow these
steps:

1. Fork the repository.
2. Create a new branch for your feature or improvement.
3. Make the necessary changes and commit them.
4. Push your branch to your forked repository.
5. Submit a pull request to the main repository.

* Please ensure that your code follows the established coding conventions and includes appropriate tests for any new
  functionality.

## License

Combinare is licensed under the MIT license. Please refer to the LICENSE file for more information.

## Donations

If you enjoyed using Laima, please consider making a donation to support the continuous development of the project. You
can make a donation using one of the following options:

* Pix: rodrigo@hangell.org

* Cryptocurrencies or nft MetaMask: 0xEd4d1be72F807Faa358C966a8eF63367c200130F



## Created By

![Created By](https://hangell.org/wp-content/uploads/2022/04/rodrigorangel.jpeg)
<div>
<a href="https://hangell.org" target="_blank"><img src="https://img.shields.io/badge/website-000000?style=for-the-badge&logo=About.me&logoColor=white" target="_blank"></a>
  <a href="https://play.google.com/store/apps/dev?id=5606456325281613718" target="_blank"><img src="https://img.shields.io/badge/Google_Play-414141?style=for-the-badge&logo=google-play&logoColor=white" target="_blank"></a>
  <a href="https://www.youtube.com/channel/UC8_zG7RFM2aMhI-p-6zmixw" target="_blank"><img src="https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white" target="_blank"></a>
  <a href="https://www.facebook.com/hangell.org" target="_blank"><img src="	https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white" target="_blank"></a>
  <a href="https://www.linkedin.com/in/rodrigo-rangel-a80810170" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>

</div>
