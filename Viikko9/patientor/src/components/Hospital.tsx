import React from "react";
import { Container } from "semantic-ui-react";
import { HospitalEntry } from "../types";
import HealthRatingBar from "./HealthRatingBar";
import DiagnosisList from "./DiagnosisList";
import 'semantic-ui-css/semantic.min.css';

type HospitalEntryProps = {
  entry: HospitalEntry;
};

const Hospital = (props: HospitalEntryProps) => {
  return (
    <Container textAlign="left">
      <h3>{props.entry.date} <i className="hospital icon"></i> </h3>
      <b>Description: </b>
      {props.entry.description} <br></br>
      <b>Specialist: </b>{props.entry.specialist}  <br></br>
      <b>Discharge: </b> {props.entry.discharge.date} {props.entry.discharge.criteria}
      {props.entry.diagnosisCodes && <DiagnosisList diagnosisCodes={props.entry.diagnosisCodes} />}
      <HealthRatingBar showText={false} rating={1} />
    </Container>
  );
};

export default Hospital;
