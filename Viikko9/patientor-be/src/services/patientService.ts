import patientData from '../../data/patients';
import { Patient, PublicPatient, NewPatient, Entry } from '../types';
import { toNewPatient } from '../utils';
import { v1 as uuid } from 'uuid';

var patients: Patient[] = patientData.map(obj => {
  const object = toNewPatient(obj) as Patient;
  object.id = obj.id;
  return object;
});

export const getNonSensitivePatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

export const getPatient = (id: string): Patient | undefined => {
  const patient = patients.find(d => d.id === id);
  return patient;
};

export const updatePatients = (updatedPatient: Patient) => {
  patients = patients.map(p => p.id !== updatedPatient.id ? p : updatedPatient)
};

export const updatePatient = (oldPatient: Patient, entry: Entry): Patient => {
  const entries = {
    ...oldPatient.entries,
    entry
  }
  const updatedPatient = {
    ...oldPatient,
    entries: entries
  }
  return updatedPatient;
};

export const addPatient = (newPatient: NewPatient) => {

  const patient: Patient = {
    id: uuid(),
    ...newPatient
  };

  patients.push(patient);
  return patient;
};


export default {
  getNonSensitivePatients,
  addPatient,
  getPatient,
  updatePatient,
  updatePatients
};
