import express from 'express';
import patientService from '../services/patientService'

const router = express.Router();

router.get('/', (_req, res) => {
    console.log('Patient list requested');
    res.send(patientService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
    console.log('Adding a new patient');
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    const newPatient = patientService.addPatient({
        name, dateOfBirth, ssn, gender, occupation
    })
    res.json(newPatient);
});

export default router;
