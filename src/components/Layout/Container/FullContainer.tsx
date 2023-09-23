import React from 'react';
import { Outlet } from 'react-router-dom';

const FullContainer = () => {
  return (
    <div className="mt-14 flex w-full justify-center bg-middleBlack sm:mt-header">
      <Outlet />
    </div>
  );
};

export default FullContainer;
