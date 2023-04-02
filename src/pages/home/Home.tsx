import React from 'react';
import Intro from './Intro';
import Excellence from './Excellence';

const Home = () => {
  return (
    <div className="flex w-full flex-col bg-galaxy bg-contain bg-repeat">
      <Intro />
      <Excellence />
    </div>
  );
};

export default Home;
