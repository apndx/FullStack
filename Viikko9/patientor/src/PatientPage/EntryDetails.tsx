import React from "react";
import { Entry } from "../types";
import Hospital from "./Hospital";
import OccupationalHealthcare from "./OccupationalHealthcare";
import HealthCheck from "./HealthCheck";
import { assertNever } from "../utils";

type EntryDetailProps = {
  entry: Entry;
};

const EntryDetails = (props: EntryDetailProps) => {
  switch (props.entry.type) {
    case "Hospital":
      return <Hospital entry={props.entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={props.entry} />;
    case "HealthCheck":
      return <HealthCheck entry={props.entry} />;
    default:
      return assertNever(props.entry);
  }
};

export default EntryDetails;
