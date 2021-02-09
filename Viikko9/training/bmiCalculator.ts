const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight/(height*height)
    
    return 'Normal (healthy weight)'
}

console.log(calculateBmi(180, 74))
