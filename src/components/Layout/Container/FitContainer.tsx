import React from 'react';
import { Outlet } from 'react-router-dom';

const FitContainer = () => {
  return (
    <div className="mb-40 mt-14 flex w-full justify-center pt-10 sm:mt-header sm:pt-16">
      <div className="w-full max-w-container px-2 2xl:px-0">
        <Outlet />
      </div>
    </div>
  );
};

export default FitContainer;
