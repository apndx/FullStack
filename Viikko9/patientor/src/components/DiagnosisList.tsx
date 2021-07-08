import React from "react";
import { Container } from "semantic-ui-react";
import { Diagnosis } from "../types";
import { useStateValue } from "../state";

type DiagnosisListProps = {
  diagnosisCodes: Array<Diagnosis['code']>;
};

const DiagnosisList = (props: DiagnosisListProps) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Container textAlign="left">
      <ul>
        <b>Diagnoses:</b>
        {props.diagnosisCodes.map(code =>
          <li key={code}>
            {code} {diagnoses[code] ? diagnoses[code].name : ""}
          </li>)}
      </ul>
    </Container>
  );
};

export default DiagnosisList;
