import React from "react";
import { ContentProps } from '../model';

export const Total = ({ courseParts }: ContentProps): JSX.Element => {
  return <div>
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  </div>
};
