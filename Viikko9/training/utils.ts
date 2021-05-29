export function isArrayOfNumbers(exercises: number[]): number[] {
    if (Array.isArray(exercises) && exercises.every(item => typeof item === "number")) {
        const validExercises: number[] = exercises.filter(a => Number(a));
        return validExercises;
    }
    else return [];
 }
