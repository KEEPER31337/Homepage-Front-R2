import React from 'react';
import { Outlet } from 'react-router-dom';

const FullContainer = () => {
  return (
    <div className="w-full pt-header">
      <Outlet />
    </div>
  );
};

export default FullContainer;
