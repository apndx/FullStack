interface BmiCalculatorValues {
  height: number;
  weight: number;
}


const parseBmiArguments = (args: Array<string>): BmiCalculatorValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('All provided values were not numbers!');
  }
}


const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height/100 * height/100)

  if (bmi < 15) {
    return 'Very severely underweight';
  } else if (bmi < 16 && bmi > 15) {
    return 'Severely underweight';
  } else if (bmi < 18.5 && bmi > 16 ) {
    return 'Underweight';
  } else if (bmi < 25 && bmi > 18.5 ) {
    return 'Normal (healthy weight)';
  } else if (bmi < 30 && bmi > 25 ) {
    return 'Overweight';
  } else if (bmi < 35 && bmi > 30) {
    return 'Obese Class I (Moderately obese)';
  } else if (bmi < 40 && bmi > 35) {
    return 'Obese Class II (Severely obese)';
  } else return 'Obese Class III (Very severely obese)'
}

try {
  const { height, weight } = parseBmiArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}
