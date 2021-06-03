import patientData from '../../data/patients.json';
import { Patient } from '../types';

export type NonSensitivePatient = Omit<Patient, 'ssn'>;

const patients: Array<Patient> = patientData;

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
      }));
    };
  
  const addPatient = () => {
    return null;
  };
  
  export default {
    getNonSensitivePatients,
    addPatient
  };
