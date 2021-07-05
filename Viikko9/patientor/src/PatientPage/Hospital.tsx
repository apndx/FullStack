import React from "react";
import { Container } from "semantic-ui-react";
import { HospitalEntry } from "../types";
import HealthRatingBar from "../components/HealthRatingBar";
import 'semantic-ui-css/semantic.min.css';
import { useStateValue } from "../state";

type HospitalEntryProps = {
  entry: HospitalEntry;
};

const Hospital = (props: HospitalEntryProps) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Container textAlign="left">
      <div>
        <h3>{props.entry.date} <i className="hospital icon"></i> </h3>
        <b>Description: </b>
        {props.entry.description} <br></br>
        <b>Specialist: </b>{props.entry.specialist}  <br></br>
        <b>Discharge: </b> {props.entry.discharge.date} {props.entry.discharge.criteria}
        {props.entry.diagnosisCodes &&
          <ul>
            <b>Diagnoses:</b>
            {props.entry.diagnosisCodes.map(code =>
              <li key={code}>
                {code} {diagnoses[code] ? diagnoses[code].name : ""}
              </li>)}
          </ul>
        }
      </div>
      <HealthRatingBar showText={false} rating={1} />
    </Container>
  );
};

export default Hospital;
