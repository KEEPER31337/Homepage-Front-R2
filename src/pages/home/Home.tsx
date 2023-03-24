import { useGetTitleTypesQuery } from '@api/aboutApi';
import React from 'react';
import Activity from './Activity';
import Intro from './Intro';

const Home = () => {
  return (
    <div className="flex w-full flex-col bg-galaxy bg-contain bg-repeat">
      <Intro />
      <Activity />
    </div>
  );
};

export default Home;
