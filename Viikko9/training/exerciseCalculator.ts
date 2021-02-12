interface TrainWeekSummary {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Rating {
  numerical: number;
  written: string;
}

interface TrainCalculatorValues {
  target: number;
  hours: number[];
}

const parseExerciseArguments = (args: Array<string>): TrainCalculatorValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  if (args.filter(arg => isNaN(Number(arg))).length > 2) {
    throw new Error('All provided values were not numbers!');
  }
    const target = Number(args[2])
    const hours = args.slice(3).map(arg => Number(arg))
    return { target, hours }
}

const rate = (target: number, actual: number, sum: number): Rating => {

  if (sum >= target) {
    return { numerical: 3, written: 'well done' }
  } else if (actual >= target) {
    return { numerical: 3, written: 'well done' }
  } else if (sum > 1) {
    return { numerical: 2, written: 'not too bad but could be better' }
  }
  else return { numerical: 2, written: 'not quite there, next week will be better' }
}


const calculateExercise = (target: number, hours: number[]): TrainWeekSummary => {
  const trainingDays = hours.filter(h => h > 0).length;
  const sum = hours.reduce((a, b) => a + b, 0);
  const average = (sum / hours.length) || 0;
  const rating = rate(target, trainingDays, sum);

  const summary = {
    periodLength: hours.length,
    trainingDays,
    success: target <= trainingDays,
    rating: rating.numerical,
    ratingDescription: rating.written,
    target,
    average
  }

  return summary;
}

try {
  const { target, hours } = parseExerciseArguments(process.argv);
  console.log(calculateExercise(target, hours));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}
