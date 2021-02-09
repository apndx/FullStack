interface TrainWeekSummary {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface Rating {
  numerical: number,
  written: string
}


const rate = (target: number, actual: number, sum: number): Rating => {

  if (sum >= target) {
    return { numerical: 3, written: 'well done' }
  } else if (actual >= target) {
    return { numerical: 3, written: 'well done' }
  } else if (sum > 1) {
    return { numerical: 2, written: 'not too bad but could be better' }
  }
  else return { numerical: 2, written: 'next week will be better' }
}


const calculateExercise = (hours: number[], target: number): TrainWeekSummary => {

  const trainingDays = hours.filter(h => h > 0).length
  const sum = hours.reduce((a, b) => a + b, 0);
  const average = (sum / hours.length) || 0;
  const rating = rate(target, trainingDays, sum)

  const summary = {
    periodLength: hours.length,
    trainingDays,
    success: target <= trainingDays,
    rating: rating.numerical,
    ratingDescription: rating.written,
    target,
    average
  }

  return summary
}

console.log(calculateExercise([3, 0, 2, 4.5, 0, 3, 1],2))
