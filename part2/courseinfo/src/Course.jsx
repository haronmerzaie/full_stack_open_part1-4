import React from 'react';

const Header = (props) => {
  return <h1>{props.course.name}</h1>;
};

const Content = ({ course }) => {
  const totalExercises = course.parts.reduce((total, part) => total + part.exercises, 0);

  return (
    <div>
      {course.parts.map(part => <Part key={part.id} part={part} />)}
      <p><strong>Total of {totalExercises} exercises</strong></p>
    </div>
  );
};

const Part = (props) => {
  return <p>{props.part.name} {props.part.exercises}</p>;
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
    </div>
  );
};

export default Course; 
