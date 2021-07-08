import React from "react";
import { Container } from "semantic-ui-react";
import { HealthCheckEntry } from "../types";
import HealthRatingBar from "../components/HealthRatingBar";
import DiagnosisList from "./DiagnosisList";
import 'semantic-ui-css/semantic.min.css';

type HealthCheckEntryProps = {
  entry: HealthCheckEntry;
};

const HealthCheck = (props: HealthCheckEntryProps) => {
  return (
    <Container textAlign="left">
      <div>
        <h3>{props.entry.date} <i className="doctor icon"></i> </h3>
        <b>Description: </b>
        {props.entry.description} <br></br>
        <b>Specialist: </b>{props.entry.specialist}  <br></br>
        {props.entry.diagnosisCodes && <DiagnosisList diagnosisCodes={props.entry.diagnosisCodes} />}
        <HealthRatingBar showText={false} rating={1} />
      </div>
    </Container>
  );
};

export default HealthCheck;
