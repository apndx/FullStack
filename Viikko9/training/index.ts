import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercise } from './exerciseCalculator';
import { isArrayOfNumbers } from './utils';

const app = express();
import url from 'url';
app.use(express.json());

app.get('/hello', (_req: express.Request, res: express.Response) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: express.Request, res: express.Response) => {
  // expected format: /bmi?height=180&weight=72
  const queryObject = url.parse(req.url, true).query;
  const height = Number(queryObject.height);
  const weight = Number(queryObject.weight);

  if (isNaN(height) || isNaN(weight)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const bmi = calculateBmi(height, weight);
  const bmiResult = { weight, height, bmi };
  console.log(bmiResult);

  return res.status(200).send(bmiResult);
});

app.post('/exercises', (req: express.Request, res: express.Response) => {

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
    const dailyExercises: number[] = req.body.daily_exercises;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const validExercises: number[] = isArrayOfNumbers(dailyExercises);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
    const target = Number(req.body.target);
    if (isNaN(Number(target)) || validExercises.length === 0) {
      return res.status(400).json({ error: "malformatted parameters" });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const numberExercises = dailyExercises.map(a => Number(a));
    const exerciseResult = calculateExercise(target, numberExercises);
    console.log('Exercise result: ', exerciseResult);
    return res.json(exerciseResult);
  } catch (e) {
    return res.status(400).json({ error: "something went wrong" });
  }

});


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
