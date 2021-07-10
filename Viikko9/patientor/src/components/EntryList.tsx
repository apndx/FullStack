import React from "react";
import { Table, Container } from "semantic-ui-react";
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
      <Container textAlign="center">
        {props.entries.length > 0 && diagnoses && <h3>Entries</h3>}
      </Container>
      <Table celled>
        <Table.Body>
          {props.entries.map((entry: Entry) => (
            <Table.Row key={entry.id}>
              <Table.Cell>  <EntryDetails entry={entry} /></Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default EntryList;
