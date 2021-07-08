import React from "react";
import { Container } from "semantic-ui-react";
import { Entry } from "../types";
import { useStateValue } from "../state";
import EntryDetails from "./EntryDetails";

type EntryListProps = {
  entries: Entry[];
};

const EntryList = (props: EntryListProps) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <div>
      <Container textAlign="left">
        {props.entries.length > 0 && diagnoses && <h3>Entries</h3>}
        {props.entries.map((entry: Entry) =>
          <div key={entry.id}>
            <EntryDetails entry={entry} />
          </div>
        )}
      </Container>
    </div>
  );
};

export default EntryList;
