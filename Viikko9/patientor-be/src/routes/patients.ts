/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';
import { Patient, NewPatient } from '../types';
import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req: express.Request, res: express.Response) => {
  console.log('Patient list requested');
  try {
    res.send(patientService.getNonSensitivePatients());
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get('/:id', (req: express.Request, res: express.Response) => {
  console.log('Getting single patient info');
  try {
    const patient = patientService.getPatient(req.params.id);
    res.send(patient);
  } catch (e) {
    res.status(400).send(e.message);
  }

});

router.post('/', (req: express.Request, res: express.Response) => {
  console.log('Adding a new patient');
  try {
    const newPatient: NewPatient = toNewPatient(req.body);
    const patient: Patient = patientService.addPatient(newPatient);
    res.json(patient);
  } catch (e) {
    res.status(400).send(e.message);
  }


});

export default router;
