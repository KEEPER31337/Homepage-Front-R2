import React from 'react';
import Activity from './Activity';
import Excellence from './Excellence';
import History from './History';
import Intro from './Intro';
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
