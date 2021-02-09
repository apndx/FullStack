const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height/100 * height/100)

  if (bmi < 15) {
    return 'Very severely underweight'
  } else if (bmi < 16 && bmi > 15) {
    return 'Severely underweight'
  } else if (bmi < 18.5 && bmi > 16 ) {
    return 'Underweight'
  } else if (bmi < 25 && bmi > 18.5 ) {
    return 'Normal (healthy weight)'
  } else if (bmi < 30 && bmi > 25 ) {
    return 'Overweight'
  } else if (bmi < 35 && bmi > 30) {
    return 'Obese Class I (Moderately obese)'
  } else if (bmi < 40 && bmi > 35) {
    return 'Obese Class II (Severely obese)'
  } else return 'Obese Class III (Very severely obese)'
}

console.log(calculateBmi(180, 74))
console.log(calculateBmi(167, 70))
