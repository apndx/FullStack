import React from 'react';

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  interface HeaderProps {
    courseName: string;
  }

  const Header = ({ courseName }: HeaderProps): JSX.Element => {
    return <div><h1>{courseName}</h1></div>
  }

  interface Course {
    name: string,
    exerciseCount: number
  }

  interface ContentProps {
    courseParts: Course[];
  }

  const Content = ({ courseParts }: ContentProps): JSX.Element => {
    return <div>
      <p>
        {courseParts[0].name} {courseParts[0].exerciseCount}
      </p>
      <p>
        {courseParts[1].name} {courseParts[1].exerciseCount}
      </p>
      <p>
        {courseParts[2].name} {courseParts[2].exerciseCount}
      </p>
    </div>
  }

  const Total = ({ courseParts }: ContentProps): JSX.Element => {
    return <div>
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  }

  return (
    <div>
      <Header courseName={courseName}></Header>
      <Content courseParts={courseParts}></Content>
      <Total courseParts={courseParts}></Total>
    </div >
  );
};

export default App;
