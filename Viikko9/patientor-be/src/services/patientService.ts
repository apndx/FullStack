import patientData from '../../data/patients.json';
import { Patient, NonSensitivePatient, NewPatient } from '../types';
import toNewPatient from '../utils'

const patients: Patient[] = patientData.map(obj => {
  const object = toNewPatient(obj) as Patient;
  object.id = obj.id;
  return object;
});

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (newPatient: NewPatient) => {
  const patient = toNewPatient(newPatient)
  patients.push(patient)
  return patient
};


export default {
  getNonSensitivePatients,
  addPatient
};

