import React from "react";
import { ContentProps } from '../model';
import { Part } from './part';

export const Content = ({ courseParts }: ContentProps): JSX.Element => {
  return (
    <div >
      {courseParts.map(part =>
        <Part key={part.name} coursePart={part}></Part>
      )}
    </div>
  )
};
