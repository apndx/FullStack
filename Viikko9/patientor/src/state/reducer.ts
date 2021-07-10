import { State } from "./state";
import { Patient, Diagnosis } from "../types";

export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
  | {
    type: "ADD_PATIENT";
    payload: Patient;
  }
  | {
    type: "SET_PATIENT";
    payload: Patient;
  }
  | {
    type: "SET_DIAGNOSIS_LIST";
    payload: Diagnosis[];
  }
  | {
    type: "ADD_ENTRY";
    payload: Patient;
  };


export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT":
      return {
        ...state,
        currentPatient: action.payload
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses
        }
      };
    case "ADD_ENTRY":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        },
        currentPatient: action.payload
      };
    default:
      return state;
  }
};

export const setPatientList = (patientListFromApi: Patient[]) => {
  return {
    type: 'SET_PATIENT_LIST' as const,
    payload: patientListFromApi
  };
};

export const addPatient = (newPatient: Patient) => {
  return {
    type: 'ADD_PATIENT' as const,
    payload: newPatient
  };
};

export const setPatient = (patient: Patient) => {
  return {
    type: 'SET_PATIENT' as const,
    payload: patient
  };
};

export const setDiagnosisList = (diagnosisListFromApi: Diagnosis[]) => {
  return {
    type: 'SET_DIAGNOSIS_LIST' as const,
    payload: diagnosisListFromApi
  };
};

export const addEntry = (updatedPatient: Patient) => {
  return {
    type: 'ADD_ENTRY' as const,
    payload: updatedPatient
  };
};
