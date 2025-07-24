import React from 'react';

const Greeting = ({ name = 'World' }) => {
  return <h1>Hello, {name}!</h1>;
};

export default Greeting; 