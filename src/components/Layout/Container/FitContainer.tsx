import React from 'react';
import { Outlet } from 'react-router-dom';

const FitContainer = () => {
  return (
    <div className="mb-40 mt-header flex w-full justify-center pt-16">
      <div className="w-full max-w-container">
        <Outlet />
      </div>
    </div>
  );
};

export default FitContainer;
