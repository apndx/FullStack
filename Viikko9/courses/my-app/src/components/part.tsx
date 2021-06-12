import React from "react";
import { CoursePart } from '../model';

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

interface PartProps {
  coursePart: CoursePart;
}

export const Part = ({ coursePart }: PartProps): JSX.Element => {
  switch (coursePart.type) {
    case "normal":
      return (<p>
        <b> {coursePart.name} {coursePart.exerciseCount} </b><br></br>
        <i>{coursePart.description} </i>
      </p>)
    case "groupProject":
      return (<p>
        <b> {coursePart.name} {coursePart.exerciseCount} </b><br></br>
      project exercises {coursePart.groupProjectCount}
      </p>)
    case "submission":
      return (<p>
        <b> {coursePart.name} {coursePart.exerciseCount} </b><br></br>
        <i>{coursePart.description} </i><br></br>
      submit to {coursePart.exerciseSubmissionLink}
      </p>)
    case "special":
      return (<p>
        <b> {coursePart.name} {coursePart.exerciseCount} </b><br></br>
        <i>{coursePart.description} </i> <br></br>
      required skills: {coursePart.requirements.join(', ')}
      </p>)
    default:
      return assertNever(coursePart);
  }
};
