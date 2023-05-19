export class Utils {
    static generateArray(total: number): number[] {
        let array: number[] = [];
        for (let i = 1; i <= total; i++) {
            array.push(i);
        }
        return array;
    }

    static getRandomSubset(array: number[], subsetLength: number): number[] {
        let copy = [...array];
        let result: number[] = [];
        for (let i = 0; i < subsetLength; i++) {
            let randomIndex = Math.floor(Math.random() * copy.length);
            result.push(copy.splice(randomIndex, 1)[0]);
        }
        return result;
    }

    static arraysAreEqual(arr1: number[], arr2: number[]): boolean {
        if (arr1.length !== arr2.length) {
            return false;
        }

        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
                return false;
            }
        }

        return true;
    }
}
