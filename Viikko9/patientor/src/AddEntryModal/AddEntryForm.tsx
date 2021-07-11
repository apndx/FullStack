import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { useStateValue } from "../state";
import { TextField, EntrySelectField, EntryOption, DiagnosisSelection, NumberField } from "../components/FormField";
import { AllEntryValues, EntryType, HealthCheckRating } from "../types";
import { isValidDate } from "../utils";

/*
 * use type Entry, but omit id,
 * because it is irrelevant for new entry object.
 */
export type EntryFormValues = Omit<AllEntryValues, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const entryOptions: EntryOption[] = [
  { value: EntryType.HealthCheckEntry, label: "Health Check" },
  { value: EntryType.HospitalEntry, label: "Hospital" },
  { value: EntryType.OccupationalHealthcareEntry, label: "Occupational" }
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: "HealthCheck",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        employerName: "",
        sickLeave: { startDate: "", endDate: "" },
        discharge: { date: "", criteria: "" },
        healthCheckRating: HealthCheckRating.LowRisk,
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const dateError = "Correct format for date is YYYY-MM-DD";
        const errors: { [field: string]: string } = {};

        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date || !isValidDate(values.date)) {
          errors.date = dateError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.type === EntryType.HospitalEntry && !values.discharge.criteria) {
          errors.discharge = requiredError;
        }
        if (values.type === EntryType.HospitalEntry && !isValidDate(values.discharge.date)) {
          errors.discharge = dateError;
        }
        if (values.type === EntryType.OccupationalHealthcareEntry && !values.employerName) {
          errors.employerName = requiredError;
        }
        if (values.type === EntryType.OccupationalHealthcareEntry &&
          values.sickLeave.startDate !== "" &&
          !isValidDate(values.sickLeave.startDate)) {
          errors.discharge = dateError;
        }
        if (values.type === EntryType.OccupationalHealthcareEntry &&
          values.sickLeave.endDate !== "" &&
          !isValidDate(values.sickLeave.endDate)) {
          errors.discharge = dateError;
        }
        // if (values.type === EntryType.HealthCheckEntry &&
        //   values.sickLeave.endDate !== "" &&
        //   !isValidDate(values.sickLeave.endDate)) {
        //   errors.discharge = dateError;
        // }
        return errors;
      }}
    >
      {({ values, isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <EntrySelectField
              label="Entry Type"
              name="type"
              options={entryOptions}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            {values.type === EntryType.OccupationalHealthcareEntry && <Field
              label="Employer"
              placeholder="Employer"
              name="employerName"
              component={TextField}
            />}
            {values.type === EntryType.OccupationalHealthcareEntry && <Field
              label="Sick leave start date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />}
            {values.type === EntryType.OccupationalHealthcareEntry && <Field
              label="Sick leave end date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={TextField}
            />}
            {values.type === EntryType.HospitalEntry && <Field
              label="Discharge criteria"
              placeholder="Discharge criteria"
              name="discharge.criteria"
              component={TextField}
            />}
            {values.type === EntryType.HospitalEntry && <Field
              label="Discharge date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />}
            {values.type === EntryType.HealthCheckEntry && <Field
              label="Health Check Rating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
            />}
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
