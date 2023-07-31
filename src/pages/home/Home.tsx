import React from 'react';
import Intro from './Intro';
import History from './History';
import Activity from './Activity';

const Home = () => {
  return (
    <div className="flex w-full flex-col bg-galaxy bg-contain bg-repeat">
      <Intro />
      <Activity />
      <History />
    </div>
  );
};

export default Home;
