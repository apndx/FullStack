import React from "react";
import { Container } from "semantic-ui-react";
import { HealthCheckEntry } from "../types";
import HealthRatingBar from "../components/HealthRatingBar";
import 'semantic-ui-css/semantic.min.css';
import { useStateValue } from "../state";

type HealthCheckEntryProps = {
  entry: HealthCheckEntry;
};

const HealthCheck = (props: HealthCheckEntryProps) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Container textAlign="left">
      <div>
        <h3>{props.entry.date} <i className="doctor icon"></i> </h3>
        <b>Description: </b>
        {props.entry.description} <br></br>
        <b>Specialist: </b>{props.entry.specialist}  <br></br>
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

export default HealthCheck;
