import React from 'react';
import Intro from './Intro';
import History from './History';
import Excellence from './Excellence';
import Activity from './Activity';
import Trendings from './Trendings';

const Home = () => {
  return (
    <div className="flex w-full flex-col bg-galaxy bg-contain bg-repeat">
      <Intro />
      <Activity />
      <Excellence />
      <History />
      <Trendings />
    </div>
  );
};

export default Home;
