import React from 'react';
import { Outlet } from 'react-router-dom';

const FullContainer = () => {
  return (
    <div className="pt-header">
      <Outlet />
    </div>
  );
};

export default FullContainer;
