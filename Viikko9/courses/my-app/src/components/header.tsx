import React from "react";

interface HeaderProps {
  courseName: string;
}

export const Header = ({ courseName }: HeaderProps): JSX.Element => {
  return <div><h1>{courseName}</h1></div>
};
