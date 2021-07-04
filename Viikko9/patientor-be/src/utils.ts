import { NewPatient, Gender, PatientFields, Entry } from './types';
import { FinnishSSN } from 'finnish-ssn';

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
  if (!entries || !isEntryType(entries)) {
    throw new Error('Incorrect entry');
  }
  console.log('Entries ok')
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
