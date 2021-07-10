import React from "react";
import { Container } from "semantic-ui-react";
import { OccupationalHealthcareEntry } from "../types";
import DiagnosisList from "./DiagnosisList";
import 'semantic-ui-css/semantic.min.css';

type OccupationalHealthcareProps = {
  entry: OccupationalHealthcareEntry;
};

const OccupationalHealthcare = (props: OccupationalHealthcareProps) => {
  return (
    <Container textAlign="left">
      <div>
        <h3>{props.entry.date} <i className="stethoscope icon"></i> </h3>
        <b>Description: </b> {props.entry.description} <br></br>
        <b>Specialist: </b> {props.entry.specialist} <br></br>
        <b>Employer: </b> {props.entry.employerName}
        {props.entry.sickLeave &&
          <div>
            <b>Sickleave:</b>
            <p>Start: {props.entry.sickLeave.startDate} End: {props.entry.sickLeave.endDate} </p></div>}
        {props.entry.diagnosisCodes && <DiagnosisList diagnosisCodes={props.entry.diagnosisCodes} />}
      </div>
    </Container>
  );
};

export default OccupationalHealthcare;
