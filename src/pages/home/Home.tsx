import React from 'react';
import Intro from './Intro';
import Excellence from './Excellence';
import Activity from './Activity';

const Home = () => {
  return (
    <div className="flex w-full flex-col bg-galaxy bg-contain bg-repeat">
      <Intro />
      <Activity />
      <Excellence />
    </div>
  );
};

export default Home;
