import React from "react";
import { Container } from "semantic-ui-react";
import { OccupationalHealthcareEntry } from "../types";
import HealthRatingBar from "../components/HealthRatingBar";
import { useStateValue } from "../state";
import 'semantic-ui-css/semantic.min.css';

type OccupationalHealthcareProps = {
  entry: OccupationalHealthcareEntry;
};

const OccupationalHealthcare = (props: OccupationalHealthcareProps) => {
  const [{ diagnoses }] = useStateValue();
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

        {props.entry.diagnosisCodes &&
          <ul>
            <b>Diagnoses:</b>
            {props.entry.diagnosisCodes.map(code =>
              <li key={code}>
                {code} {diagnoses[code] ? diagnoses[code].name : ""}
              </li>)}
          </ul>
        }
        <HealthRatingBar showText={false} rating={1} />
      </div>
    </Container>
  );
};

export default OccupationalHealthcare;
