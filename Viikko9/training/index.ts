import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();
const url = require('url');

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  // expected format: /bmi?height=180&weight=72
  const queryObject = url.parse(req.url, true).query;
  const height = Number(queryObject.height);
  const weight = Number(queryObject.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: "malformatted parameters" });
  }

  const bmi = calculateBmi(height, weight);
  const bmiResult = { weight, height, bmi }
  console.log(bmiResult);

  res.status(200).send(bmiResult);
});


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
