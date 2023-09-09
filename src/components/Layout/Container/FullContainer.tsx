import React from 'react';
import { Outlet } from 'react-router-dom';

const FullContainer = () => {
  return (
    <div className="flex w-full justify-center bg-middleBlack pt-16">
      <Outlet />
    </div>
  );
};

export default FullContainer;
