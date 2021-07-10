import {
  NewPatient,
  Gender,
  PatientFields,
  Entry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry
} from './types';
import { FinnishSSN } from 'finnish-ssn';
import { v1 as uuid } from 'uuid';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

export const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const isSsn = (ssn: string): boolean => {
  const isValid = FinnishSSN.validate(ssn);
  return isValid;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn) || !isSsn(ssn)) {
    throw new Error('Incorrect or missing social security number: ' + ssn);
  }
  return ssn;
};


const isEntryType = (entries: unknown): entries is Entry[] => {
  const entryTypes = ["Hospital", "HealthCheck", "OccupationalHealthcare"] as const;
  if (!Array.isArray(entries)) {
    console.log('not array')
    return false;
  }
  const filtered = entries.filter(item => entryTypes.includes(item.type))
  if (filtered.length < entries.length) {
    console.log('too short')
    return false;
  }
  return true;
};


const parseEntries = (entries: unknown): Entry[] => {
  if (!entries) {
    return [];
  }
  else if (!isEntryType(entries)) {
    throw new Error('Incorrect entry');
  }
  return entries;
};


export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation, entries }: PatientFields): NewPatient => {

  const newPatient: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: parseEntries(entries)
  };

  return newPatient;
};



export const toNewEntry = (entry: Entry): Entry => {
  switch (entry.type) {
    case "Hospital":
      const hospitalEntry: HospitalEntry = {
        type: entry.type,
        id: uuid(),
        description: entry.description,
        date: entry.date,
        specialist: entry.specialist,
        ...(entry.diagnosisCodes && { diagnosisCodes: entry.diagnosisCodes }),
        discharge: entry.discharge
      }
      return hospitalEntry;
    case "OccupationalHealthcare":
      const occupationalEntry: OccupationalHealthcareEntry = {
        type: entry.type,
        id: uuid(),
        description: entry.description,
        date: entry.date,
        specialist: entry.specialist,
        employerName: entry.employerName,
        ...(entry.diagnosisCodes && { diagnosisCodes: entry.diagnosisCodes }),
        ...(entry.sickLeave && { sickLeave: entry.sickLeave }),
      }
      return occupationalEntry;
    case "HealthCheck":
      const healthCheckEntry: HealthCheckEntry = {
        type: entry.type,
        id: uuid(),
        description: entry.description,
        date: entry.date,
        specialist: entry.specialist,
        healthCheckRating: entry.healthCheckRating,
        ...(entry.diagnosisCodes && { diagnosisCodes: entry.diagnosisCodes })
      }
      return healthCheckEntry;
    default:
      return assertNever(entry);
  }
};

/**
 * Helper function for exhaustive type checking
 */
export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
