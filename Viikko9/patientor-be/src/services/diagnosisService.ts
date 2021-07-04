import diagnoseData from '../../data/diagnoses.json';
import { Diagnosis } from '../types';

const diagnoses: Array<Diagnosis> = diagnoseData;

const getDiagnoses = () => {
    return diagnoses;
  };
  
  const addDiagnose = () => {
    return null;
  };
  
  export default {
    getDiagnoses,
    addDiagnose
  };
