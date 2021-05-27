interface BmiCalculatorValues {
  height: number;
  weight: number;
}

type ResultSuccess<T> = { type: 'success'; value: T };
type ResultError = { type: 'error'; error: Error };
type Result<T> = ResultSuccess<T> | ResultError;

const parseBmiArguments = (args: Array<string>): Result<BmiCalculatorValues> => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      type: 'success', value: {
        height: Number(args[2]),
        weight: Number(args[3])
      }
    };
  } else {
    return { type: 'error', error: new Error('All provided values were not numbers!') };
  }
};


const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100 * height / 100);

  if (bmi < 15) {
    return 'Very severely underweight';
  } else if (bmi < 16 && bmi > 15) {
    return 'Severely underweight';
  } else if (bmi < 18.5 && bmi > 16) {
    return 'Underweight';
  } else if (bmi < 25 && bmi > 18.5) {
    return 'Normal (healthy weight)';
  } else if (bmi < 30 && bmi > 25) {
    return 'Overweight';
  } else if (bmi < 35 && bmi > 30) {
    return 'Obese Class I (Moderately obese)';
  } else if (bmi < 40 && bmi > 35) {
    return 'Obese Class II (Severely obese)';
  } else return 'Obese Class III (Very severely obese)';
};

if (process.argv.length > 2) {
  const result: Result<BmiCalculatorValues> = parseBmiArguments(process.argv);
  if (result.type === 'success') {
    const height = result.value.height;
    const weight = result.value.weight;
    console.log(calculateBmi(height, weight));
  } else {
    console.log('Error, something bad happened, message: ', result.error);
  }
}

export { calculateBmi };
