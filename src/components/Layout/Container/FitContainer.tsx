import React from 'react';
import { Outlet } from 'react-router-dom';

const FitContainer = () => {
  return (
    <div className="flex min-h-screen w-full justify-center pt-10 sm:pt-16">
      <div className="mb-20 mt-header w-full max-w-container px-2 2xl:px-0">
        <Outlet />
      </div>
    </div>
  );
};

export default FitContainer;
