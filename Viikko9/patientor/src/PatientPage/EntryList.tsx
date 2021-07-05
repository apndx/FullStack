import React from "react";
import { Container } from "semantic-ui-react";
import { Entry } from "../types";
import { useStateValue } from "../state";

type EntryListProps = {
  entries: Entry[];
};

const EntryList = (props: EntryListProps) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <div>
      <Container textAlign="left">
        {props.entries.length > 0 && diagnoses && <h3>entries</h3>}
        {props.entries.map((entry: Entry) =>
          <div key={entry.id}>
            {entry.date} {entry.description}
            {entry.diagnosisCodes &&
              <ul>
                {entry.diagnosisCodes.map(code =>
                  <li key={code}>
                    {code} {diagnoses[code] ? diagnoses[code].name : "" }
                  </li>)}
              </ul>
            }
          </div>
        )}
      </Container>
    </div>
  );
};

export default EntryList;
