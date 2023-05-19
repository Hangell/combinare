import { Utils } from "./utils";

type ObjectWithProperties = Record<string, any>;
type ObjectWithPropertiesOrder = { [key: string]: any };

type SortOrder = "asc" | "desc";

export class Combinare {

    /**
    * Gera combinações únicas de números dentro de um determinado intervalo.
    * 
    * @param total O número total de elementos disponíveis para a geração das combinações.
    * @param combinationLength O comprimento desejado para cada combinação.
    * @param numberOfCombinations O número total de combinações a serem geradas.
    * @returns Um array contendo combinações únicas de números.
    */
    static generateCombinationsNumerics(
        total: number,
        combinationLength: number,
        numberOfCombinations: number
    ): number[][] {
        // Gere um array de 1 até 'total'
        const array = Utils.generateArray(total);

        // Inicialize um array vazio para armazenar as combinações
        let combinations: number[][] = [];

        // Continue gerando combinações até que tenhamos o número desejado
        while (combinations.length < numberOfCombinations) {
            // Gere uma combinação aleatória
            let combination = Utils.getRandomSubset(array, combinationLength);

            // Ordene a combinação em ordem crescente
            combination.sort((a, b) => a - b);

            // Verifique se a combinação já existe no array de combinações
            const isUnique = combinations.every((existing) => !Utils.arraysAreEqual(existing, combination));

            // Adicione a combinação apenas se for única
            if (isUnique) {
                combinations.push(combination);
            }
        }

        return combinations;
    }

    /**
    * Gera combinações únicas de arrays.
    * 
    * @param arrays Os arrays de entrada para gerar combinações.
    * @returns Um array contendo combinações únicas de arrays.
    */
    static generateCombinationsArrays<T>(arrays: T[][]): T[][] {
        let combinations: T[][] = [[]];

        for (let i = 0; i < arrays.length; i++) {
            const currentArray = arrays[i];
            let tempCombinations: T[][] = [];

            for (let j = 0; j < combinations.length; j++) {
                const combination = combinations[j];

                for (let k = 0; k < currentArray.length; k++) {
                    tempCombinations.push([...combination, currentArray[k]]);
                }
            }

            combinations = tempCombinations;
        }

        return combinations;
    }

    /**
     * Gera combinações únicas de objetos com base nos atributos compartilhados.
     * Somente combina atributos existentes nos objetos.
     * 
     * @param objects Os objetos de entrada para gerar combinações.
     * @returns Um array contendo combinações únicas de objetos.
     */
    static generateCombinationsObjects<T extends ObjectWithProperties>(objects: T[]): T[][] {
        const objectKeys = Object.keys(objects[0]);

        let combinations: T[][] = [[]];

        for (let i = 0; i < objectKeys.length; i++) {
            const key = objectKeys[i];
            const values = Array.from(new Set(objects.map(obj => obj[key])));

            const tempCombinations: T[][] = [];

            for (let j = 0; j < combinations.length; j++) {
                const combination = combinations[j];

                for (let k = 0; k < values.length; k++) {
                    const value = values[k];
                    const newObject: T = { ...combination[0], [key]: value } as T;
                    tempCombinations.push([newObject]);
                }
            }

            combinations = tempCombinations;
        }

        // Remove objetos duplicados
        combinations = combinations.filter((combination, index) => {
            const combinationString = JSON.stringify(combination);
            return combinations.findIndex(c => JSON.stringify(c) === combinationString) === index;
        });

        return combinations;
    }


    /**
     * Ordena um array de objetos pelo valor de um atributo específico.
     * 
     * @template T O tipo do array de objetos.
     * @param {T[]} arr O array de objetos a ser ordenado.
     * @param {string} attribute O nome do atributo pelo qual o array deve ser ordenado.
     * @param {SortOrder} order A ordem de classificação, que pode ser "asc" para ascendente ou "desc" para descendente.
     * @returns {T[]} Um novo array com os objetos ordenados pelo atributo especificado.
     */
    static sortByObjectForAttribute<T extends ObjectWithPropertiesOrder>(arr: T[], attribute: string, order: SortOrder): T[] {
        return arr.sort((a, b) => {
            const valueA = a[attribute];
            const valueB = b[attribute];

            if (typeof valueA === "string" || typeof valueA === "number") {
                if (order === "asc") {
                    return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
                } else {
                    return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
                }
            } else if (typeof valueA === "boolean") {
                if (order === "asc") {
                    // Prioritize false over true in ascending order
                    return valueA ? 1 : -1;
                } else {
                    // Prioritize true over false in descending order
                    return valueA ? -1 : 1;
                }
            }
    
            return 0; // No sorting for other types
        });
    }

}

// Exportar a classe Combinare como propriedade do objeto global window
if (typeof window !== 'undefined') {
    // Running in a browser
    (window as any).Combinare = Combinare;
} else if (typeof global !== 'undefined') {
    // Running in Node.js
    (global as any).Combinare = Combinare;
}

