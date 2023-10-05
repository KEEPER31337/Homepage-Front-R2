import React from 'react';
import Activity from './Activity';
import Excellence from './Excellence';
import History from './History';
import Intro from './Intro';
import Trendings from './Trendings';

const Home = () => {
  return (
    <div className="-mt-14 bg-galaxy bg-contain bg-repeat sm:-mt-header">
      <Intro />
      <Activity />
      <Excellence />
      <History />
      <Trendings />
    </div>
  );
};

export default Home;
