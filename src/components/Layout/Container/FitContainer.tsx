import React from 'react';
import { Outlet } from 'react-router-dom';

const FitContainer = () => {
  return (
    <div className="mt-header flex w-full justify-center">
      <div className="w-full max-w-container">
        <Outlet />
      </div>
    </div>
  );
};

export default FitContainer;
